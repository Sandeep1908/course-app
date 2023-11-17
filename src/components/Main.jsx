import React, { useEffect,useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import supabase from "../utils/supabase";
function Main() {
  const location=useLocation()
  const navigate=useNavigate()

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,SetUser]=useState(null)
 

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
     if(session?.access_token){
      setSession(session)
     }
    });
  }, []);

  
  
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Main;
