import { useState } from "react";
import logo from "../../assets/logogray.png";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";

const SignInPage = () => {
  const [inputClick, setInputClick] = useState({
    userName: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-center bg-linear-to-r from-black to-gray-900 ">
      <div className="w-full lg:max-w-[80%] max-w-[500px] h-full sm:h-[650px] lg:flex flex-row sm:rounded-3xl overflow-hidden bg-white">
        
        {/* LEFT PART */}
        <div className="w-full lg:w-1/2 h-full bg-white flex flex-col gap-y-10 py-5 px-10">
          <h1 className="text-xl mx-auto">
            Sign In to{" "}
            <span className="dancing-script-font text-orange-900">Grab</span>
          </h1>

          <div>
            {/* USERNAME FIELD */}
            <div className="relative w-full my-6">
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
                 onClick={() => setInputClick({ ...inputClick, userName: true })}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-900 rounded-2xl p-3 pt-5 outline-none bg-transparent"
                placeholder=" "
              />
            </div>

            {/* PASSWORD FIELD */}
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
            Sign In
          </button>

          <div className="w-full flex justify-between">
            <div className="flex gap-x-2">
            <p className="text-center tracking-tighter  text-gray-800">
              Don’t Have An Account?
            </p>
            <Link
              to="/"
              className="text-center text-gray-900 underline hover:text-blue-900"
            >
              Sign Up
            </Link>
          </div>
           <Link to={"/forget-password"} className="text-black hover:text-blue-600 underline">Forget Password</Link>
          </div>


        </div>

        {/* RIGHT IMAGE PART */}
        <div className="w-1/2 h-full bg-black rounded-2xl hidden lg:flex justify-center items-center">
          <img draggable="false" className="w-full scale-110 object-cover" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
