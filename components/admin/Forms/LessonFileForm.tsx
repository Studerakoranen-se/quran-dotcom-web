import InputField from "../Fields/InputField";
import TextField from "../Fields/TextField";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import PanelSelectField from "../Fields/PanelSelectField";
import FileInput from "../Fields/FileInput";

type Props = {
  lessonFile?: any;
  lessons?: any;
};

const LessonFileForm = ({ lessonFile, lessons }: Props) => {
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    var formdata = new FormData();

    formdata.append("lesson_id", e.target.lesson_id.value);
    formdata.append("name", e.target.name.value);
    if (e.target.file.files.length > 0) {
      formdata.append("file", e.target.file.files[0], e.target.file.value);
    }
    formdata.append("description", e.target.description.value);
    if (lessonFile) {
      fetch("/api/v1/file/update?id=" + lessonFile.id, {
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
      fetch("/api/v1/file/add", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          if (success) {
            router.push("/admin/lesson/file/list");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PanelSelectField
        label="Lesson"
        name="lesson_id"
        options={lessons}
        defaultValue={lessonFile?.lesson_id}
      />
      <InputField
        name="name"
        label="Name"
        required
        placeholder=""
        defaultValue={lessonFile?.name}
      />
      <FileInput label="File" name="file" required={!lessonFile} />
      <TextField
        name="description"
        label="Description"
        required
        placeholder="Write description.."
        defaultValue={lessonFile?.description}
      />

      <button type="submit" className="btn btn-primary w-max px-10">
        Submit
      </button>
    </form>
  );
};

export default LessonFileForm;
