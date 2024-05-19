import { Badge } from "@/components/UI/Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { toast } from "@/components/UI/Toast/useToast"
import { useDeleteTopic } from "@/hooks/useTopic"
import type { SelectTopic } from "@/lib/db/schema/topic"
import { formatDate } from "@/lib/utils/date"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import DashboardStatusBadge from "@/components/Dashboard/DashboardStatusBadge"
import DashboardTopicVisibilityBadge from "@/components/Dashboard/DashboardTopicVisibilityBadge"

interface TopicsProps extends SelectTopic {
  topicTranslation: {
    topics: SelectTopic[]
  }
}

interface TopicTableProps {
  topics: TopicsProps[]
  paramsName: string
  page: number
  lastPage: number
}

export default function TopicTable(props: TopicTableProps) {
  const { topics, paramsName, page, lastPage } = props

  const { handleDeleteTopic: deleteTopic } = useDeleteTopic({
    onSuccess: () => {
      toast({ variant: "success", description: "Topic has been deleted" })
      window.location.reload()
    },
    onError: () => {
      toast({
        description: "Error when deleting topic, try again",
        variant: "warning",
      })
    },
  })

  return (
    <div className="relative w-full overflow-auto">
      <Table className="table-fixed border-collapse border-spacing-0">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Slug
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Type
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Status
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Visibility
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Published Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topics.map((topic) => {
            return (
              <TableRow key={topic.id}>
                <TableCell className="max-w-[120px] align-middle">
                  <div className="flex flex-col">
                    <span className="line-clamp-3 font-medium">
                      {topic.title}
                    </span>
                    <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                      <span>{topic.slug}</span>
                      <span className="pr-1">,</span>
                      <span className="uppercase">{topic.type}</span>
                      <span className="pr-1">,</span>
                      <span>{topic.visibility}</span>
                      <span className="pr-1">,</span>
                      <span>{topic.language}</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <span className="overflow-hidden text-ellipsis font-medium">
                      {topic.slug}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <Badge variant="outline" className="uppercase">
                      {topic.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <DashboardStatusBadge status={topic.status}>
                      {topic.status}
                    </DashboardStatusBadge>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <DashboardTopicVisibilityBadge
                      visibility={topic.visibility}
                    >
                      {topic.visibility}
                    </DashboardTopicVisibilityBadge>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    {formatDate(topic.createdAt!, "LL")}
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle">
                  {topic.topicTranslation.topics.length > 1 ? (
                    <DashboardShowOptions
                      onDelete={() => {
                        void deleteTopic(topic.id)
                      }}
                      editUrl={`/dashboard/topic/edit/${topic.id}`}
                      viewUrl={`/topic/${topic.slug}`}
                      description={topic.title}
                    />
                  ) : (
                    <DashboardShowOptions
                      onDelete={() => {
                        void deleteTopic(topic.id)
                      }}
                      editUrl={`/dashboard/topic/edit/${topic.id}`}
                      translateUrl={
                        topic.language === "id"
                          ? `/dashboard/topic/translate/en/${topic.topicTranslationId}`
                          : `/dashboard/topic/translate/id/${topic.topicTranslationId}`
                      }
                      viewUrl={`/topic/${topic.slug}`}
                      description={topic.title}
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {lastPage ? (
        <DashboardPagination
          currentPage={page}
          lastPage={lastPage ?? 1}
          paramsName={paramsName}
        />
      ) : null}
    </div>
  )
}
