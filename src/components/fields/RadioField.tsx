import { useController, UseControllerProps } from 'react-hook-form'

interface RadioOption {
  label: string
  value: string
}

interface Props extends UseControllerProps<any> {
  label: string
  options: RadioOption[]
  p?: string
}

const RadioField = (props: Props) => {
  const {
    field,
    // fieldState
  } = useController(props)

  return (
    <div className="w-full">
      <label className="block py-3 font-normal">
        <div className="flex gap-2">
          <p>{props.p}</p>
          {props.label}
        </div>
      </label>
      <div className="flex items-center gap-5 ">
        {props.options.map((option, index) => (
          <label key={index} className="flex items-center font-normal">
            <input
              {...field}
              type="radio"
              value={option.value}
              checked={option.value === field.value}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioField
