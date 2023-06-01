type Props = {
  required?: boolean;
  name?: string;
  label?: string;
};

const FileInput = ({ name, required, label }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="file"
        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
        required={required}
      />
    </div>
  );
};

export default FileInput;
