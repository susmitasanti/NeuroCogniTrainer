import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import Task from './Task';

const Tasks = (props) => {
  const { username } = props;
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(async () => {
    const response = await axios.get(`/api/patients/getTasks?username=${username}`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    });
    console.log(response);
    console.log(response.data)
    setTasks(response.data)
  }, [])
  return (
    // <div>
    //   {
    //     tasks.map((task) => {
    //         return <Task task={task}/>
    //     })
    //   }
    // </div>
    <div className="space-y-4">
  {tasks.map((task, index) => (
    <Task key={index} task={task} />
  ))}
</div>


  )
}

export default Tasks