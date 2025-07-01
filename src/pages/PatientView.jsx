import React from 'react';
import { getData } from '../utils/localStorage';
import { Navigate } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';

const PatientView = () => {
    const user = getData("loggedInUser");
    const patients = getData("patients");
    const incidents = getData("incidents");

    if (!user || user.role !== "Patient") {
        alert("You are not logged in as Patient");
        return <Navigate to="/login" />;
    }

    const myPatient = patients.find(p => p.id === user.patientId);
    const myIncidents = incidents.filter(i => i.patientId === user.patientId);
    const now = new Date();
    const upcoming = myIncidents.filter(i => new Date(i.appointmentDate) > now);
    const past = myIncidents.filter(i => new Date(i.appointmentDate) <= now);

    return (
        <>
            <PatientNavbar />

            <div className="min-h-screen bg-[#F7F1E1] py-10 px-4">
                <div className="max-w-5xl mx-auto bg-[#FFF9F3] rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-[#8C6449]">Welcome, {myPatient?.name}</h1>
                        <p className="text-[#6A4E3C] mt-2">Contact: <span className="font-medium">{myPatient?.contact}</span></p>
                        <p className="text-[#6A4E3C]">DOB: <span className="font-medium">{myPatient?.dob}</span></p>
                    </div>

                    {/* Upcoming Appointments */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-[#4E382A] border-b border-[#D4C3AE] pb-2 mb-6">
                            Upcoming Appointments
                        </h2>
                        {upcoming.length === 0 ? (
                            <p className="text-[#7D6755]">You have no upcoming appointments.</p>
                        ) : (
                            upcoming.map(incident => (
                                <div key={incident.id} className="border border-[#EADBC8] rounded p-4 mb-4 bg-[#FFF9F3] shadow">
                                    <h3 className="text-lg font-medium text-[#6A4E3C]">{incident.title}</h3>
                                    <p className="text-sm text-[#7D6755]">Date: {new Date(incident.appointmentDate).toLocaleString()}</p>
                                    {incident.nextDate && (
                                        <p className="text-sm text-[#A67B5B]">Next visit: {new Date(incident.nextDate).toLocaleDateString()}</p>
                                    )}
                                    <p className="text-sm text-[#4E382A]">Comments: {incident.comments}</p>
                                </div>
                            ))
                        )}
                    </section>

                    {/* Treatment History */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#4E382A] border-b border-[#D4C3AE] pb-2 mb-6">
                            Treatment History
                        </h2>

                        {myIncidents.length === 0 ? (
                            <p className="text-[#7D6755] text-center">No appointments found.</p>
                        ) : (
                            <div className="space-y-6">
                                {myIncidents.map(incident => (
                                    <div
                                        key={incident.id}
                                        className="bg-[#FDF7EE] border border-[#EADBC8] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className='flex justify-between items-center'>
                                            <h3 className="text-xl font-semibold text-[#6A4E3C]">{incident.title}</h3>
                                            <div
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                                                    ${incident.status === "Completed"
                                                        ? "bg-green-100 text-green-800"
                                                        : incident.status === "Upcoming"
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {incident.status}
                                            </div>
                                        </div>

                                        <p className="text-sm text-[#7D6755] mb-2">
                                            Appointment: <span className="font-medium">{new Date(incident.appointmentDate).toLocaleString()}</span>
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#4E382A]">
                                            <p className="text-sm"><span className="font-medium">Comments:</span> {incident.comments}</p>
                                            <p className="text-sm"><span className="font-medium">Cost:</span> ₹{incident.cost}</p>
                                        </div>

                                        {incident.files?.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-sm text-[#6A4E3C] font-medium mb-1">📁 Attached Files:</p>
                                                <ul className="list-disc list-inside text-sm text-[#8C6449]">
                                                    {incident.files.map((file, idx) => (
                                                        <li key={idx}>
                                                            <a
                                                                href={file.url}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="underline hover:text-[#4E382A]"
                                                            >
                                                                {file.url.startsWith("data:image") ? (
                                                                    <img src={file.url} alt={file.name} className="w-20 h-auto mt-2 rounded shadow" />
                                                                ) : file.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default PatientView;
