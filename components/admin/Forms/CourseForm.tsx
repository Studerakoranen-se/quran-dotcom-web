import { GetServerSideProps } from "next";
import FileInput from "../Fields/FileInput";
import InputField from "../Fields/InputField";
import TextField from "../Fields/TextField";
import { useForm } from "react-hook-form";
type FormValues = {
  name: string;
};
const CourseForm = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <InputField
        control={control}
        name="name"
        label="Name"
        required
        placeholder="course name ..."
      />
      <FileInput label="Image" />
      <TextField
        name="description"
        label="Description"
        required
        placeholder="Write description.."
      />
      <button type="submit" className="btn btn-primary w-max px-10">
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
