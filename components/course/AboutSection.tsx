const AboutSection = (props: any) => {
  const { lesson } = props;
  return (
    <div
      className="text-sm space-y-3 text-light"
      dangerouslySetInnerHTML={{
        __html: lesson?.content,
      }}
    ></div>
  );
};

export default AboutSection;
