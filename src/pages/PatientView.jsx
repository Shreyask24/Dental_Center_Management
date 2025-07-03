import React from 'react';
import { Navigate } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';
import { getData } from '../utils/localStorage';

const PatientView = () => {
    const user = getData("loggedInUser");
    const patients = getData("patients");
    const incidents = getData("incidents");

    if (!user || user.role !== "Patient") {
        alert("Access denied. Please login as Patient.");
        return <Navigate to="/login" />;
    }

    const patient = patients.find(p => p.id === user.patientId);
    const incident = incidents.filter(i => i.patientId === user.patientId);
    const now = new Date();
    const upcoming = incident.filter(i => new Date(i.appointmentDate) > now);

    return (
        <>
            <PatientNavbar />

            <main className="min-h-screen bg-[#F7F1E1] py-10 px-4">
                <section className="max-w-5xl mx-auto bg-[#FFF9F3] rounded-2xl p-8">

                    <header className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-[#8C6449]">Welcome, {patient?.name}</h1>
                        <p className="text-[#6A4E3C] mt-2">Contact: <strong>{patient?.contact}</strong></p>
                        <p className="text-[#6A4E3C]">DOB: <strong>{patient?.dob}</strong></p>
                    </header>

                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold text-[#4E382A] border-b border-[#D4C3AE] pb-2 mb-4">
                            Upcoming Appointments
                        </h2>
                        {upcoming.length ? (
                            upcoming.map(item => (
                                <div key={item.id} className="border border-[#EADBC8] rounded p-4 mb-4 bg-[#FFF9F3]">
                                    <h3 className="text-lg font-medium text-[#6A4E3C]">{item.title}</h3>
                                    <p className="text-sm text-[#7D6755]">Date: {new Date(item.appointmentDate).toLocaleString()}</p>
                                    {item.nextDate && (
                                        <p className="text-sm text-[#A67B5B]">Next visit: {new Date(item.nextDate).toLocaleDateString()}</p>
                                    )}
                                    <p className="text-sm text-[#4E382A]">Comments: {item.comments}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-[#7D6755]">No upcoming appointments.</p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-[#4E382A] border-b border-[#D4C3AE] pb-2 mb-4">
                            Treatment History
                        </h2>

                        {incident.length ? (
                            <div className="space-y-6">
                                {incident.map(item => (
                                    <div
                                        key={item.id}
                                        className="bg-[#FDF7EE] border border-[#EADBC8] rounded-xl p-6"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-semibold text-[#6A4E3C]">{item.title}</h3>
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full
                        ${item.status === "Completed" ? "bg-green-100 text-green-800" :
                                                    item.status === "Upcoming" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-red-100 text-red-800"}`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-[#7D6755] mb-2">
                                            Appointment: <strong>{new Date(item.appointmentDate).toLocaleString()}</strong>
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#4E382A]">
                                            <p className="text-md"><strong>Description:</strong> {item.description}</p>
                                            <p className="text-sm"><strong>Comments:</strong> {item.comments}</p>
                                            <p className="text-sm"><strong>Cost:</strong> ${item.cost}</p>
                                        </div>

                                        {item.files?.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-sm font-medium text-[#6A4E3C] mb-1">📁 Attached Files:</p>
                                                <ul className="list-disc list-inside text-sm text-[#8C6449]">
                                                    {item.files.map((file, idx) => (
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
                        ) : (
                            <p className="text-[#7D6755] text-center">No appointments found.</p>
                        )}
                    </div>

                </section>
            </main>
        </>
    );
};

export default PatientView;
