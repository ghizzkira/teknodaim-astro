export const ReactScript = ({
  postJsonLdString,
}: {
  postJsonLdString: string
}) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: postJsonLdString }}
      ></script>
    </>
  )
}
