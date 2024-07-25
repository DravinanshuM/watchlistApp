import { useEffect, useState } from "react";
import SideHeader from "../components/SideHeader.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState.jsx";
import { useContext } from "react";

const UserSignIn = () => {
  const navigate = useNavigate();
  const { LoginAuth } = useContext(GlobalContext);

  const [localStorageData, setLocalStorageData] = useState(null); // Initialize with null
  const [getInput, setGetInput] = useState("");
  const [message, setMessage] = useState("");

  // useEffect to load data from localStorage on component mount
  useEffect(() => {
    const getDataLocal = () => {
      try {
        const data = localStorage.getItem("myData");
        if (data) {
          setLocalStorageData(JSON.parse(data));
        } else {
          console.log("No data found in localStorage");
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        // Handle parsing error if needed
      }
    };

    getDataLocal();
  }, []);

  // useEffect to clear message after 2 seconds
  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [message]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered email exists in localStorageData
    const localEmail =
      localStorageData &&
      localStorageData.some((item) => item.email === getInput);

    if (localEmail) {
      LoginAuth(getInput);
      localStorage.setItem("Login", JSON.stringify(getInput));
      notify("Login Successfully.", "success");
      console.log("matched ::", getInput);
      navigate("/");
    } else {
      notify(
        "The email address you entered is not found in our records. Please check and try again.",
        "error"
      );
      console.log("unmatched :: ", getInput);
    }
  };

  // Helper function to show toast notifications
  const notify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
        break;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 fixed z-40">
        <SideHeader />
      </div>
      <div className="w-3/4 ml-20 sm:ml-44 md:ml-60 lg:ml-[396px] mx-7 mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-center font-mono text-2xl">Please Login Here</h1>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}
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
              aria-label="Email"
              value={getInput}
              onChange={(e) => setGetInput(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="p-2 border rounded-md hover:bg-blue-500 hover:text-white"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignIn;
