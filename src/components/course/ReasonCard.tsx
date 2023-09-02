const ReasonCard = (props: any) => {
  const { reason } = props
  return (
    <div className="relative flex items-center border border-[#E0D2B4] rounded-3x rounded-3xl lg:mx-6 my-2">
      <div
        className="absolute -left-10 border-2 w-24 h-24 flex items-center justify-center border-[#E0D2B4] rounded-full bg-[#04332A]"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: reason.icon,
        }}
      />
      <div className="pl-16 pr-5 p-5 w-full text-left">
        <h1 className="text-white font-semibold pb-2">{reason.title}</h1>
        <p className="text-white text-sm font-light">{reason.txt}</p>
      </div>
    </div>
  )
}

export default ReasonCard
