import Link from "next/link";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../store/themeConfigSlice";
import { useDispatch } from "react-redux";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import GeneralSetting from "@/components/admin/Settings/GeneralSetting";
import SocialSetting from "@/components/admin/Settings/SocialSetting";
import AccountSetting from "@/components/admin/Settings/AccountSetting";

const Settings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Account Setting"));
  });
  const [tabs, setTabs] = useState<string>("general");
  const toggleTabs = (name: string) => {
    setTabs(name);
  };

  return (
    <DefaultLayout>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="#" className="text-primary hover:underline">
              Settings
            </Link>
          </li>
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span className="capitalize">{tabs}</span>
          </li>
        </ul>
        <div className="pt-5">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">
              Settings
            </h5>
          </div>
          <div>
            <ul className="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
              <li className="inline-block">
                <button
                  onClick={() => toggleTabs("general")}
                  className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                    tabs === "general" ? "!border-primary text-primary" : ""
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <path
                      opacity="0.5"
                      d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 15L12 18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  General
                </button>
              </li>
              <li className="inline-block">
                <button
                  onClick={() => toggleTabs("payment-details")}
                  className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                    tabs === "payment-details"
                      ? "!border-primary text-primary"
                      : ""
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                  >
                    <circle
                      opacity="0.5"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 6V18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Payment Details
                </button>
              </li>
              <li className="inline-block">
                <button
                  onClick={() => toggleTabs("account")}
                  className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                    tabs === "account" ? "!border-primary text-primary" : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="6"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      opacity="0.5"
                      cx="12"
                      cy="17"
                      rx="7"
                      ry="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Account
                </button>
              </li>
              <li className="inline-block">
                <button
                  onClick={() => toggleTabs("social")}
                  className={`flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary ${
                    tabs === "social" ? "!border-primary text-primary" : ""
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.00659 6.93309C5.04956 5.7996 5.70084 4.77423 6.53785 3.93723C7.9308 2.54428 10.1532 2.73144 11.0376 4.31617L11.6866 5.4791C12.2723 6.52858 12.0372 7.90533 11.1147 8.8278M17.067 18.9934C18.2004 18.9505 19.2258 18.2992 20.0628 17.4622C21.4558 16.0692 21.2686 13.8468 19.6839 12.9624L18.5209 12.3134C17.4715 11.7277 16.0947 11.9628 15.1722 12.8853"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      opacity="0.5"
                      d="M5.00655 6.93311C4.93421 8.84124 5.41713 12.0817 8.6677 15.3323C11.9183 18.5829 15.1588 19.0658 17.0669 18.9935M15.1722 12.8853C15.1722 12.8853 14.0532 14.0042 12.0245 11.9755C9.99578 9.94676 11.1147 8.82782 11.1147 8.82782"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Social
                </button>
              </li>
            </ul>
          </div>
          {tabs === "general" ? <GeneralSetting /> : ""}
          {tabs === "payment-details" ? (
            <div>
              <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="panel">
                  <div className="mb-5">
                    <h5 className="mb-4 text-lg font-semibold">
                      Billing Address
                    </h5>
                    <p>
                      Changes to your{" "}
                      <span className="text-primary">Billing</span> information
                      will take effect starting with scheduled payment and will
                      be refelected on your next invoice.
                    </p>
                  </div>
                  <div className="mb-5">
                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                      <div className="flex items-start justify-between py-3">
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                          Address #1
                          <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">
                            2249 Caynor Circle, New Brunswick, New Jersey
                          </span>
                        </h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button className="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                      <div className="flex items-start justify-between py-3">
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                          Address #2
                          <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">
                            4262 Leverton Cove Road, Springfield, Massachusetts
                          </span>
                        </h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button className="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start justify-between py-3">
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                          Address #3
                          <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">
                            2692 Berkshire Circle, Knoxville, Tennessee
                          </span>
                        </h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button className="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary">Add Address</button>
                </div>
                <div className="panel">
                  <div className="mb-5">
                    <h5 className="mb-4 text-lg font-semibold">
                      Payment History
                    </h5>
                    <p>
                      Changes to your{" "}
                      <span className="text-primary">Payment Method</span>{" "}
                      information will take effect starting with scheduled
                      payment and will be refelected on your next invoice.
                    </p>
                  </div>
                  <div className="mb-5">
                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                      <div className="flex items-start justify-between py-3">
                        <div className="flex-none ltr:mr-4 rtl:ml-4">
                          <img
                            src="/assets/images/card-americanexpress.svg"
                            alt="img"
                          />
                        </div>
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                          Mastercard
                          <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">
                            XXXX XXXX XXXX 9704
                          </span>
                        </h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button className="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                      <div className="flex items-start justify-between py-3">
                        <div className="flex-none ltr:mr-4 rtl:ml-4">
                          <img
                            src="/assets/images/card-mastercard.svg"
                            alt="img"
                          />
                        </div>
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                          American Express
                          <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">
                            XXXX XXXX XXXX 310
                          </span>
                        </h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button className="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start justify-between py-3">
                        <div className="flex-none ltr:mr-4 rtl:ml-4">
                          <img src="/assets/images/card-visa.svg" alt="img" />
                        </div>
                        <h6 className="text-[15px] font-bold text-[#515365] dark:text-white-dark">
                          Visa
                          <span className="mt-1 block text-xs font-normal text-white-dark dark:text-white-light">
                            XXXX XXXX XXXX 5264
                          </span>
                        </h6>
                        <div className="flex items-start justify-between ltr:ml-auto rtl:mr-auto">
                          <button className="btn btn-dark">Edit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary">
                    Add Payment Method
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="panel">
                  <div className="mb-5">
                    <h5 className="mb-4 text-lg font-semibold">
                      Add Billing Address
                    </h5>
                    <p>
                      Changes your New{" "}
                      <span className="text-primary">Billing</span> Information.
                    </p>
                  </div>
                  <div className="mb-5">
                    <form>
                      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="billingName">Name</label>
                          <input
                            id="billingName"
                            type="text"
                            placeholder="Enter Name"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="billingEmail">Email</label>
                          <input
                            id="billingEmail"
                            type="email"
                            placeholder="Enter Email"
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div className="mb-5">
                        <label htmlFor="billingAddress">Address</label>
                        <input
                          id="billingAddress"
                          type="text"
                          placeholder="Enter Address"
                          className="form-input"
                        />
                      </div>
                      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        <div className="md:col-span-2">
                          <label htmlFor="billingCity">City</label>
                          <input
                            id="billingCity"
                            type="text"
                            placeholder="Enter City"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="billingState">State</label>
                          <select
                            id="billingState"
                            className="form-select text-white-dark"
                          >
                            <option>Choose...</option>
                            <option>...</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="billingZip">Zip</label>
                          <input
                            id="billingZip"
                            type="text"
                            placeholder="Enter Zip"
                            className="form-input"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn btn-primary">
                        Add
                      </button>
                    </form>
                  </div>
                </div>
                <div className="panel">
                  <div className="mb-5">
                    <h5 className="mb-4 text-lg font-semibold">
                      Add Payment Method
                    </h5>
                    <p>
                      Changes your New{" "}
                      <span className="text-primary">Payment Method </span>
                      Information.
                    </p>
                  </div>
                  <div className="mb-5">
                    <form>
                      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="payBrand">Card Brand</label>
                          <select
                            id="payBrand"
                            className="form-select text-white-dark"
                          >
                            <option value="Mastercard">Mastercard</option>
                            <option value="American Express">
                              American Express
                            </option>
                            <option value="Visa">Visa</option>
                            <option value="Discover">Discover</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="payNumber">Card Number</label>
                          <input
                            id="payNumber"
                            type="text"
                            placeholder="Card Number"
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="payHolder">Holder Name</label>
                          <input
                            id="payHolder"
                            type="text"
                            placeholder="Holder Name"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="payCvv">CVV/CVV2</label>
                          <input
                            id="payCvv"
                            type="text"
                            placeholder="CVV"
                            className="form-input"
                          />
                        </div>
                      </div>
                      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="payExp">Card Expiry</label>
                          <input
                            id="payExp"
                            type="text"
                            placeholder="Card Expiry"
                            className="form-input"
                          />
                        </div>
                      </div>
                      <button type="button" className="btn btn-primary">
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {tabs === "account" ? <AccountSetting /> : ""}
          {tabs === "social" ? <SocialSetting /> : ""}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
