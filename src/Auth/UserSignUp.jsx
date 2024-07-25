import { useEffect, useState } from "react";
import SideHeader from "../components/SideHeader.jsx";

const UserSignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  const { name, email } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "" || email.trim() === "") {
        setMessage("Name and Email are required.");
        return;
      }

      // Check if email already exists in localStorage
      const existingData = JSON.parse(localStorage.getItem("myData")) || [];
      const isDuplicate = existingData.some((item) => item.email === email);

      if (isDuplicate) {
        setMessage("This email is already present in localStorage.");
        return;
      }

      // save in my database.
      const newData = { name, email };
      const updatedData = [...existingData, newData];
      localStorage.setItem("myData", JSON.stringify(updatedData));

      setFormData({ name: "", email: "" });
      setMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error submitting form. Please try again.");
    }
  };

  // useeffcet success message remove from UI after 2 seconds.
  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="flex">
      <div className="w-1/4 fixed z-40">
        <SideHeader />
      </div>
      <div className="w-3/4 ml-20 sm:ml-44 md:ml-60 lg:ml-[396px] mx-7 mt-20">
        <form
          onSubmit={onSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-center font-mono text-2xl">
            Please Registration Here
          </h1>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="off"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              aria-label="Name"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              autoComplete="off"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              aria-label="Email"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                (name.trim() === "" || email.trim() === "") &&
                "cursor-not-allowed opacity-50"
              }`}
              disabled={name.trim() === "" || email.trim() === ""}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignUp;
