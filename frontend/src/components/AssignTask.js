import React from 'react'
import AuthContext from '../context/AuthProvider';
import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom'




function AssignTask() {
    const { username } = useParams();

    const { auth } = useContext(AuthContext);
    const [task, setTask] = useState({ gameName: "", deadline: "", _id:"" })

    const onChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value })

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = `http://localhost:3001/api/doctors/assignTask`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.accessToken}`
            },
            body: JSON.stringify({ gameName: task.gameName, deadline: task.deadline, _id:task._id })

        });
        const json = await response.json();
        console.log(json)
        setTask({ gameName: "", deadline: "", _id: "" });


        // if (json.success) {
        //     localStorage.setItem('token', json.authtoken)
        //     props.showAlert("success", "Successfully Logged In!!")
        //     navigate("/")

        // }
        // else {
        //     props.showAlert("danger", "Please enter valid credentials.")
        // }

    }
  return (
    <>
    <form onSubmit={handleSubmit}>
    <input class="form-control" type="text" placeholder="Game Name" aria-label="default input example" name="gameName" value={task.gameName}  onChange={onChange} />
    <input class="form-control" type="text" placeholder="Deadline" aria-label="default input example" name="deadline" value={task.deadline} onChange={onChange}/>
    <input class="form-control" type="text" placeholder="PatientId" aria-label="default input example" name="_id" value={task._id} onChange={onChange}/>

    <button type="submit" className="btn btn-primary" >Submit</button>
    </form>

    </>
  )
}

export default AssignTask
