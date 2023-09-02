import { useController, UseControllerProps } from 'react-hook-form'

type Option = {
  value: string
  label: string
}

interface Props extends UseControllerProps<any> {
  label: string
  placeholder?: string
  options: Option[]
  selectedOption?: string
  p?: string
}

const SelectField = (props: Props) => {
  const { field, fieldState } = useController(props)

  return (
    <div className="w-full">
      <label htmlFor="" className="font-normal">
        <div className="flex gap-2">
          <p>{props.p}</p>
          {props.label}
        </div>
      </label>
      <select
        defaultValue={props.selectedOption}
        {...field}
        className="w-full border border-[#D1D5DB] rounded-lg px-3 py-2"
      >
        {props.options.map((option: Option, i: number) => (
          <option key={i} value={option.value} selected={option.value === props.selectedOption}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
