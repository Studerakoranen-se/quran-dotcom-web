import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps<any> {
  label: string;
  placeholder?: string;
  type?: string;
  span?: string;
  p?:string;
}

const MessageField = (props: Props) => {
  const { field, fieldState } = useController(props);

  return (
    <>
      <div className="">
        <label htmlFor="" className="font-semibold">
          <div className="flex gap-2">
            <p>{props.p}</p>
          {props.label}

          </div>

        </label>
          <span className="pt-4">{props.span}</span>

        <div className="flex justify-start align-top pt-2">
          <textarea
            {...field}
            placeholder={props.placeholder}
            className="border to-color1 h-[200px] w-full"
          ></textarea>
        </div>
      </div>

    </>
  );
};

export default MessageField;
