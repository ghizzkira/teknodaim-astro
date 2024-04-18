import { Auth } from '@auth/core';
import Google from '@auth/core/providers/google';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sql, relations } from 'drizzle-orm';
import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';

var setCookie = {exports: {}};

var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
};

function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}

function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);

  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  try {
    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" +
        value +
        "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }

  var cookie = {
    name: name,
    value: value,
  };

  parts.forEach(function (part) {
    var sides = part.split("=");
    var key = sides.shift().trimLeft().toLowerCase();
    var value = sides.join("=");
    if (key === "expires") {
      cookie.expires = new Date(value);
    } else if (key === "max-age") {
      cookie.maxAge = parseInt(value, 10);
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value;
    } else {
      cookie[key] = value;
    }
  });

  return cookie;
}

function parseNameValuePair(nameValuePairStr) {
  // Parses name-value-pair according to rfc6265bis draft

  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
  } else {
    value = nameValuePairStr;
  }

  return { name: name, value: value };
}

function parse(input, options) {
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }

  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      // for fetch responses - they combine headers of the same type in the headers array,
      // but getSetCookie returns an uncombined array
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      // fast-path for node.js (which automatically normalizes header names to lower-case
      input = input.headers["set-cookie"];
    } else {
      // slow-path for other environments - see #25
      var sch =
        input.headers[
          Object.keys(input.headers).find(function (key) {
            return key.toLowerCase() === "set-cookie";
          })
        ];
      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
      if (!sch && input.headers.cookie && !options.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }
  if (!Array.isArray(input)) {
    input = [input];
  }

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!options.map) {
    return input.filter(isNonEmptyString).map(function (str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
      var cookie = parseString(str, options);
      cookies[cookie.name] = cookie;
      return cookies;
    }, cookies);
  }
}

/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }

  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;

  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }

  function notSpecialChar() {
    ch = cookiesString.charAt(pos);

    return ch !== "=" && ch !== ";" && ch !== ",";
  }

  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;

    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        // ',' is a cookie separator if we have later first '=', not ';' or ','
        lastComma = pos;
        pos += 1;

        skipWhitespace();
        nextStart = pos;

        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }

        // currently special character
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          // we found cookies separator
          cookiesSeparatorFound = true;
          // pos is inside the next cookie, so back up and return it.
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          // in param ',' or param separator ';',
          // we continue from that comma
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }

    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }

  return cookiesStrings;
}

setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
setCookie.exports.splitCookiesString = splitCookiesString;

const AD_POSITION = [
  "home_below_header",
  "article_below_header",
  "topic_below_header",
  "single_article_above_content",
  "single_article_middle_content",
  "single_article_below_content",
  "single_article_pop_up",
  "article_below_header_amp",
  "single_article_above_content_amp",
  "single_article_middle_content_amp",
  "single_article_below_content_amp"
];
z.enum(AD_POSITION);
const AD_TYPE = ["adsense", "plain_ad"];
z.enum(AD_TYPE);
const adInput = {
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string"
  }).min(2),
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string"
  }).min(2),
  position: z.enum(AD_POSITION, {
    invalid_type_error: "Your Ad position doesnt exist on available option."
  }),
  type: z.enum(AD_TYPE, {
    invalid_type_error: "Your Ad type doesnt exist on available option."
  }),
  active: z.boolean({
    invalid_type_error: "Active must be a boolean"
  }).optional()
};
const updateAdInput = {
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string"
  }).min(2),
  ...adInput
};
z.object({
  ...adInput
});
z.object({
  ...updateAdInput
});

const ads = sqliteTable("ad", {
  id: text("id").primaryKey(),
  title: text("title").unique().notNull(),
  content: text("content").notNull(),
  type: text("type", { enum: AD_TYPE }).notNull().default("plain_ad"),
  position: text("position", { enum: AD_POSITION }).notNull().default("home_below_header"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

const LANGUAGE_TYPE = ["id", "en"];
z.enum(LANGUAGE_TYPE);

const STATUS_TYPE = [
  "published",
  "draft",
  "rejected",
  "in_review"
];
z.enum(STATUS_TYPE);

const ARTICLE_VISIBILITY = ["public", "member"];
z.enum(ARTICLE_VISIBILITY);
const articleInput = {
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string"
  }).min(3),
  language: z.enum(LANGUAGE_TYPE, {
    invalid_type_error: "only id and en are accepted"
  }).optional(),
  content: z.string({
    invalid_type_error: "Content must be a string"
  }).min(50),
  excerpt: z.string({
    invalid_type_error: "Content must be a string"
  }).optional(),
  metaTitle: z.string({
    invalid_type_error: "Meta Title must be a string"
  }).optional(),
  metaDescription: z.string({
    invalid_type_error: "Meta Description must be a string"
  }).optional(),
  status: z.enum(STATUS_TYPE, {
    invalid_type_error: "only published, draft, rejected and in_review are accepted"
  }).optional(),
  visibility: z.enum(ARTICLE_VISIBILITY, {
    invalid_type_error: "only public and member are accepted"
  }).optional(),
  featuredImageId: z.string({
    invalid_type_error: "Featured Image must be a string"
  }),
  topics: z.string({
    required_error: "Topic Id is required",
    invalid_type_error: "Topic Id must be a string"
  }).array(),
  authors: z.string({
    required_error: "Author Id is required",
    invalid_type_error: "Author Id must be a string"
  }).array(),
  editors: z.string({
    required_error: "Editor Id is required",
    invalid_type_error: "Editor Id must be a string"
  }).array()
};
const translateArticleInput = {
  ...articleInput,
  articleTranslationId: z.string({
    required_error: "Article Translation ID is required",
    invalid_type_error: "Article Translation ID must be a string"
  })
};
const updateArticleInput = {
  ...articleInput,
  id: z.string({
    required_error: "ID is required",
    invalid_type_error: "ID must be a string"
  }).min(1),
  slug: z.string({
    required_error: "Slug is required",
    invalid_type_error: "Slug must be a string"
  }).regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
    message: "Slug should be character a-z, A-Z, number, - and _"
  })
};
z.object({
  ...articleInput
});
z.object({
  ...translateArticleInput
});
z.object({
  ...updateArticleInput
});

const TOPIC_TYPE = [
  "all",
  "article",
  "review",
  "tutorial",
  "movie",
  "tv",
  "game"
];
const TOPIC_VISIBILITY = ["public", "internal"];
z.enum(TOPIC_TYPE);
z.enum(TOPIC_VISIBILITY);
const topicInput = {
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string"
  }).min(2).max(32),
  description: z.string({
    invalid_type_error: "Description must be a string"
  }).optional(),
  metaTitle: z.string({
    invalid_type_error: "Meta Title must be a string"
  }).optional(),
  metaDescription: z.string({
    invalid_type_error: "Meta Description must be a string"
  }).optional(),
  type: z.enum(TOPIC_TYPE, {
    invalid_type_error: "only all, article, review ,tutorial, download, movie, tv, game are accepted"
  }).optional(),
  visibility: z.enum(TOPIC_VISIBILITY, {
    invalid_type_error: "only public and internal are accepted"
  }).optional(),
  status: z.enum(STATUS_TYPE, {
    invalid_type_error: "only published, draft, rejected and in_review are accepted"
  }).optional(),
  featuredImageId: z.string({
    invalid_type_error: "Featured Image ID must be a string"
  }).optional(),
  language: z.enum(LANGUAGE_TYPE, {
    invalid_type_error: "only id and en are accepted"
  })
};
const translateTopicInput = {
  ...topicInput,
  topicTranslationId: z.string({
    required_error: "Topic Translation ID is required",
    invalid_type_error: "Topic Traslation Primary ID must be a string"
  })
};
const updateTopicInput = {
  ...topicInput,
  id: z.string(),
  slug: z.string({
    required_error: "Slug is required",
    invalid_type_error: "Slug must be a string"
  }).regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
    message: "Slug should be character a-z, A-Z, number, - and _"
  })
};
z.object({
  ...topicInput
});
z.object({
  ...translateTopicInput
});
z.object({
  ...updateTopicInput
});

const topicTranslations = sqliteTable("topic_translation", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const topics = sqliteTable("topic", {
  id: text("id").primaryKey(),
  language: text("language", { enum: LANGUAGE_TYPE }).notNull().default("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  type: text("type", { enum: TOPIC_TYPE }).notNull().default("all"),
  status: text("status", { enum: STATUS_TYPE }).notNull().default("draft"),
  visibility: text("visibility", { enum: TOPIC_VISIBILITY }).notNull().default("public"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  topicTranslationId: text("topic_translation_id").notNull().references(() => topicTranslations.id),
  featuredImageId: text("featured_image_id").references(() => medias.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const topicsRelations = relations(topics, ({ one, many }) => ({
  topicTranslation: one(topicTranslations, {
    fields: [topics.topicTranslationId],
    references: [topicTranslations.id]
  }),
  featuredImage: one(medias, {
    fields: [topics.featuredImageId],
    references: [medias.id]
  }),
  articles: many(articleTopics)
}));
const topicTranslationsRelations = relations(
  topicTranslations,
  ({ many }) => ({
    topics: many(topics)
  })
);

const USER_ROLE = ["user", "member", "author", "admin"];
z.enum(USER_ROLE);
const userCore = {
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string"
  }).trim().regex(new RegExp(/^[a-z0-9]{3,16}$/), {
    message: "Username should be 3-20 characters without spaces, symbol or any special characters."
  }).min(3),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }).min(1),
  phoneNumber: z.string({ invalid_type_error: "Phone Number must be a string" }).optional().nullish(),
  about: z.string({ invalid_type_error: "About must be a string" }).optional().nullish()
};
z.object({
  ...userCore,
  id: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string"
  })
});
z.object({
  ...userCore,
  id: z.string({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a string"
  }),
  role: z.enum(USER_ROLE, {
    invalid_type_error: "only user, member, author, and admin are accepted"
  })
});

const userLinks = sqliteTable("user_link", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const userLinksRelations = relations(userLinks, ({ one }) => ({
  user: one(users, {
    fields: [userLinks.userId],
    references: [users.id]
  })
}));

const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  username: text("username").unique(),
  image: text("image"),
  phoneNumber: text("phone_number"),
  about: text("about"),
  role: text("role", { enum: USER_ROLE }).default("user"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const accounts = sqliteTable(
  "account",
  {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state")
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
);
const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull()
});
const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
  })
);
const usersRelations = relations(users, ({ many }) => ({
  links: many(userLinks),
  articleAuthors: many(articleAuthors),
  articleEditors: many(articleEditors)
}));

const medias = sqliteTable("media", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  authorId: text("author_id").notNull().references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const mediaRelations = relations(medias, ({ one, many }) => ({
  author: one(users, {
    fields: [medias.authorId],
    references: [users.id]
  }),
  articles: many(articles),
  topics: many(topics)
}));

const articleTranslations = sqliteTable("article_translation", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const articles = sqliteTable("article", {
  id: text("id").primaryKey(),
  language: text("language", { enum: LANGUAGE_TYPE }).notNull().default("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status", { enum: STATUS_TYPE }).notNull().default("draft"),
  visibility: text("visibility", { enum: ARTICLE_VISIBILITY }).notNull().default("public"),
  articleTranslationId: text("article_translation_id").notNull().references(() => articleTranslations.id),
  featuredImageId: text("featured_image_id").notNull().references(() => medias.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const articlesRelations = relations(articles, ({ one, many }) => ({
  articleTranslation: one(articleTranslations, {
    fields: [articles.articleTranslationId],
    references: [articleTranslations.id]
  }),
  featuredImage: one(medias, {
    fields: [articles.featuredImageId],
    references: [medias.id]
  }),
  topics: many(articleTopics),
  authors: many(articleAuthors),
  editors: many(articleEditors),
  comments: many(articleComments)
}));
const articleTranslationsRelations = relations(
  articleTranslations,
  ({ many }) => ({
    articles: many(articles)
  })
);
const articleAuthors = sqliteTable(
  "_article_author",
  {
    articleId: text("article_id").notNull().references(() => articles.id),
    userId: text("user_id").notNull().references(() => users.id)
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.articleId, t.userId]
    })
  })
);
const articleAuthorsRelations = relations(articleAuthors, ({ one }) => ({
  article: one(articles, {
    fields: [articleAuthors.articleId],
    references: [articles.id]
  }),
  user: one(users, {
    fields: [articleAuthors.userId],
    references: [users.id]
  })
}));
const articleEditors = sqliteTable(
  "_article_editor",
  {
    articleId: text("article_id").notNull().references(() => articles.id),
    userId: text("userId").notNull().references(() => users.id)
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.articleId, t.userId]
    })
  })
);
const articleEditorsRelations = relations(articleEditors, ({ one }) => ({
  article: one(articles, {
    fields: [articleEditors.articleId],
    references: [articles.id]
  }),
  user: one(users, {
    fields: [articleEditors.userId],
    references: [users.id]
  })
}));
const articleTopics = sqliteTable(
  "_article_topic",
  {
    articleId: text("article_id").notNull().references(() => articles.id),
    topicId: text("topic_id").notNull().references(() => topics.id)
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.articleId, t.topicId]
    })
  })
);
const articleTopicsRelations = relations(articleTopics, ({ one }) => ({
  article: one(articles, {
    fields: [articleTopics.articleId],
    references: [articles.id]
  }),
  topic: one(topics, {
    fields: [articleTopics.topicId],
    references: [topics.id]
  })
}));

const articleComments = sqliteTable("article_comment", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  replyToId: text("reply_to_id"),
  articleId: text("article_id").notNull().references(() => articles.id),
  authorId: text("author_id").notNull().references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
const articleCommentsRelations = relations(
  articleComments,
  ({ one, many }) => ({
    replyTo: one(articleComments, {
      fields: [articleComments.replyToId],
      references: [articleComments.id],
      relationName: "article_comments_replies"
    }),
    author: one(users, {
      fields: [articleComments.authorId],
      references: [users.id]
    }),
    article: one(articles, {
      fields: [articleComments.articleId],
      references: [articles.id]
    }),
    replies: many(articleComments, {
      relationName: "article_comments_replies"
    })
  })
);

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  accounts,
  ads,
  articleAuthors,
  articleAuthorsRelations,
  articleComments,
  articleCommentsRelations,
  articleEditors,
  articleEditorsRelations,
  articleTopics,
  articleTopicsRelations,
  articleTranslations,
  articleTranslationsRelations,
  articles,
  articlesRelations,
  mediaRelations,
  medias,
  sessions,
  topicTranslations,
  topicTranslationsRelations,
  topics,
  topicsRelations,
  userLinks,
  userLinksRelations,
  users,
  usersRelations,
  verificationTokens
}, Symbol.toStringTag, { value: 'Module' }));

const sqlite = createClient({
  url: "libsql://teknodaim-astro-dafundateam.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTMyNjM3ODksImlkIjoiNDQ0ZGJlZDktZmYyOS00NTFhLWJjNjctNDg5ZjYyZDkxZTFjIn0.8G5gtsYpsKT-lp6uyegBMo8EXfVz-AcY3sNkRj4Em5YOsqam5MEYlty7WC9eJBBMrzWFq25aXAVpFoiWfQCHAQ"
});
drizzle(sqlite);
const db = drizzle(sqlite, { schema });

const getDomainWithoutSubdomain = (url) => {
  const urlParts = new URL(url).hostname.split(".");
  return urlParts.slice(0).slice(-(urlParts.length === 4 ? 3 : 2)).join(".");
};

const uniqueCharacter = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  5
);
customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  40
);

function slugify(text) {
  return text.toString().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
}

const useSecureCookies = "https://teknodaim.com"?.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = getDomainWithoutSubdomain("https://teknodaim.com");
const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: "174500547602-jf04fv159t267gkrtujm4ese9535stoe.apps.googleusercontent.com",
      clientSecret: "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"
    })
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "localhost" ? hostName : "." + hostName
      }
    }
  },
  callbacks: {
    //@ts-ignore
    signIn({ user, profile }) {
      user.username = `${slugify(profile?.name)}_${uniqueCharacter()}`;
      return true;
    },
    //@ts-ignore
    async session({ session }) {
      const res = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, session?.user?.email)
      });
      return Promise.resolve({ user: { ...session.user, ...res } });
    }
  },
  pages: { signIn: "/auth/sign-in" }
};

const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AstroAuthHandler(prefix, options = authConfig) {
  return async ({ cookies, request }) => {
    const url = new URL(request.url);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/"))
      return;
    const res = await Auth(request, options);
    if (["callback", "signin", "signout"].includes(action)) {
      res.headers.getSetCookie().forEach((cookie) => {
        const { name, value, ...options2 } = parseString_1(cookie);
        cookies.set(name, value, options2);
      });
      res.headers.delete("Set-Cookie");
    }
    return res;
  };
}
function AstroAuth(options = authConfig) {
  const { AUTH_SECRET, AUTH_TRUST_HOST, VERCEL, NODE_ENV } = Object.assign({"PUBLIC_DOMAIN": "teknodaim.com", "PUBLIC_EN_SUBDOMAIN": "global.teknodaim.com", "PUBLIC_WP_DOMAIN": "media.teknodaim.com", "PUBLIC_WP_EN_SUBDOMAIN": "en.teknodaim.com", "PUBLIC_SITE_URL": "https://teknodaim.com", "PUBLIC_EN_SITE_URL": "https://global.teknodaim.com", "PUBLIC_API": "https://teknodaim.com/api", "PUBLIC_WP_API": "https://media.teknodaim.com/graphql", "PUBLIC_SITE_TITLE": "Teknodaim", "PUBLIC_SITE_DESCRIPTION": "Teknodaim membahas perkembangan teknologi di dunia. Topik yang kami bahas antara lain berita game, review gadget, perkembangan sains, dll.", "PUBLIC_FACEBOOK_USERNAME": "teknodaim", "PUBLIC_TWITTER_USERNAME": "teknodaimcom", "PUBLIC_INSTAGRAM_USERNAME": "teknodaim_com", "PUBLIC_YOUTUBE_USERNAME": "@Teknodaim", "PUBLIC_ADSENSE_CLIENT_ID": "ca-pub-1431832394500017", "PUBLIC_GA_MEASUREMENT_ID": "G-P4Y1YPM7SR", "PUBLIC_SUPPORT_EMAIL": "support@teknodaim.com", "PUBLIC_WHATSAPP_NUMBER": "6283822727338", "PUBLIC_ADDRESS": "Jl. Bakti Pemuda, Drien Rampak, Johan Pahlawan, Kabupaten Aceh Barat, Aceh 23611", "PUBLIC_LOGO_URL": "https://media.teknodaim.com/wp-content/uploads/2021/07/Teknodaim-Text-Logo-V3.png.webp", "PUBLIC_LOGO_OG_URL": "https://media.teknodaim.com/wp-content/uploads/2019/06/Teknodaim-Wall-min.png", "PUBLIC_LOGO_OG_WIDTH": "800px", "PUBLIC_LOGO_OG_HEIGHT": "450px", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { AUTH_SECRET: "89da5c81932f3cf6a820626dd568e2ef", AUTH_TRUST_HOST: "true", NODE: process.env.NODE, NODE_ENV: process.env.NODE_ENV });
  options.secret ??= AUTH_SECRET;
  options.trustHost ??= !!(AUTH_TRUST_HOST ?? VERCEL ?? NODE_ENV !== "production");
  const { prefix = "/api/auth", ...authOptions } = options;
  const handler = AstroAuthHandler(prefix, authOptions);
  return {
    async GET(context) {
      return await handler(context);
    },
    async POST(context) {
      return await handler(context);
    }
  };
}
async function getSession(req, options = authConfig) {
  options.secret ??= "89da5c81932f3cf6a820626dd568e2ef";
  options.trustHost ??= true;
  const url = new URL(`${options.prefix}/session`, req.url);
  const response = await Auth(new Request(url, { headers: req.headers }), options);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}

const { GET, POST } = AstroAuth();

const ____auth_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

export { ____auth_ as _, authConfig as a, db as d, getSession as g };
