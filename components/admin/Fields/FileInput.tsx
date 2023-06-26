interface Props {
  required?: boolean;
  label?: string;
  name?: string;
}

const FileInput = (props: Props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        id={props.name}
        type="file"
        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
        required={props.required}
      />
    </div>
  );
};

export default FileInput;
