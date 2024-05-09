const JsonLdScript = ({ jsonld }: { jsonld: string }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonld }}
    />
  )
}
export default JsonLdScript
