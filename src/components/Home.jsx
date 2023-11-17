import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard.jsx";
import axios from "../axios/axios.js";
import supabase from "../utils/supabase.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [session,setSession]=useState('')

  const navigate=useNavigate()
  useEffect(()=>{
    (async()=>{
     const user= await supabase.auth.getSession()
   
    })()
  })

  useEffect(() => {
    (async () => {
      const { data, error } = await axios.get("/course/courses");
      setCourses(data);
      setLoading(false);
    })();
  }, []);


  useEffect(()=>{
    supabase.auth.onAuthStateChange((_,session)=>{
      if(session?.access_token){
        setSession(session.access_token)
      }
    })
  })

  if(!session){
  navigate('/login')
  }
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-xl">Loading....</h1>
      </div>
    );
  }
  return (
    <div className="contianer mx-auto  flex flex-wrap justify-center items-center ">
      {courses?.map((course, idx) => (
        <CourseCard
          key={idx}
          instructor={course.instructor}
          title={course.name}
          description={course.description}
          imgUrl={course.thumbnail}
          redirectTo={`/course-detail/${course.course_id}`}
        />
      ))}
    </div>
  );
}

export default Home;
