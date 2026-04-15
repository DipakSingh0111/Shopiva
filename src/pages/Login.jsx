import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-[40px] left-0 w-full h-screen flex justify-center items-center 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-[length:400%_400%] animate-[gradientMove_10s_ease_infinite]"
    >
      <form
        className="w-[350px] max-w-[90%] p-[40px_30px] rounded-2xl 
            bg-white/10 backdrop-blur-xl shadow-2xl text-center text-white"
      >
        <h1 className="text-[26px] mb-1 font-semibold">Welcome Back 👋</h1>

        <p className="text-sm mb-6 opacity-85">Login to continue</p>
        {/* Email */}
        <div className="text-left mb-5">
          <label className="text-[13px] block mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg outline-none text-black focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="text-left mb-5">
          <label className="text-[13px] block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg outline-none text-black focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-indigo-500 font-semibold 
                    hover:bg-indigo-600 transition-all duration-300 hover:-translate-y-1"
        >
          Login
        </button>

        {/* Footer */}
        <p className="mt-4 text-sm">
          Do have no account please register?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-200 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
