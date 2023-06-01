type Props = {
  placeholder?: string;
  required?: boolean;
  name?: string;
  label?: string;
};

const TextField = ({ name, placeholder, required, label }: Props) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        rows={5}
        className="form-textarea"
        placeholder={placeholder}
        required={required}
      ></textarea>
    </div>
  );
};

export default TextField;
