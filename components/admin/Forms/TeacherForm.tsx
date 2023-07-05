import { GetServerSideProps } from "next";
import FileInput from "../Fields/FileInput";
import InputField from "../Fields/InputField";
import TextField from "../Fields/TextField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PanelSelectField from "../Fields/PanelSelectField";

type Props = {
  teacher?: any;
};

const TeacherForm = ({ teacher }: Props) => {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("fullname", e.target.fullname.value);
    formdata.append("sex", e.target.sex.value);
    formdata.append("age", e.target.age.value);
    formdata.append("mail", e.target.mail.value);
    formdata.append("phone", e.target.phone.value);
    // formdata.append("nationality", e.target.nationality.value);
    formdata.append("address", e.target.address.value);
    formdata.append("description", e.target.description.value);
    if (e.target.image.files.length > 0) {
      formdata.append("image", e.target.image.files[0], e.target.image.value);
    }

    if (teacher) {
      fetch("/api/v1/teacher/update?id=" + teacher.id, {
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
      fetch("/api/v1/teacher/add", {
        method: "POST",
        body: formdata,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then(({ success, msg, result }) => {
          if (success) {
            router.push("/admin/teacher/list");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const genders = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        name="fullname"
        label="Full Name"
        required
        placeholder="teacher name ..."
        defaultValue={teacher?.fullname}
      />
      <div className="grid md:grid-cols-2 gap-5">
        <PanelSelectField label="Gender" name="sex" options={genders} />
        <InputField
          name="age"
          label="Age"
          required
          type="number"
          defaultValue={teacher?.age}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <InputField
          name="mail"
          label="Email"
          required
          type="email"
          placeholder="example@email.com"
          defaultValue={teacher?.mail}
        />
        <InputField
          name="phone"
          label="Phone"
          required
          type="tel"
          defaultValue={teacher?.phone}
        />
      </div>
      <InputField
        name="address"
        label="Address"
        required
        defaultValue={teacher?.address}
      />
      <FileInput label="Image" name="image" />
      <TextField
        name="description"
        label="Description"
        required
        placeholder="Write description.."
        defaultValue={teacher?.description}
      />
      <button type="submit" className="btn btn-primary w-max px-10">
        Submit
      </button>
    </form>
  );
};

export default TeacherForm;
