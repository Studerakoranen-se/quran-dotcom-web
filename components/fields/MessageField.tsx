import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps<any> {
  label: string;
  placeholder?: string;
  type?: string;
  span?: string;
}

const MessageField = (props: Props) => {
  const { field, fieldState } = useController(props);

  return (
    <>
      <div className="">
        <label htmlFor="" className="font-normal">
          {props.label}
          <span className="font-bold px-2">{props.span}</span>
        </label>

        <div className="flex justify-start align-top">
          <input
            {...field}
            type={props.type ?? "text"}
            placeholder={props.placeholder}
            className="border to-color1 h-[200px]"
          />
        </div>
      </div>

    </>
  );
};

export default MessageField;
