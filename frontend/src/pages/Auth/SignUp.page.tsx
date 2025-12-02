import { useState } from "react";
import logo from "../../assets/logogray.png";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react"; 

const SignUpPage = () => {
  const [inputClick, setInputClick] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className="w-full h-screen flex justify-center items-center bg-linear-to-r from-black to-gray-900 ">
      <div className="w-full lg:max-w-[80%] max-w-[500px] h-full sm:h-[650px] lg:flex flex-row  sm:rounded-3xl overflow-hidden bg-white ">
        <div className=" w-full lg:w-1/2 h-full bg-white  flex flex-col gap-y-10  py-5 px-10">
          <h1 className="text-xl mx-auto">
            Sign Up to{" "}
            <span className="dancing-script-font text-orange-900">Grab</span>
          </h1>
          <div>
            <div className="relative w-full my-4">
              <label
                htmlFor="fname"
                onClick={() => setInputClick({ ...inputClick, name: true })}
                className={`absolute ${
                  inputClick.name ? "-top-3 bg-white" : "top-3"
                } left-3 text-gray-800  text-md transition-all`}
              >
                Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onClick={() => setInputClick({ ...inputClick, name: true })}
                className="w-full border border-gray-900 rounded-2xl p-3 pt-5 outline-none bg-transparent"
                placeholder=" "
              />
            </div>
            <div className="relative w-full my-4">
              <label
                htmlFor="userName"
                onClick={() => setInputClick({ ...inputClick, userName: true })}
                className={`absolute ${
                  inputClick.userName ? "-top-3 bg-white" : "top-3"
                } left-3 text-gray-900 text-md transition-all`}
              >
                UserName
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onClick={() => setInputClick({ ...inputClick, userName: true })}
                className="w-full border border-gray-900 rounded-2xl p-3 pt-5 outline-none bg-transparent"
                placeholder=" "
              />
            </div>
            <div className="relative w-full my-4">
              <label
                htmlFor="email"
                onClick={() => setInputClick({ ...inputClick, email: true })}
                className={`absolute ${
                  inputClick.email ? "-top-2 bg-white" : "top-3"
                } left-3 text-gray-900 text-md transition-all`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={() => setInputClick({ ...inputClick, email: true })}
                className="w-full border border-gray-900 rounded-2xl p-3 pt-5 outline-none bg-transparent"
                placeholder=" "
              />
            </div>

            <div className="relative border border-gray-900 rounded-2xl flex items-center px-2 w-full my-6">
              <label
                htmlFor="password"
                onClick={() => setInputClick({ ...inputClick, password: true })}
                className={`absolute ${
                  inputClick.password ? "-top-3 bg-white" : "top-3"
                } left-3 text-gray-900 text-md transition-all`}
              >
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onClick={() => setInputClick({ ...inputClick, password: true })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[90%] p-3 pt-5 outline-none bg-transparent"
                placeholder=""
              />

              {showPassword ? (
                <EyeOff
                  className="w-6 h-6 text-gray-900 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="w-6 h-6  text-gray-900 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          </div>

          <button className="w-1/2 mx-auto bg-black rounded-2xl py-3 text-white text-md font-bold">
            Sign Up
          </button>

          <div className="flex gap-x-2 mx-auto">
            <p className="text-center text-gray-800">
              Already Have An Account ?{" "}
            </p>
            <Link
              to="/signin"
              className="text-center text-gray-900 underline hover:text-blue-900"
            >
              SignIn
            </Link>
          </div>
        </div>
        <div className="w-1/2 h-full bg-black rounded-3xl  hidden lg:flex justify-center items-center ">
          <img draggable="false"  className="w-full scale-110 object-cover" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
