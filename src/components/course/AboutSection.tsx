const AboutSection = (props: any) => {
  const { lesson } = props
  return (
    <div
      className="text-sm space-y-3 text-light"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: lesson?.content,
      }}
    />
  )
}

export default AboutSection
