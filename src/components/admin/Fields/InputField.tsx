interface Props {
  type?: string
  placeholder?: string
  required?: boolean
  label?: string
  name?: string
  defaultValue?: string
}

const InputField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        className="form-input"
        required={props.required}
        defaultValue={props.defaultValue}
      />
    </div>
  )
}

export default InputField
