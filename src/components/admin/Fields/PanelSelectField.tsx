interface Option {
  label: string
  value: string
}

interface Props {
  required?: boolean
  label?: string
  name?: string
  defaultValue?: string | number
  options: Option[]
}

const PanelSelectField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        id={props.name}
        className="form-input"
        required={props.required}
        defaultValue={props.defaultValue}
      >
        {props.options.map((option: Option, i: number) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PanelSelectField
