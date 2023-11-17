import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

function Navbar() {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const [id,setId]=useState('')

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/home");
  };


  useEffect(()=>{

    (
      async()=>{
         supabase.auth.onAuthStateChange((_,session)=>{
            if(session?.access_token){
              setId(session.user.id)
            }
          })
      }
    )()
  
  },[])

  useEffect(() => {
    (async () => {
      try {
        await supabase
          .from("students")
          .select("name")
          .eq("student_id", id)
          .then(({ data, error }) => {
            if (error) {
              console.log(error);
            }
            setUserName(data[0]?.name);
          });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="  h-[150px]">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
             Almeno
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {id ? (
              <div>
                <p className="text-white">Howdy, {username}</p>
                <Link
                  onClick={handleLogout}
                  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Logout 
                </Link>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a
                  href="/home"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  All Courses
                </a>
              </li>
           
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
