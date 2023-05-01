import { useForm } from "react-hook-form";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";
import RadioField from "../fields/RadioField";
import { sendEmail } from "@/utils/sendMail";
import { useState } from "react";

type FormValues = {
  first_name: string;
  last_name: string;
  tutor: string;
  age: any;
  gender: string;
  studyLevel: string;
  email: string;
  phone: string;
};

type Props = {
  tutors: any;
  selectedTutor: string;
};

function getAge(dateString: string) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const ApplyForm = ({ tutors, selectedTutor }: Props) => {
  const [success, setSuccess] = useState(false);

  const { handleSubmit, control } = useForm<FormValues>({
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => {
    let tutor: any = null;
    tutors.forEach((t: any) => {
      if (t.mail == data.tutor) {
        tutor = t;
      }
    });

    const subject = "Subject: Application for Tutor";
    const txt = `Dear ${
      tutor?.fullname
    },\r\n\r\nI hope this email finds you well. My name is ${
      data.first_name + " " + data.last_name
    } and I am a student seeking a tutor to help me with my studies.\r\n\r\nAfter careful consideration and research, I came across your profile and I was impressed with your qualifications and experience in the field of teaching. I am interested in working with you as my tutor.\r\n\r\nA little about myself, I am a ${getAge(
      data.age
    )} years old ${data.gender} student currently pursuing ${
      data.studyLevel
    }. I am passionate about learning and I am seeking a tutor who can guide me in my academic journey and help me reach my full potential.\r\n\r\nI believe that your expertise and teaching style will be a perfect fit for my learning needs. I am confident that with your guidance, I will be able to achieve my academic goals.\r\n\r\nPlease let me know if you are available to take me on as a student and what your availability and rates are. I am looking forward to hearing from you soon.\r\n\r\nThank you for considering my application.\r\n\r\nSincerely,\r\n\r\n${
      data.first_name + " " + data.last_name
    }\r\n${data.email}\r\n${data.phone}`;

    var formdata = new FormData();
    formdata.append("to", data.tutor);
    formdata.append("subject", subject);
    formdata.append("text", txt);

    fetch("/api/v1/mail/send", {
      method: "POST",
      body: formdata,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setSuccess(true))
      .catch((error) => console.log("error", error));
  };

  const tutorOptions = () => {
    return tutors.map((tutor: any) => {
      return {
        value: tutor.mail,
        label: tutor.fullname,
      };
    });
  };

  const learnLevels = [
    {
      value: "Arabic level 1",
      label: "Arabic level 1",
    },
    {
      value: "Arabic level 2",
      label: "Arabic level 2",
    },
    {
      value: "Arabic level 3",
      label: "Arabic level 3",
    },
  ];

  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  return (
    <div className="container" id="applyform">
      <div className="bg-white rounded-lg p-10">
        <div className="text-[#064B4B] text-center pb-5">
          <h1 className=" text-xl font-semibold">Registration Form</h1>
          <p>Read All Ahadith In The Book Of Revelation By Sahih Al Bukhari</p>
        </div>
        {success ? (
          <div className="text-[#064B4B] text-center py-10">
            <h1 className="font-semibold text-xl pb-3">
              Application sended successfully!
            </h1>
            <p>The tutor will reply you via email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=" py-5">
            <div className="grid md:grid-cols-2 gap-5">
              <InputField
                label="First Name"
                control={control}
                name="first_name"
                placeholder="First name"
                rules={{ required: true }}
              />
              <InputField
                label="Last name"
                control={control}
                name="last_name"
                placeholder="Last name"
                rules={{ required: true }}
              />
              <InputField
                type="email"
                label="Email"
                control={control}
                name="email"
                placeholder="example@email.com"
                rules={{ required: true }}
              />
              <InputField
                type="tel"
                label="Mobile number"
                control={control}
                name="phone"
                placeholder="Mobile number"
                rules={{ required: true }}
              />
              <SelectField
                control={control}
                label="What is your level of study?"
                name="studyLevel"
                options={learnLevels}
                rules={{ required: true }}
              />
              <SelectField
                control={control}
                label="Select instructor?"
                name="tutor"
                options={tutorOptions()}
                rules={{ required: true }}
                selectedOption={selectedTutor}
              />
              <InputField
                type="date"
                label="Age?"
                control={control}
                name="age"
                rules={{ required: true }}
              />
              <div className=""></div>
              <RadioField
                label="Gender"
                control={control}
                name="gender"
                options={genderOptions}
              />
            </div>
            <button
              type="submit"
              className="bg-[#043B3B] text-center py-3 px-5 text-white rounded-full mt-10"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
