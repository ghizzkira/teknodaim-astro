// TODO: translate with useScopeI18n

/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react"
import {
  EditorContent as TextEditorContent,
  useEditor as useTextEditor,
} from "@tiptap/react"
import { useController } from "react-hook-form"

import { TextEditorExtension } from "./TextEditorExtension"
import { TextEditorMenu } from "./TextEditorMenu"

interface TextEditorExtendedProps {
  control: any
  isClear?: boolean
  name: string
}

const TextEditorExtended = React.memo((props: TextEditorExtendedProps) => {
  const { control, isClear, name } = props
  const [isHydrated, setIsHydrated] = React.useState(true)
  const {
    field: { value, onChange },
  } = useController({ control, name: name })

  const prevLocaleRef = React.useRef(isClear)

  const editor = useTextEditor({
    extensions: [TextEditorExtension],
    editable: true,
    autofocus: true,
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  React.useEffect(() => {
    const handleLocaleChange = () => {
      editor?.commands.setContent("")
    }

    if (prevLocaleRef.current !== isClear) {
      handleLocaleChange()
    }

    prevLocaleRef.current = isClear
  }, [isClear, editor?.commands])

  React.useEffect(() => {
    setIsHydrated(false)
  }, [])

  if (isHydrated) {
    return null
  }

  return (
    <>
      {editor && <TextEditorMenu editor={editor} />}
      {editor && (
        <TextEditorContent
          className="article-body mb-10 block"
          editor={editor}
        />
      )}
      <p className="fixed bottom-0 right-0 p-2">
        {editor?.storage.characterCount.words()} words
      </p>
    </>
  )
})

export default TextEditorExtended
