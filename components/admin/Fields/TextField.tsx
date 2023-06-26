interface Props {
  placeholder?: string;
  required?: boolean;
  label?: string;
  name?: string;
  defaultValue?: string;
}

const TextField = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        id={props.name}
        rows={5}
        className="form-textarea"
        placeholder={props.placeholder}
        required={props.required}
        defaultValue={props.defaultValue}
      ></textarea>
    </div>
  );
};

export default TextField;
