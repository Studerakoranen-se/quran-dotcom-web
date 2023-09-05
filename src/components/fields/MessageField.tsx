import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps<any> {
  label: string
  placeholder?: string
  type?: string
  span?: string
  p?: string
}

const MessageField = (props: Props) => {
  const {
    field,
    // fieldState
  } = useController(props)

  return (
    <div className="flex flex-col justify-center gap-2 align-middle">
      <label htmlFor="" className="pt-5 font-semibold">
        <div className="flex gap-2">
          <p>{props.p}</p>
          {props.label}
        </div>
      </label>
      <span className="pt-2">{props.span}</span>

      <div className="flex items-center justify-start pt-2 ">
        <textarea
          {...field}
          placeholder={props.placeholder}
          className="border to-color1 h-[200px] w-full "
        />
      </div>
    </div>
  )
}

export default MessageField
