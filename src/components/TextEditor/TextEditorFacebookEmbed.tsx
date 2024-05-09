import { mergeAttributes, Node, type Editor as TextEditor } from "@tiptap/core"
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react"

export const TextEditorFacebookEmbed = Node.create({
  name: "textEditorFacebookEmbed",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [
      {
        tag: "text-editor-facebook-embed",
      },
    ]
  },
  addAttributes() {
    return {
      facebookUrl: {
        default: "",
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ["text-editor-facebook-embed", mergeAttributes(HTMLAttributes), 1]
  },
  addNodeView() {
    return ReactNodeViewRenderer(TextEditorFacebookWrapper)
  },
})

interface TextEditorFacebookEmbedWrapperProps {
  node: { attrs: { facebookUrl: string } }
  editor: TextEditor
}

const TextEditorFacebookWrapper = (
  props: TextEditorFacebookEmbedWrapperProps,
) => {
  const { editor } = props
  const handleClick = () => {
    editor.chain().focus().run()
  }

  return (
    <NodeViewWrapper
      onClick={handleClick}
      className="pointer-events-none max-w-[calc(101%-10px)]"
    >
      {/* Fix Later */}
      {/* <FacebookEmbed
        placeholderDisabled
        url={node.attrs.facebookUrl}
        width="76%"
      /> */}
    </NodeViewWrapper>
  )
}
