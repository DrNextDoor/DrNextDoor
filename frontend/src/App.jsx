// App.js
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Route, Routes } from 'react-router-dom'


//doctor imports
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import Profile from "./pages/Doctor/DoctorProfile"
import DoctorLogin from './pages/Doctor/DoctorLogin';
import DoctorRegister from './pages/Doctor/DoctorRegister';
import DoctorProfile from './pages/Doctor/DoctorProfile';

//patient imports
import Login from "./pages/Patient/Login"
import Appointments from './pages/Patient/Appointments';
import Register from './pages/Patient/Register'
import PatientProfile from './pages/Patient/PatientProfile';
import UpdatePatient from './pages/Patient/UpdatePatient';
import BookAppointments from './pages/Patient/BookAppointments';
import PatientAppointments from './pages/Patient/PatientAppointments';

//admin imports
import AdminLogin from "./pages/Admin/AdminLogin"
import AddDoctor from './pages/Admin/AddDoctor';
import AdminHomme from './pages/Admin/AdminHomme';
import DrDetailsAdmin from './pages/Admin/DrDetailsAdmin';

//others
import Navbar from './components/Navbar'
import MainLayout from "./Layout/MainLayout"
import Contact from "./pages/Contact"
import Home from './pages/Home'
import {AuthProvider} from './context/AuthPatient'
import AboutUs from './pages/About';


import AskQuestion from './pages/AskQuestion';
import QuestionList from './components/QuestionList'; 



const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",element:<MainLayout/>,
      children:[
        {path:"/",element:<Home/>},
        {path:"/about",element:<AboutUs/>},
        {path:"/contact",element:<Contact/>},
        {path:"/query",element:<AskQuestion/>},
        {path:"/questions",element:<QuestionList/>},

        //doctor routes
        {path:"/doctorLogin",element:<DoctorLogin/>},
        {path:"/DoctorRegister",element:<DoctorRegister/>},
        {path:"/DoctorProfile",element:<DoctorProfile/>},
        {path:"/doctorDashboard",element:<DoctorDashboard/>},

        //patient routes
        {path:"/appointments",element:<Appointments/>},
        {path:"/login",element:<Login/>},
        {path:"/register",element:<Register/>},
        {path:"/doctors/:id",element:<BookAppointments/>},
        {path:"/patientProfile",element:<PatientProfile/>},
        {path:"/updateProfile",element:<UpdatePatient/>},
        {path:"/patientAppointments",element:<PatientAppointments/>},
        
        
        //admin routes
        {path:"/admin/login",element:<AdminLogin/>},
        {path:"/admin/allDoctors", element: <AdminHomme />},
        {path:"/admin/doctors/:id", element: <DrDetailsAdmin />},
        {path:"/admin/addDoctor", element: <AddDoctor />}
      ]
    }
  ])
  return(
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  ) 
}
export default App
