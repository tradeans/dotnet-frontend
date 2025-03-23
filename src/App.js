import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [singlePatient, setSinglePatient] = useState(null);
  const [singleDoctor, setSingleDoctor] = useState(null);
  const [singleAppointment, setSingleAppointment] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState('patients');  // Default selected table

  // Function to fetch all data from a table
  const fetchData = () => {
    setLoading(true);
    let url = '';

    if (selectedTable === 'patients') {
      url = 'http://localhost:5220/api/patients';
    } else if (selectedTable === 'doctors') {
      url = 'http://localhost:5220/api/doctors';
    } else if (selectedTable === 'appointments') {
      url = 'http://localhost:5220/api/appointments';
    }

    axios.get(url)
      .then(response => {
        if (selectedTable === 'patients') {
          setPatients(response.data);
        } else if (selectedTable === 'doctors') {
          setDoctors(response.data);
        } else if (selectedTable === 'appointments') {
          setAppointments(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the data');
        setLoading(false);
      });
  };

  // Function to fetch specific data based on ID
  const fetchDataById = () => {
    setLoading(true);
    let url = '';

    if (selectedTable === 'patients' && patientId) {
      url = `http://localhost:5220/api/patients/${patientId}`;
    } else if (selectedTable === 'doctors' && doctorId) {
      url = `http://localhost:5220/api/doctors/${doctorId}`;
    } else if (selectedTable === 'appointments' && appointmentId) {
      url = `http://localhost:5220/api/appointments/${appointmentId}`;
    }

    axios.get(url)
      .then(response => {
        if (selectedTable === 'patients') {
          setSinglePatient(response.data);
        } else if (selectedTable === 'doctors') {
          setSingleDoctor(response.data);
        } else if (selectedTable === 'appointments') {
          setSingleAppointment(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setError('There was an error fetching the data');
        setLoading(false);
      });
  };

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleDoctorIdChange = (e) => {
    setDoctorId(e.target.value);
  };

  const handleAppointmentIdChange = (e) => {
    setAppointmentId(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Dashboard</h1>

      {/* Dropdown for selecting the table */}
      <select value={selectedTable} onChange={handleTableChange}>
        <option value="patients">Patients</option>
        <option value="doctors">Doctors</option>
        <option value="appointments">Appointments</option>
      </select>

      {/* Fetch all data button */}
      <button onClick={fetchData}>Fetch All {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}</button>

      {/* Display data based on selected table */}
      {selectedTable === 'patients' && patients.length > 0 && (
        <div>
          <h2>All Patients</h2>
          <ul>
            {patients.map((patient) => (
              <li key={patient.PatientId}>
                <div>Name: {patient.firstName} {patient.lastName}</div>
                <div>Date of Birth: {patient.dateOfBirth}</div>
                <div>Contact: {patient.contactNumber}</div>
                <div>Address: {patient.address}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTable === 'doctors' && doctors.length > 0 && (
        <div>
          <h2>All Doctors</h2>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.DoctorId}>
                <div>Name: {doctor.firstName} {doctor.lastName}</div>
                <div>Specialization: {doctor.specialty}</div>
                <div>Contact Number: {doctor.contactNumber}</div>
                <div>Email: {doctor.email}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTable === 'appointments' && appointments.length > 0 && (
        <div>
          <h2>All Appointments</h2>
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.AppointmentId}>
                <div>Patient ID: {appointment.patientId}</div>
                <div>Doctor ID: {appointment.doctorId}</div>
                <div>Date: {appointment.appointmentDate}</div>  
                <div>Time: {appointment.appointmentTime}</div>
                <div>Status: {appointment.status}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fetch specific data based on ID */}
      <div>
        <h2>Fetch Specific {selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)}</h2>
        {selectedTable === 'patients' && (
          <>
            <input
              type="number"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={handlePatientIdChange}
            />
          </>
        )}
        {selectedTable === 'doctors' && (
          <>
            <input
              type="number"
              placeholder="Enter Doctor ID"
              value={doctorId}
              onChange={handleDoctorIdChange}
            />
          </>
        )}
        {selectedTable === 'appointments' && (
          <>
            <input
              type="number"
              placeholder="Enter Appointment ID"
              value={appointmentId}
              onChange={handleAppointmentIdChange}
            />
          </>
        )}
        <button onClick={fetchDataById}>Fetch</button>
      </div>

      {/* Display specific data */}
      {selectedTable === 'patients' && singlePatient && (
        <div>
          <h3>Patient Details</h3>
          <p>Name: {singlePatient.firstName} {singlePatient.lastName}</p>
          <p>Date of Birth: {singlePatient.dateOfBirth}</p>
          <p>Contact: {singlePatient.contactNumber}</p>
          <p>Address: {singlePatient.address}</p>
        </div>
      )}

      {selectedTable === 'doctors' && singleDoctor && (
        <div>
          <h3>Doctor Details</h3>
          <p>Name: {singleDoctor.firstName} {singleDoctor.lastName}</p>
          <p>Specialization: {singleDoctor.specialty}</p>
          <p>Contact Number: {singleDoctor.contactNumber}</p>
          <p>Contact Number: {singleDoctor.email}</p>
        </div>
      )}

      {selectedTable === 'appointments' && singleAppointment && (
        <div>
          <h3>Appointment Details</h3>
          <p>Patient ID: {singleAppointment.patientId}</p>
          <p>Doctor ID: {singleAppointment.doctorId}</p>
          <p>Date: {singleAppointment.appointmentDate}</p>
          <p>Time: {singleAppointment.appointmentTime}</p>
          <p>Status: {singleAppointment.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;












