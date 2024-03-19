import React, { useContext, useState, useEffect } from 'react'
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider'
import LinkTask from './LinkTask';
import { useNavigate } from 'react-router-dom/dist';

const Patient = () => {
  const navigate=useNavigate()
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`/api/patients/getTasks?username=${auth.user}`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
    console.log(response);
    console.log(response.data);
    setTasks(response.data);
  }, []);

  const bookAppointment = () => {
    navigate('/BookAppointment');
};

  return (
    // <ul>
    // {
    // tasks.map(task => {
    //   return <li><LinkTask task={task}/></li>
    // })
    // }
    // </ul>
    <>
                <button type="button" class="btn btn-dark" onClick={bookAppointment}>Book Appointment</button>&nbsp;

      <ul className="list-disc list-inside">
        {tasks.map((task, index) => (
          <li key={index} className="mb-2">
            <LinkTask task={task} />
          </li>
        ))}
      </ul>
    </>


  )
}

export default Patient