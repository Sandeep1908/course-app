import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../axios/axios.js'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
 
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return alert("password doesn't matched");
    }

    const {data,session} = await axios.post(
      "/user/api/signup",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    console.log(data,session);
    if(data.error){
        return alert(data.error)
    }

    alert(data.message)
    navigate('/login')

  };
  return (
    <div>
      <div className="lg:flex justify-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-center xl:text-5xl
               xl:text-bold"
            >
              Get Started
            </h2>
            <div className="mt-12">
              <form onSubmit={handleFormSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Name
                  </div>
                  <input
                    className="w-full text-lg py-2 p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="ex: john"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-4 mb-4">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="mike@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Confirm Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your confirm password"
                    onChange={(e) => setComfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                           font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                           shadow-lg"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Already have an account ?{" "}
                <Link
                  to={"/login"}
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
