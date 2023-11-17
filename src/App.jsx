import { useEffect } from "react";
import "./App.css";
import CourseDetail from "./components/CourseDetail.jsx";
import Home from "./components/Home.jsx";
import Main from "./components/Main.jsx";
 
import {
  createBrowserRouter ,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      <Route path="home" element={<Home />} />
      <Route path="course-detail/:id" element={<CourseDetail/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Signup/>}/>
    </Route>
  )
);

function App() {
 
  return <>
    <RouterProvider router={router}/>
  </>;
}

export default App;
