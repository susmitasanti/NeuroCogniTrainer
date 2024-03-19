import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Game from "./components/Game";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import PatientCard from "./components/PatientCard";
import Patient from "./components/Patient";
import AssignTask from './components/AssignTask';
import Appointment from "./components/Appointment";
import ViewAppointments from "./components/ViewAppointments";
import LandingPage from "./components/LandingPageComponents/pages/LandingPage";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path='/Welcome' element={<LandingPage/>}/>

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<LinkPage />} />
          <Route path="doctor" element={<Home />} />
          <Route path="/getPatient/:username" element={<PatientCard />} />
          <Route path="/assignTask" element={<AssignTask />} />
          <Route path='/ViewAppointments' element={<ViewAppointments/> } />

        </Route>

        <Route element={<RequireAuth />}>
          <Route path="patient" element={<Patient />} />
          <Route path="game/:gameName" element={<Game />} />
          <Route path='/BookAppointment' element={<Appointment/> } />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route path="/landing" element={<LandingPage />}></Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
