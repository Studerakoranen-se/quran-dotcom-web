import { GetServerSideProps } from "next";
import FileInput from "../Fields/FileInput";
import InputField from "../Fields/InputField";
import TextField from "../Fields/TextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PanelSelectField from "../Fields/PanelSelectField";
import React from "react";

type Props = {
  quize?: any;
  lessons?: any;
};

const QuizeForm = ({ quize, lessons }: Props) => {
  console.log(quize);

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("lesson_id", e.currentTarget.lesson_id.value);
    formData.append("question", e.currentTarget.question.value);
    formData.append("o1", e.currentTarget.o1.value);
    formData.append("o2", e.currentTarget.o2.value);
    formData.append("o3", e.currentTarget.o3.value);
    formData.append("o4", e.currentTarget.o4.value);

    const selected: string[] = [];

    const checkboxes = e.currentTarget.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selected.push(checkbox.name.split("")[1]);
      }
    });
    formData.append("answer", selected.join(","));

    if (quize) {
      fetch("/api/v1/quize/update?id=" + quize.id, {
        method: "POST",
        body: formData,
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
        body: formData,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          if (success) {
            router.push("/admin/lesson/quize/list");
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
        <div className="">
          <InputField
            name="o1"
            label="Option 1"
            required
            defaultValue={quize?.o1}
          />
          <label htmlFor="a1" className="flex gap-1.5 pt-2">
            <input
              type="checkbox"
              id="a1"
              name="a1"
              defaultChecked={quize?.answer?.includes(1)}
            />
            Correct answer
          </label>
        </div>
        <div>
          <InputField
            name="o2"
            label="Option 2"
            required
            defaultValue={quize?.o2}
          />
          <label htmlFor="a2" className="flex gap-1.5 pt-2">
            <input
              type="checkbox"
              id="a2"
              name="a2"
              defaultChecked={quize?.answer?.includes(2)}
            />
            Correct answer
          </label>
        </div>
        <div>
          <InputField
            name="o3"
            label="Option 3"
            required
            defaultValue={quize?.o3}
          />
          <label htmlFor="a3" className="flex gap-1.5 pt-2">
            <input
              type="checkbox"
              id="a3"
              name="a3"
              defaultChecked={quize?.answer?.includes(3)}
            />
            Correct answer
          </label>
        </div>
        <div>
          <InputField
            name="o4"
            label="Option 4"
            required
            defaultValue={quize?.o4}
          />
          <label htmlFor="a4" className="flex gap-1.5 pt-2">
            <input
              type="checkbox"
              id="a4"
              name="a4"
              defaultChecked={quize?.answer?.includes(4)}
            />
            Correct answer
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-max px-10 mt-5">
        Submit
      </button>
    </form>
  );
};

export default QuizeForm;
