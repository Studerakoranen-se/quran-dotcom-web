import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const GeneralSetting = () => {
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
      { key: "site_title", value: e.target.site_title.value },
      { key: "site_description", value: e.target.site_description.value },
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
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black"
      >
        <h6 className="mb-5 text-lg font-bold">General Information</h6>
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col gap-5 w-full">
            <div>
              <label htmlFor="site_title">Site Title</label>
              <input
                id="site_title"
                name="site_title"
                type="text"
                defaultValue={setting?.site_title}
                className="form-input"
              />
            </div>
            <div>
              <label htmlFor="site_description">Site Description</label>
              <input
                id="site_description"
                name="site_description"
                type="text"
                defaultValue={setting?.site_description}
                className="form-input"
              />
            </div>
            <div className="mt-3 sm:col-span-2">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GeneralSetting;
