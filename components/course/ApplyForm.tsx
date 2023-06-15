import { useForm } from "react-hook-form";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";
import RadioField from "../fields/RadioField";
import RadioAssessment from "../fields/RadioAssessment";
import { sendEmail } from "@/utils/sendMail";
import MessageField from "../fields/MessageField";
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
  message: string;
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
    const txt = `Dear ${tutor?.fullname
      },\r\n\r\nI hope this email finds you well. My name is ${data.first_name + " " + data.last_name
      } and I am a student seeking a tutor to help me with my studies.\r\n\r\nAfter careful consideration and research, I came across your profile and I was impressed with your qualifications and experience in the field of teaching. I am interested in working with you as my tutor.\r\n\r\nA little about myself, I am a ${getAge(
        data.age
      )} years old ${data.gender} student currently pursuing ${data.studyLevel
      }. I am passionate about learning and I am seeking a tutor who can guide me in my academic journey and help me reach my full potential.\r\n\r\nI believe that your expertise and teaching style will be a perfect fit for my learning needs. I am confident that with your guidance, I will be able to achieve my academic goals.\r\n\r\nPlease let me know if you are available to take me on as a student and what your availability and rates are. I am looking forward to hearing from you soon.\r\n\r\nThank you for considering my application.\r\n\r\nSincerely,\r\n\r\n${data.first_name + " " + data.last_name
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
      value: "Nybörjare",
      label: "Nybörjare",
    },
    {
      value: "Medel",
      label: "Medel",
    },
    {
      value: "Avancerad",
      label: "Avancerad",
    },
  ];

  const genderOptions = [
    {
      value: "male",
      label: "Man",
    },
    {
      value: "female",
      label: "Kvinna",
    },
  ];
  const teacherAssessment = [
    {
      value: "Läraren bedömer",
      label: "Läraren bedömer",
    },
  ];


  return (
    <div className="container" id="applyform">
      <div className="bg-white rounded-lg p-10 border-[5px] shadow-inner border-[#E0D2B4]">
        <p className="font-semibold">* = Obligatorisk att fylla i.</p>
        <div className="text-[#064B4B] text-center pb-5">
          <h1 className=" text-xl font-semibold">Registrering</h1>
        </div>
        {success ? (
          <div className="text-[#064B4B] text-center py-10">
            <h1 className="font-semibold text-xl pb-3">
              Ansökan har skickats!
            </h1>
            <p>Handledaren kommer att kontakta dig via mejl.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className=" py-5">
            <div className="grid md:grid-cols-3 gap-5">
              <InputField
                p="*"
                label="Förnamn"
                control={control}
                name="first_name"
                placeholder="Förnamn"
                rules={{ required: true }}
              />
              <InputField
                p="*"
                label="Efternamn"
                control={control}
                name="last_name"
                placeholder="Efternamn"
                rules={{ required: true }}
              />
              <InputField
                p="*"
                type="email"
                label="Mail adress"
                control={control}
                name="Mail adress"
                placeholder="exempel@email.com"
                rules={{ required: true }}
              />
              <InputField
                p="*"
                type="tel"
                label="Mobilnummer"
                control={control}
                name="phone"
                placeholder="Mobilnummer"
                rules={{ required: true }}
              />
              <SelectField
                control={control}
                p="*"
                label="Vad är din studienivå?"
                name="studyLevel"
                options={learnLevels}
                rules={{ required: true }}
              />
              <SelectField
                p="*"
                control={control}
                label="Välj instruktör?"
                name="tutor"
                options={tutorOptions()}
                rules={{ required: true }}
                selectedOption={selectedTutor}
              />
              <InputField
                p="*"
                type="date"
                label="Ålder?"
                control={control}
                name="Ålder"
                rules={{ required: true }}
              />
              <div className=""></div>
              <RadioField
                p="*"
                label="Kön"
                control={control}
                name="Kön"
                options={genderOptions}
                rules={{ required: true }}
              />
              <div className="flex flex-col pt-5 gap-10">

                <div className="pt-2">
                  <MessageField
                    p="*"
                    type="message"
                    label="Vad vill du studera?"
                    span="Här skriver du om du har specifika önskemål om att studera en viss bok eller lära dig en viss kunskap."
                    // span="Kryssa i 'Läraren bedömer' om du önskar att läraren gör en specifik bedömning"
                    control={control}
                    name="Vad vill du studera?"
                    rules={{ required: true }}
                  />
                </div>

                <MessageField
                  p="*"
                  type="message"
                  label="Vad har du för mål eller förväntningar?"
                  span="Här beskriver du vad du vill uppnå med dessa lektioner, så att läraren
                    kan anpassa dina behov"
                  control={control}
                  name="Vad har du för mål"
                  rules={{ required: true }}
                />

                <MessageField
                  type="message"
                  label="Övriga önskemål"
                  control={control}
                  name="Övriga önskemål"
                  rules={{ required: false }}
                />
              </div>

            </div>
            <button
              type="submit"
              className="bg-[#043B3B] text-center py-3 px-5 text-white rounded-full mt-10"
            >
              Skicka Ansökan
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
