import { GetServerSideProps } from "next";
import FileInput from "../Fields/FileInput";
import InputField from "../Fields/InputField";
import TextField from "../Fields/TextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PanelSelectField from "../Fields/PanelSelectField";

type Props = {
  quize?: any;
  lessons?: any;
};

const QuizeForm = ({ quize, lessons }: Props) => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("lesson_id", e.target.lesson_id.value);
    formdata.append("question", e.target.question.value);
    formdata.append("o1", e.target.o1.value);
    formdata.append("o2", e.target.o2.value);
    formdata.append("o3", e.target.o3.value);
    formdata.append("o4", e.target.o4.value);
    formdata.append("answer", e.target.answer.value);
    if (quize) {
      fetch("/api/v1/quize/update?id=" + quize.id, {
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
      fetch("/api/v1/quize/add", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          if (success) {
            router.push("/admin/quize/list");
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
        defaultValue={quize?.lesson_id}
      />
      <InputField
        name="question"
        label="Question"
        required
        defaultValue={quize?.question}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        <InputField
          name="o1"
          label="Option 1"
          required
          defaultValue={quize?.o1}
        />
        <InputField
          name="o2"
          label="Option 2"
          required
          defaultValue={quize?.o2}
        />
        <InputField
          name="o3"
          label="Option 3"
          required
          defaultValue={quize?.o3}
        />
        <InputField
          name="o4"
          label="Option 4"
          required
          defaultValue={quize?.o4}
        />
      </div>
      <button type="submit" className="btn btn-primary w-max px-10">
        Submit
      </button>
    </form>
  );
};

export default QuizeForm;
