import * as React from "react"
import { toast } from "@/components/UI/Toast/useToast"
import { Icon } from "@/components/UI/Icon"
import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"
import { InputRightElement } from "@/components/UI/InputElement"
import { InputGroup } from "@/components/UI/InputGroup"
import { useSearchDownloadFiles } from "@/hooks/useDownloadFile"

interface SelectedDownloadFileProps {
  id: string
  title: string
  version: string
  fileSize: string
  price: string
}

interface DashboardSeachDownloadFilesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  updateDownloadFiles: (_data: SelectedDownloadFileProps[]) => void
  deleteDownloadFile: (_data: SelectedDownloadFileProps) => void
  selectedDownloadFiles: SelectedDownloadFileProps[]
}

const DashboardSearchDownloadFiles = React.memo(
  (props: DashboardSeachDownloadFilesProps) => {
    const { updateDownloadFiles, deleteDownloadFile, selectedDownloadFiles } =
      props

    const [inputValue, setInputValue] = React.useState("")

    const handleClick = (downloadFile: SelectedDownloadFileProps) => {
      const isDuplicate = selectedDownloadFiles.some(
        (selectedPost) => selectedPost.id === downloadFile.id,
      )
      if (isDuplicate) {
        toast({
          description: "File has been added",
          variant: "warning",
        })
      } else {
        updateDownloadFiles([...selectedDownloadFiles, downloadFile])
      }
      setInputValue("")
    }

    const { data } = useSearchDownloadFiles(inputValue)

    const handleSearch = (event: { target: { value: string } }) => {
      setInputValue(event.target.value)
    }
    return (
      <div className="flex w-full flex-col">
        <div className="my-4 flex items-end justify-end">
          <div className="flex-1 space-y-4">
            <div className="relative max-w-lg">
              <form
                className="bg-background"
                onSubmit={(e) => e.preventDefault()}
                autoComplete="off"
              >
                <InputGroup className="relative flex min-w-full bg-background lg:w-[400px]">
                  <Input
                    value={inputValue}
                    type="text"
                    onChange={(e) => handleSearch(e)}
                    autoComplete="off"
                    placeholder="Find Files"
                  />
                  <InputRightElement>
                    {inputValue.length > 2 && (
                      <Icon.Close
                        onClick={() => setInputValue("")}
                        aria-label="Remove Query"
                        className="mr-3 cursor-pointer"
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
              </form>
              {data && (
                <div
                  id="list-download-files"
                  className="my-2 w-full bg-background p-4"
                >
                  <div className="mb-1">
                    <h2 className="mb-2 border-b text-[20px]">
                      Download files
                    </h2>
                    <div className="flex flex-col space-y-4">
                      {/* {isFetching && (
                        <div className="space-y-3">
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                          <Skeleton className="h-5 w-full" />
                        </div>
                      )} */}
                      {inputValue && data && data.length > 0
                        ? data.map((downloadFile) => {
                            return (
                              <div
                                className="flex flex-row justify-between"
                                key={downloadFile.id}
                              >
                                <div>
                                  <h3 className="text-[18px]">
                                    {downloadFile.title}
                                  </h3>
                                  <h4 className="text-[14px]">
                                    {downloadFile.version}
                                  </h4>
                                </div>
                                <Button
                                  variant="outline"
                                  className="cursor-pointer rounded-full"
                                  onClick={() => handleClick(downloadFile)}
                                >
                                  <Icon.Add />
                                </Button>
                              </div>
                            )
                          })
                        : inputValue &&
                          data &&
                          data.length < 1 && (
                            <>
                              <p>Download files not found</p>
                            </>
                          )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h3>Selected Files</h3>
              {selectedDownloadFiles.length > 0 ? (
                <ul className="my-2 flex max-w-xl flex-wrap gap-2">
                  {selectedDownloadFiles?.map((item, index) => (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-left"
                      aria-label="Delete Query"
                      key={index}
                      onClick={() => deleteDownloadFile(item)}
                    >
                      {item.title}
                      <span className="ml-1">
                        <Icon.Delete aria-label="Delete Query" />
                      </span>
                    </Button>
                  ))}
                </ul>
              ) : (
                <p>No selected feature categories</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default DashboardSearchDownloadFiles
