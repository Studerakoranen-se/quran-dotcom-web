import { useController, UseControllerProps } from 'react-hook-form'

interface Props extends UseControllerProps<any> {
  label: string
  placeholder?: string
  type?: string
  span?: string
  p?: string
}

const MessageField = (props: Props) => {
  const { field, fieldState } = useController(props)

  return (
    <div className="flex flex-col justify-center align-middle gap-2">
      <label htmlFor="" className="font-semibold pt-5">
        <div className="flex gap-2">
          <p>{props.p}</p>
          {props.label}
        </div>
      </label>
      <span className="pt-2">{props.span}</span>

      <div className="flex justify-start pt-2 items-center ">
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
