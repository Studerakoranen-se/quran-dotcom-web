import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps<any> {
  type?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
}

const InputField = (props: Props) => {
  const { field, fieldState } = useController(props);

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        {...field}
        id={props.name}
        type={props.type ?? "text"}
        placeholder={props.placeholder}
        className="form-input"
        required={props.required}
      />
    </div>
  );
};

export default InputField;
