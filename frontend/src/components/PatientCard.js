import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import Tasks from './Tasks';
import { useNavigate } from 'react-router-dom';

const PatientCard = () => {
    const { username } = useParams();
    const { auth } = useContext(AuthContext);
    const [patient, setPatient] = useState({});
    const navigate = useNavigate()

  useEffect(async () => {
    const response = await axios.get(
      `/api/doctors/getPatientInfo?username=${username}`,
      {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      }
    );
    // console.log(response);
    // console.log(response.data);
    setPatient(response.data);
  }, []);


    const goToAssignForm = () => {
        navigate('/assignTask');
    };

    const viewReport = () => {
        const reportPageUrl = 'http://localhost:3000/report_try_1.html';
    window.open(reportPageUrl, '_blank');
    };

    return (
        <>
            <button type="button" class="btn btn-dark" onClick={goToAssignForm}>Add a task</button>&nbsp;
            <button type="button" class="btn btn-dark" onClick={viewReport}>View Report</button>

      <div className="text-xl font-bold">{patient.username}</div>
      <Tasks username={username} />
        </>
    )
}

export default PatientCard;
