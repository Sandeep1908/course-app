import axios from "../axios/axios.js";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../supabase/auth.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try{
        const data= await userLogin(email,password)
        if(data.error){
            return alert(data.error)
        }
        navigate('/home')
      }
      catch(error){
        console.log("error",error);
      }
    }
  

  return (
    <div>
      <div className="lg:flex justify-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
              Log in
            </h2>
            <div className="mt-12">
              <form onSubmit={handleLoginSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    required
                    placeholder="mike@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <div>
                      <a
                        className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-10">
                  <button
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Don't have an account ?{" "}
                <Link
                  to={"/signup"}
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
