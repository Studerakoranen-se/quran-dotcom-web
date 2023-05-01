import { useForm, useController, UseControllerProps } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface Props extends UseControllerProps<any> {
  label: string;
  options: RadioOption[];
}

const RadioField = (props: Props) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="w-full">
      <label className="font-normal block py-3">{props.label}</label>
      <div className="flex gap-5 items-center ">
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
  );
};

export default RadioField;
