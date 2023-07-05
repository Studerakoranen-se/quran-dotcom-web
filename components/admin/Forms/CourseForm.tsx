import { GetServerSideProps } from "next";
import FileInput from "../Fields/FileInput";
import InputField from "../Fields/InputField";
import TextField from "../Fields/TextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

type Props = {
  course?: any;
};

const CourseForm = ({ course }: Props) => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("name", e.target.name.value);
    if (e.target.image.files.length > 0) {
      formdata.append("image", e.target.image.files[0], e.target.image.value);
    }
    formdata.append("description", e.target.description.value);
    if (course) {
      fetch("/api/v1/course/update?id=" + course.id, {
        method: "POST",
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          Swal.fire({
            icon: success ? "success" : "error",
            title: success ? "Success" : "Error",
            text: msg,
            padding: "2em",
            customClass: "sweet-alerts",
          });
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch("/api/v1/course/add", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          if (success) {
            router.push("/admin/course/list");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        name="name"
        label="Name"
        required
        placeholder="course name ..."
        defaultValue={course?.name}
      />
      <FileInput label="Image" name="image" />
      <TextField
        name="description"
        label="Description"
        required
        placeholder="Write description.."
        defaultValue={course?.description}
      />
      <button type="submit" className="btn btn-primary w-max px-10">
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
