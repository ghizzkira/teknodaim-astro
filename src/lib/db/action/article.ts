import { and, count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import {
  articleAuthors,
  articleEditors,
  articles,
  articleTopics,
  articleTranslations,
} from "@/lib/db/schema/article"
import { medias } from "@/lib/db/schema/media"
import { topics } from "@/lib/db/schema/topic"
import { users } from "@/lib/db/schema/user"
import { trimText } from "@/lib/utils/content"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type {
  CreateArticle,
  TranslateArticle,
  UpdateArticle,
} from "@/lib/validation/article"
import type { LanguageType } from "@/lib/validation/language"

export const getArticleTranslationById = async (id: string) => {
  const articleTranslationData = await db.query.articleTranslations.findFirst({
    where: (articleTranslations, { eq }) => eq(articleTranslations.id, id),
    with: {
      articles: {
        columns: {
          id: true,
          title: true,
          language: true,
        },
        with: {
          featuredImage: {
            columns: {
              id: true,
              url: true,
            },
          },
        },
      },
    },
  })

  const articleTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(articleTopics)
    .leftJoin(articles, eq(articleTopics.articleId, articles.id))
    .leftJoin(topics, eq(articleTopics.topicId, topics.id))
    .where(eq(articles.id, articleTranslationData?.articles[0].id!))
    .all()

  const articleAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(articleAuthors)
    .leftJoin(articles, eq(articleAuthors.articleId, articles.id))
    .leftJoin(users, eq(articleAuthors.userId, users.id))
    .where(eq(articles.id, articleTranslationData?.articles[0].id!))
    .all()

  const articleEditorsData = await db
    .select({ id: users.id, name: users.name })
    .from(articleEditors)
    .leftJoin(articles, eq(articleEditors.articleId, articles.id))
    .leftJoin(users, eq(articleEditors.userId, users.id))
    .where(eq(articles.id, articleTranslationData?.articles[0].id!))
    .all()

  const articleData = articleTranslationData?.articles.map((item) => ({
    ...item,
    topics: articleTopicsData,
    authors: articleAuthorsData,
    editors: articleEditorsData,
  }))

  const data = {
    ...articleTranslationData,
    articles: articleData,
  }

  return data
}

export const getArticleById = async (id: string) => {
  const articleData = await db
    .select()
    .from(articles)
    .leftJoin(medias, eq(medias.id, articles.featuredImageId))
    .where(eq(articles.id, id))
    .limit(1)

  const articleTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(articleTopics)
    .leftJoin(articles, eq(articleTopics.articleId, articles.id))
    .leftJoin(topics, eq(articleTopics.topicId, topics.id))
    .where(eq(articles.id, id))
    .all()

  const articleAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(articleAuthors)
    .leftJoin(articles, eq(articleAuthors.articleId, articles.id))
    .leftJoin(users, eq(articleAuthors.userId, users.id))
    .where(eq(articles.id, id))
    .all()

  const articleEditorsData = await db
    .select({ id: users.id, name: users.name })
    .from(articleEditors)
    .leftJoin(articles, eq(articleEditors.articleId, articles.id))
    .leftJoin(users, eq(articleEditors.userId, users.id))
    .where(eq(articles.id, id))
    .all()

  const data = articleData.map((item) => ({
    ...item.articles,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    topics: articleTopicsData,
    authors: articleAuthorsData,
    editors: articleEditorsData,
  }))

  return data[0]
}

export const getArticleBySlug = async (slug: string) => {
  const articleData = await db
    .select()
    .from(articles)
    .leftJoin(medias, eq(medias.id, articles.featuredImageId))
    .where(eq(articles.slug, slug))
    .limit(1)

  const articleTopicsData = await db
    .select({ id: topics.id, title: topics.title, slug: topics.slug })
    .from(articleTopics)
    .leftJoin(articles, eq(articleTopics.articleId, articles.id))
    .leftJoin(topics, eq(articleTopics.topicId, topics.id))
    .where(eq(articles.id, articleData[0].articles.id))
    .all()

  const articleAuthorsData = await db
    .select({ id: users.id, name: users.name, username: users.username })
    .from(articleAuthors)
    .leftJoin(articles, eq(articleAuthors.articleId, articles.id))
    .leftJoin(users, eq(articleAuthors.userId, users.id))
    .where(eq(articles.id, articleData[0].articles.id))
    .all()

  const articleEditorsData = await db
    .select({ id: users.id, name: users.name })
    .from(articleEditors)
    .leftJoin(articles, eq(articleEditors.articleId, articles.id))
    .leftJoin(users, eq(articleEditors.userId, users.id))
    .where(eq(articles.id, articleData[0].articles.id))
    .all()

  const data = articleData.map((item) => ({
    ...item.articles,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    topics: articleTopicsData,
    authors: articleAuthorsData,
    editors: articleEditorsData,
  }))

  return data[0]
}

export const getArticlesByLanguage = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const data = await db.query.articles.findMany({
    where: (articles, { eq, and }) =>
      and(eq(articles.language, language), eq(articles.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articles, { desc }) => [desc(articles.updatedAt)],
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getArticlesByLanguageInfinite = async ({
  language,
  limit = 50,
  cursor,
}: {
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const data = await db.query.articles.findMany({
    where: (articles, { eq, and, lt }) =>
      and(
        eq(articles.language, language),
        eq(articles.status, "published"),
        cursor ? lt(articles.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
    },
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    articles: data,
    nextCursor,
  }
}

export const getArticlesByTopicId = async ({
  topicId,
  language,
  page,
  perPage,
}: {
  topicId: string
  language: LanguageType
  page: number
  perPage: number
}) => {
  const articles = await db.query.articles.findMany({
    where: (articles, { eq, and }) =>
      and(eq(articles.language, language), eq(articles.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articles, { desc }) => [desc(articles.updatedAt)],
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = articles.filter((article) =>
    article.topics.some((topic) => topic.topicId === topicId),
  )

  return data
}

export const getArticlesByTopicIdInfinite = async ({
  topicId,
  language,
  limit = 50,
  cursor,
}: {
  topicId: string
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const articles = await db.query.articles.findMany({
    where: (articles, { eq, and, lt }) =>
      and(
        eq(articles.language, language),
        eq(articles.status, "published"),
        cursor ? lt(articles.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = articles.filter((article) =>
    article.topics.some((topic) => topic.topicId === topicId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    articles: data,
    nextCursor,
  }
}

export const getArticlesByAuthorId = async ({
  authorId,
  language,
  page,
  perPage,
}: {
  authorId: string
  language: LanguageType
  page: number
  perPage: number
}) => {
  const articles = await db.query.articles.findMany({
    where: (articles, { eq, and }) =>
      and(eq(articles.language, language), eq(articles.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articles, { desc }) => [desc(articles.updatedAt)],
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const data = articles.filter((article) =>
    article.authors.some((author) => author.userId === authorId),
  )

  return data
}

export const getArticlesByAuthorIdInfinite = async ({
  authorId,
  language,
  limit = 50,
  cursor,
}: {
  authorId: string
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const articles = await db.query.articles.findMany({
    where: (articles, { eq, and, lt }) =>
      and(
        eq(articles.language, language),
        eq(articles.status, "published"),
        cursor ? lt(articles.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const data = articles.filter((article) =>
    article.authors.some((author) => author.userId === authorId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    articles: data,
    nextCursor,
  }
}

export const getRelatedArticlesInfinite = async ({
  topicId,
  currentArticleId,
  language,
  limit = 50,
  cursor,
}: {
  topicId: string
  currentArticleId: string
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const articles = await db.query.articles.findMany({
    where: (articles, { eq, and, not, lt }) =>
      and(
        eq(articles.language, language),
        eq(articles.status, "published"),
        cursor ? lt(articles.updatedAt, cursor) : undefined,
        not(eq(articles.id, currentArticleId)),
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = articles.filter((article) =>
    article.topics.some((topic) => topic.topicId === topicId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    articles: data,
    nextCursor,
  }
}

export const getArticlesDashboard = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const data = await db.query.articles.findMany({
    where: (articles, { eq }) => eq(articles.language, language),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articles, { desc }) => [desc(articles.updatedAt)],
    with: {
      featuredImage: {
        columns: {
          id: true,
          url: true,
        },
      },
      articleTranslation: {
        columns: {
          id: true,
        },
        with: {
          articles: {
            columns: {
              id: true,
              title: true,
              language: true,
            },
          },
        },
      },
    },
  })
  return data
}

export const getArticlesSitemap = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const data = await db.query.articles.findMany({
    where: (articles, { eq, and }) =>
      and(eq(articles.language, language), eq(articles.status, "published")),
    columns: {
      slug: true,
      updatedAt: true,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articles, { desc }) => [desc(articles.id)],
  })

  return data
}

export const getArticlesCount = async () => {
  const data = await db
    .select({ value: count() })
    .from(articles)
    .where(and(eq(articles.status, "published")))
  return data[0].value
}

export const getArticlesCountDashboard = async () => {
  const data = await db.select({ value: count() }).from(articles)
  return data[0].value
}

export const getArticlesCountByLanguage = async (language: LanguageType) => {
  const data = await db
    .select({ values: count() })
    .from(articles)
    .where(
      and(eq(articles.language, language), eq(articles.status, "published")),
    )
  return data[0].values
}

export const searchArticles = async ({
  language,
  searchQuery,
}: {
  language: LanguageType
  searchQuery: string
}) => {
  const data = await db.query.articles.findMany({
    where: (articles, { eq, and, or, like }) =>
      and(
        eq(articles.language, language),
        eq(articles.status, "published"),
        or(
          like(articles.title, `%${searchQuery}%`),
          like(articles.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchArticlesDashboard = async ({
  language,
  searchQuery,
}: {
  language: LanguageType
  searchQuery: string
}) => {
  const data = await db.query.articles.findMany({
    where: (articles, { eq, and, or, like }) =>
      and(
        eq(articles.language, language),
        or(
          like(articles.title, `%${searchQuery}%`),
          like(articles.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const createArticle = async (input: CreateArticle) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedExcerpt = !input.excerpt
    ? trimText(input.content, 160)
    : input.excerpt
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedExcerpt
    : input.metaDescription

  const articleTranslationId = cuid()
  const articleId = cuid()

  const data = await db.transaction(async (tx) => {
    const articleTranslation = await tx
      .insert(articleTranslations)
      .values({
        id: articleTranslationId,
      })
      .returning()

    const article = await tx
      .insert(articles)
      .values({
        id: articleId,
        language: input.language,
        title: input.title,
        slug: slug,
        content: input.content,
        status: input.status,
        excerpt: generatedExcerpt,
        metaTitle: generatedMetaTitle,
        metaDescription: generatedMetaDescription,
        featuredImageId: input.featuredImageId,
        articleTranslationId: articleTranslation[0].id,
      })
      .returning()

    const topicValues = input.topics.map((topic) => ({
      articleId: article[0].id,
      topicId: topic,
    }))

    await tx.insert(articleTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      articleId: article[0].id,
      userId: author,
    }))

    await tx.insert(articleAuthors).values(authorValues)

    const editorValues = input.editors.map((editor) => ({
      articleId: article[0].id,
      userId: editor,
    }))

    await tx.insert(articleEditors).values(editorValues)

    return article
  })

  return data
}

export const updateArticle = async (input: UpdateArticle) => {
  const data = await db.transaction(async (tx) => {
    const article = await tx
      .update(articles)
      .set({
        id: input.id,
        language: input.language,
        title: input.title,
        slug: input.slug,
        content: input.content,
        status: input.status,
        excerpt: input.excerpt,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        featuredImageId: input.featuredImageId,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(articles.id, input.id))
      .returning()

    await tx.delete(articleTopics).where(eq(articleTopics.articleId, input.id))

    await tx
      .delete(articleAuthors)
      .where(eq(articleAuthors.articleId, input.id))

    await tx
      .delete(articleEditors)
      .where(eq(articleEditors.articleId, input.id))

    const topicValues = input.topics.map((topic) => ({
      articleId: article[0].id,
      topicId: topic,
    }))

    await tx.insert(articleTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      articleId: article[0].id,
      userId: author,
    }))

    await tx.insert(articleAuthors).values(authorValues)

    const editorValues = input.editors.map((editor) => ({
      articleId: article[0].id,
      userId: editor,
    }))

    await tx.insert(articleEditors).values(editorValues)

    return article
  })

  return data
}

export const updateArticleWithoutChangeUpdatedDate = async (
  input: UpdateArticle,
) => {
  const data = await db.transaction(async (tx) => {
    const article = await tx
      .update(articles)
      .set({
        id: input.id,
        language: input.language,
        title: input.title,
        slug: input.slug,
        content: input.content,
        status: input.status,
        excerpt: input.excerpt,
        metaTitle: input.metaTitle,
        metaDescription: input.metaDescription,
        featuredImageId: input.featuredImageId,
      })
      .where(eq(articles.id, input.id))
      .returning()

    await tx.delete(articleTopics).where(eq(articleTopics.articleId, input.id))

    await tx
      .delete(articleAuthors)
      .where(eq(articleAuthors.articleId, input.id))

    await tx
      .delete(articleEditors)
      .where(eq(articleEditors.articleId, input.id))

    const topicValues = input.topics.map((topic) => ({
      articleId: article[0].id,
      topicId: topic,
    }))

    await tx.insert(articleTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      articleId: article[0].id,
      userId: author,
    }))

    await tx.insert(articleAuthors).values(authorValues)

    const editorValues = input.editors.map((editor) => ({
      articleId: article[0].id,
      userId: editor,
    }))

    await tx.insert(articleEditors).values(editorValues)

    return article
  })

  return data
}

export const translateArticle = async (input: TranslateArticle) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedExcerpt = !input.excerpt
    ? trimText(input.content, 160)
    : input.excerpt
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedExcerpt
    : input.metaDescription

  const data = await db.transaction(async (tx) => {
    const article = await tx
      .insert(articles)
      .values({
        id: cuid(),
        language: input.language,
        title: input.title,
        slug: slug,
        content: input.content,
        status: input.status,
        excerpt: generatedExcerpt,
        metaTitle: generatedMetaTitle,
        metaDescription: generatedMetaDescription,
        featuredImageId: input.featuredImageId,
        articleTranslationId: input.articleTranslationId,
      })
      .returning()

    const topicValues = input.topics.map((topic) => ({
      articleId: article[0].id,
      topicId: topic,
    }))

    await tx.insert(articleTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      articleId: article[0].id,
      userId: author,
    }))

    await tx.insert(articleAuthors).values(authorValues)

    const editorValues = input.editors.map((editor) => ({
      articleId: article[0].id,
      userId: editor,
    }))

    await tx.insert(articleEditors).values(editorValues)

    return article
  })

  return data
}

export const deleteArticle = async (id: string) => {
  const data = await db.transaction(async (tx) => {
    await tx.delete(articleTopics).where(eq(articleTopics.articleId, id))
    await tx.delete(articleAuthors).where(eq(articleAuthors.articleId, id))
    await tx.delete(articleEditors).where(eq(articleEditors.articleId, id))
    const article = await tx.delete(articles).where(eq(articles.id, id))
    return article
  })
  return data
}
