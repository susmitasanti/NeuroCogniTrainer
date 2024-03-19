import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";

const Home = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();



  useEffect(async () => {
    const response = await axios.get("/api/doctors/getPatients", {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });


    console.log(response.data);
    setPatients(response.data);
  }, []);
  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };



  return (
    // <section>
    //     <h1>Home</h1>
    //     <br />
    //     <p>You are logged in!</p>
    //     <p>List of Patients</p>
    //     <ul>
    //         {
    //             patients.map((patient) => {
    //                 return (
    //                     <li><Link to={`/getPatient/${patient.username}`}>{patient.username}</Link></li>
    //                 )
    //             })
    //         }
    //     </ul>
    //     <br />
    //     <Link to="/editor">Go to the Editor page</Link>
    //     <br />
    //     <Link to="/admin">Go to the Admin page</Link>
    //     <br />
    //     <Link to="/lounge">Go to the Lounge</Link>
    //     <br />
    //     <Link to="/linkpage">Go to the link page</Link>
    //     <div className="flexGrow">
    //         <button onClick={logout}>Sign Out</button>
    //     </div>
    // </section>

    <section className="p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <p className="mb-2">You are logged in!</p>
      <p className="mb-2">List of Patients</p>
      <ul className="list-disc ml-6 mb-4">
        {patients.map((patient) => (
          <li key={patient.username}>
            <Link
              to={`/getPatient/${patient.username}`}
              className="text-blue-500 hover:underline"
            >
              {patient.username}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/editor" className="text-blue-500 hover:underline block mb-2">
        Go to the Editor page
      </Link>
      <Link to="/admin" className="text-blue-500 hover:underline block mb-2">
        Go to the Admin page
      </Link>
      <Link to="/lounge" className="text-blue-500 hover:underline block mb-2">
        Go to the Lounge
      </Link>
      <Link to="/linkpage" className="text-blue-500 hover:underline block mb-2">
        Go to the link page
      </Link>
      <Link to="/ViewAppointments" className="text-blue-500 hover:underline block mb-2">
        View Appointments
      </Link>
      <div className="flex-grow mt-4">
        <button
          onClick={logout}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >

          Sign Out
        </button>
        {/* <ul className="list-disc ml-6 mb-4"> */}
          {/* {appointments.map((appointment) => ( */}
            {/* <li key={appointment._id}> */}
             
              {/* {appointment.pat}&nbsp;&nbsp;&nbsp; */}
              {/* {appointment.date}&nbsp;&nbsp;&nbsp; */}
              {/* {appointment.time}&nbsp;&nbsp;&nbsp; */}
              {/* {appointment.status}&nbsp;&nbsp;&nbsp; */}
              {/* <button type="button" class="btn btn-dark" onClick={updateStatus(appointment._id)}>Accept</button> */}

            {/* </li> */}
          {/* ))} */}
        {/* </ul> */}
      </div>
    </section>
  );
};

export default Home;
