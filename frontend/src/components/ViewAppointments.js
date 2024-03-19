import React, { useEffect } from 'react'
import Calendar from 'react-calendar';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';


function ViewAppointments() {
    const { auth } = useContext(AuthContext);


    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);

    const handleDateChange = (newDate) => {
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`);
        setDate(`${year}-${month}-${day}`);
        getAppointments(`${year}-${month}-${day}`)
    };

    const getAppointments = async (clickedDate) => {
        const url = "http://localhost:3001/api/doctors/viewAppointments";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.accessToken}`
            },
            body: JSON.stringify({ date: clickedDate })
        });
        const json = await response.json();
        setAppointments(json)
        console.log(json);
    };

    const cancelAppoint = async (appointmentId) => {
        const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
        if (confirmed) {
            const url = `http://localhost:3001/api/doctors/updateAppointment?appointmentId=${appointmentId}&update=Cancelled`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.accessToken}`
                },
            });
            if (response.status === 200) {
                console.log('Appointment Cancelled successfully');
                getAppointments(date); // Refresh the list of appointments after deletion
            } else {
                console.error('Error rejecting appointment');
            }
        }
    };

    const completeAppoint = async (appointmentId) => {
        const confirmed = window.confirm("Are you sure?");
        if (confirmed) {
            const url = `http://localhost:3001/api/doctors/updateAppointment?appointmentId=${appointmentId}&update=Completed`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.accessToken}`
                },
            });
            if (response.status === 200) {
                console.log('Appointment Completed successfully');
                getAppointments(date); // Refresh the list of appointments after deletion
            } else {
                console.error('Error rejecting appointment');
            }
        }
    };
    useEffect(() => {
        handleDateChange(new Date())
    }, [])

    return (
        <div>
            <Calendar
                onChange={handleDateChange}
                value={date}

            />
            <div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Patient</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>

                    <tbody>

                        {appointments.map((appointment) => (
                            <tr key={appointment.time}>
                                <td>{appointment.pat}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => cancelAppoint(appointment._id)}
                                    >
                                        Cancel
                                    </button>
                                    &nbsp;&nbsp;
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => completeAppoint(appointment._id)}
                                    >
                                        Completed
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>            </div>





        </div>
    )
}

export default ViewAppointments


//onClickDay={(value) => getAppointments(value)}