import React from "react";
import { getData } from "../utils/localStorage";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
    const patients = getData("patients") || [];
    const incidents = getData("incidents") || [];

    const nextAppointments = [...incidents]
        .filter(i => new Date(i.appointmentDate) > new Date())
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .slice(0, 10);

    const totalRevenue = incidents.reduce((acc, i) => acc + (i.cost || 0), 0);
    const completed = incidents.filter(i => i.status === "Completed").length;
    const pending = incidents.length - completed;

    const topPatients = patients
        .map(p => ({
            ...p,
            visitCount: incidents.filter(i => i.patientId === p.id).length,
        }))
        .sort((a, b) => b.visitCount - a.visitCount)
        .slice(0, 3);

    return (
        <>
            <AdminNavbar />
            <div className="bg-[#F7F1E1] min-h-screen p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    <h1 className="text-3xl font-bold text-[#8C6449] mb-4">Admin Dashboard</h1>

                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#FFF9F3] p-5 rounded-xl shadow text-[#6A4E3C]">
                            <h2 className="font-semibold">Total Revenue</h2>
                            <p className="text-2xl font-bold mt-1">${totalRevenue}</p>
                        </div>
                        <div className="bg-[#FFF9F3] p-5 rounded-xl shadow text-[#6A4E3C]">
                            <h2 className="font-semibold">Completed Treatments</h2>
                            <p className="text-2xl font-bold mt-1">{completed}</p>
                        </div>
                        <div className="bg-[#FFF9F3] p-5 rounded-xl shadow text-[#6A4E3C]">
                            <h2 className="font-semibold">Pending Treatments</h2>
                            <p className="text-2xl font-bold mt-1">{pending}</p>
                        </div>
                        <div className="bg-[#FFF9F3] p-5 rounded-xl shadow text-[#6A4E3C]">
                            <h2 className="font-semibold">Total Patients</h2>
                            <p className="text-2xl font-bold mt-1">{patients.length}</p>
                        </div>
                    </div>

                    {/* Top Patients */}
                    <div className="bg-[#FFF9F3] p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold text-[#4E382A] mb-4">Top Patients</h2>
                        <ul className="list-disc list-inside text-[#6A4E3C]">
                            {topPatients.map(p => (
                                <li key={p.id}>
                                    {p.name} — {p.visitCount} visits
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Next Appointments */}
                    <div className="bg-[#FFF9F3] p-6 rounded-xl shadow">
                        <h2 className="text-xl font-semibold text-[#4E382A] mb-4">Next 10 Appointments</h2>
                        {nextAppointments.length > 0 ? (
                            <ul className="space-y-2 text-[#6A4E3C] text-sm">
                                {nextAppointments.map(a => (
                                    <li key={a.id}>
                                        {a.title} — {new Date(a.appointmentDate).toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-[#A67B5B] italic">No upcoming appointments scheduled.</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
