import axios from '../axios/axios.js';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import supabase from '../utils/supabase.js';
function CourseDetail() {
  const courseId=useParams().id;
  const [course,setCourse]=useState();
  const [userId,setUserId]=useState('')
  const [error,setError]=useState('')
  const [isenrolled,setIsEnrolled]=useState(false)
  const handleEnroll=async()=>{
    try {
      const {data,error} = await axios.post(
        "/course/enroll",

        {
        userId,
        courseId
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(data.error){
       setError(data.error)
      }

      if(data.success)
      {
        alert('You are enrolled In this course')
      }
      
      
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
     supabase.from('enrollments')
     .select('*')
     .match({ course_id: courseId, student_id: userId })
     .then((res,err)=>{
      if(err){
        console.log(err)
      }
      if(res.data[0]?.enrollment_id){
        console.log(res)
        setIsEnrolled(true)
      }
     })
 
  },)

  useEffect(()=>{

    (
      async()=>{
         supabase.auth.onAuthStateChange((_,session)=>{
            if(session?.access_token){
              setUserId(session.user.id)
            }
          })
      }
    )()

  
  
  },[useParams])


  useEffect(()=>{
    (
      async()=>{
        const {data}= await axios.get(`/course/course/${courseId}`)
        if(data){
          setCourse(data)
        }
      }
    )()
  },[useParams])
    return(
        <div className="app">
          {
          
              <div className="details ">
                <div className="big-img">
                  <img src={course?.thumbnail} alt=""/>
                </div>
  
                <div className="box flex flex-col items-start justify-start">
                  <div className="row">
                    <h2>{course?.name}</h2>
                   
                  </div>
                  {/* <Colors colors={item.colors} /> */}
                  <p>Instructor: {course?.instructor}</p>
                  <p className='text-start'>Description: {course?.description}</p>
                  <p>Enrollment Status: {course?.enrollment_status}</p>
                  <p>Duration: {course?.duration}</p>
                  <p>Schedule: {course?.schedule}</p>
                  <p>Location: {course?.location}</p>
  
                  {/* <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} /> */}

                  {isenrolled ?   <button className="cart"  >Enrolled</button>:  <button className="cart" onClick={handleEnroll}>Enroll</button>}
                 
                  <p> {error || ''}</p>
  
                </div>
              </div>
          
          }
        </div>
      );
}

export default CourseDetail