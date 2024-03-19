import React, { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AuthContext from '../context/AuthProvider';

function Appointment() {
  const { auth } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [availSlots, setAvailSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDateChange = (newDate) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);
    setDate(`${year}-${month}-${day}`);
  };

  const getAppointments = async () => {
    const url = "http://localhost:3001/api/patients/getPatientAppointments";
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
    });
    const json = await response.json();
    setAppointments(json);
    console.log(json);
  };

  const getAvailableSlots = async (clickedDate) => {
    const url = "http://localhost:3001/api/patients/getAvailableSlots";
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({ date: clickedDate })
    });
    const json = await response.json();
    setAvailSlots(json);
    console.log(json);
  };

  const appointment = async (event) => {
    event.preventDefault();
    const url = `http://localhost:3001/api/patients/appointment`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify({ date: `${date}`, time: selectedSlot })
    });
    const json = await response.json();
    console.log(json);
    getAppointments()
  };

  const deleteAppoint = async (appointmentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmed) {
      const url = `http://localhost:3001/api/patients/deleteAppointment?appointmentId=${appointmentId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`
        },
      });
      if (response.status === 200) {
        console.log('Appointment deleted successfully');
        getAppointments(); // Refresh the list of appointments after deletion
      } else {
        console.error('Error deleting appointment');
      }
    }
  };

  const isDateDisabled = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date < currentDate;
  };

  useEffect(() => {
    getAvailableSlots(date);
  }, [date]);

  useEffect(() => {
    if (availSlots.length > 0) {
      setSelectedSlot(availSlots[0]);
    }
  }, [availSlots]);

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <h2>Select an appointment date:</h2>
      <Calendar
        onChange={handleDateChange}
        onClickDay={(value) => getAvailableSlots(value)}
        value={date}
        tileDisabled={({ date }) => isDateDisabled(date)}
      />
      <input
        className="form-control"
        type="text"
        placeholder={date}
        aria-label="Disabled input example"
        style={{ width: '150px' }}
        disabled
      />

      <label>Available Slots</label>
      <select onChange={(e) => setSelectedSlot(e.target.value)} value={selectedSlot}>
        {availSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>

      {<button type="button" className="btn btn-primary" onClick={appointment}>
        Book
      </button>}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            {appointments.map((appointment) => (
              <tr key={appointment.date}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status}</td>
                {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => { deleteAppoint(appointment._id) }}
                  >
                    Delete
                  </button>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default Appointment;