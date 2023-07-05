import { FiFacebook, FiInstagram, FiPhone, FiMail } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const SocialSetting = () => {
  const [setting, setSetting] = useState<any>([]);

  useEffect(() => {
    fetch("/api/v1/setting/all", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        const r = {};

        for (const obj of result) {
          r[obj.key] = obj.value;
        }
        setSetting(r);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const settings = JSON.stringify([
      { key: "facebook_url", value: e.target.facebook_url.value },
      { key: "instagram_url", value: e.target.instagram_url.value },
      { key: "contact_email", value: e.target.contact_email.value },
      { key: "contact_phone", value: e.target.contact_phone.value },
    ]);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("/api/v1/setting/update", {
      method: "POST",
      headers: myHeaders,
      body: settings,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(({ success, msg }) => {
        Swal.fire({
          icon: success ? "success" : "error",
          title: success ? "Success" : "Error",
          text: msg,
          padding: "2em",
          customClass: "sweet-alerts",
        });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black"
    >
      <h6 className="mb-5 text-lg font-bold">Social</h6>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex">
          <div className="flex items-center justify-center rounded bg-[#eee] px-3 font-semibold ltr:mr-2 rtl:ml-2 dark:bg-[#1b2e4b]">
            <FiFacebook className="text-xl" />
          </div>
          <input
            type="text"
            name="facebook_url"
            placeholder=""
            defaultValue={setting?.facebook_url}
            className="form-input"
          />
        </div>
        <div className="flex">
          <div className="flex items-center justify-center rounded bg-[#eee] px-3 font-semibold ltr:mr-2 rtl:ml-2 dark:bg-[#1b2e4b]">
            <FiInstagram className="text-xl" />
          </div>
          <input
            type="text"
            name="instagram_url"
            placeholder=""
            defaultValue={setting?.instagram_url}
            className="form-input"
          />
        </div>
        <div className="flex">
          <div className="flex items-center justify-center rounded bg-[#eee] px-3 font-semibold ltr:mr-2 rtl:ml-2 dark:bg-[#1b2e4b]">
            <FiPhone className="text-xl" />
          </div>
          <input
            type="text"
            name="contact_phone"
            placeholder=""
            defaultValue={setting?.contact_phone}
            className="form-input"
          />
        </div>
        <div className="flex">
          <div className="flex items-center justify-center rounded bg-[#eee] px-3 font-semibold ltr:mr-2 rtl:ml-2 dark:bg-[#1b2e4b]">
            <FiMail className="text-xl" />
          </div>
          <input
            type="text"
            name="contact_email"
            placeholder="example@email.com"
            defaultValue={setting?.contact_email}
            className="form-input"
          />
        </div>
        <div className="mt-3 sm:col-span-2">
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </form>
  );
};

export default SocialSetting;
