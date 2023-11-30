import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [mailerState, setMailerState] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    company: "",
    enquiry: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleStateChange = (e) => {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "", // Clear validation error for the current field
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation for each field
    if (!mailerState.fname.trim()) {
      newErrors.fname = "First Name is required";
    }

    if (!mailerState.lname.trim()) {
      newErrors.lname = "Last Name is required";
    }

    if (!mailerState.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    if (!mailerState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(mailerState.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!mailerState.company.trim()) {
      newErrors.company = "Company Name is required";
    }

    if (!mailerState.enquiry.trim()) {
      newErrors.enquiry = "Enquiry is required";
    }

    // Set new errors and return if there are any errors
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitEmail = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setIsSubmitting(true);

        const response = await axios.post(
          "https://demo-contact-form.onrender.com/send",
          mailerState
        );

        const resData = response.data;

        if (resData.status === "success") {
          setMailerState({
            fname: "",
            lname: "",
            phone: "",
            email: "",
            company: "",
            enquiry: "",
          });
          // Redirect to the thank-you page
          navigate("/thank-you");
        } else if (resData.status === "fail") {
          setSubmitError("Message failed to send. Please try again.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        setSubmitError("An error occurred while sending the message.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center p-5 md:p-20">
        <form
          onSubmit={submitEmail}
          className="w-full h-full flex flex-col px-5 py-10 bg-blue-200 gap-10 text-lg text-black font-semibold capitalize [box-shadow:1px_0px_15px_8px_rgba(0,0,0,0.15)] rounded-3xl border-2 border-primary/30 md:w-[60rem] md:px-10"
          method="POST"
        >
          {/* name */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-5">
            {/* fname */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="fname">first name *</label>
              <input
                type="text"
                name="fname"
                id="fname"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.fname}
                onChange={handleStateChange}
              />
              {errors.fname && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.fname}
                </span>
              )}
            </div>

            {/* lname */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="lname">last name *</label>
              <input
                type="text"
                name="lname"
                id="lname"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.lname}
                onChange={handleStateChange}
              />
              {errors.lname && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.lname}
                </span>
              )}
            </div>
          </div>
          {/* phone/email */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-5">
            {/* phone */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="phone">phone no. *</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.phone}
                onChange={handleStateChange}
              />
              {errors.phone && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.phone}
                </span>
              )}
            </div>
            {/* email */}
            <div className="relative w-full flex flex-col gap-2 md:w-1/2">
              <label htmlFor="email">email *</label>
              <input
                type="email"
                name="email"
                id="email"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.email}
                onChange={handleStateChange}
              />
              {errors.email && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          {/* company */}
          <div>
            <div className="relative w-full flex flex-col gap-2">
              <label htmlFor="company">company *</label>
              <input
                type="text"
                name="company"
                id="company"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.company}
                onChange={handleStateChange}
              />
              {errors.company && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.company}
                </span>
              )}
            </div>
          </div>
          {/* enquiry */}
          <div>
            <div className="relative w-full flex flex-col gap-2">
              <label htmlFor="enquiry">enquiry *</label>
              <textarea
                name="enquiry"
                id="enquiry"
                cols="30"
                rows="10"
                className="py-1.5 px-2 rounded-xl bg-slate-200 text-black border ease-in-out duration-300 hover:border-primary hover:bg-slate-100 focus:outline-0 focus:border-primary focus:bg-slate-100"
                value={mailerState.enquiry}
                onChange={handleStateChange}
              />
              {errors.enquiry && (
                <span className="absolute -bottom-6 left-0 text-red-500 text-sm">
                  {errors.enquiry}
                </span>
              )}
            </div>
          </div>

          {/* submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-2 rounded-3xl uppercase ease-in-out duration-300 hover:bg-tertiary active:bg-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
          {submitError && (
            <div className="text-red-500 text-center mt-2">{submitError}</div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Form;
