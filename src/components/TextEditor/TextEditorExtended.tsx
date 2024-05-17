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
    fieldState,
  } = useController({
    control,
    name: name,
    rules: {
      required: "Content is required",
      minLength: { message: "Min 50 characters", value: 50 },
    },
  })

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
    <div className="relative">
      {editor && <TextEditorMenu editor={editor} />}
      {editor && (
        <TextEditorContent
          className="article-body mb-10 block"
          editor={editor}
        />
      )}
      <p className="absolute bottom-0 right-0 p-2">
        {editor?.storage.characterCount.words()} words
      </p>
      {fieldState.error?.message && (
        <p className="text-sm text-danger">{fieldState.error.message}</p>
      )}
    </div>
  )
})

export default TextEditorExtended
