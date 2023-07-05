import { FiFacebook, FiInstagram, FiPhone, FiMail } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const AccountSetting = () => {
  const [user, setUser] = useState<any>([]);
  useEffect(() => {
    fetch("/api/v1/user/1", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.log("error", error));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const settings = JSON.stringify([
      { key: "fullname", value: e.target.fullname.value },
      { key: "mail", value: e.target.mail.value },
      { key: "password", value: e.target.password.value },
    ]);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("/api/v1/user/update?id=1", {
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
      className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black"
    >
      <h6 className="mb-5 text-lg font-bold">Account Information</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-5 w-full">
          <div>
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              className="form-input"
              defaultValue={user?.fullname}
            />
          </div>
          <div>
            <label htmlFor="mail">Email</label>
            <input
              id="mail"
              name="mail"
              type="text"
              defaultValue={user?.mail}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              defaultValue={user?.password}
              type="password"
              className="form-input"
            />
          </div>
          <div className="mt-3 sm:col-span-2">
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AccountSetting;
