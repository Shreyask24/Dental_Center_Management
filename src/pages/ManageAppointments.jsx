import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getData, setData } from "../utils/localStorage";
import ManageAppointmentForm from "../components/ManageAppointmentForm";

const ManageAppointments = () => {
    const patients = getData("patients") || [];
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [incidents, setIncidents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editIncident, setEditIncident] = useState(null);

    useEffect(() => {
        const stored = getData("incidents") || [];
        setIncidents(stored);
    }, []);

    const handleSave = (data) => {
        let updated;
        if (data.id) {
            updated = incidents.map((i) => (i.id === data.id ? data : i));
        } else {
            data.id = "i" + Date.now();
            updated = [...incidents, data];
        }

        setIncidents(updated);
        setData("incidents", updated);
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete appointment?")) {
            const updated = incidents.filter((i) => i.id !== id);
            setIncidents(updated);
            setData("incidents", updated);
        }
    };

    const filtered = selectedPatientId
        ? incidents.filter((i) => i.patientId === selectedPatientId)
        : [];

    return (
        <>
            <AdminNavbar />

            <div className="min-h-screen bg-[#F7F1E1] p-8">
                <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-[#6A4E3C] mb-1">
                                Select Patient
                            </label>
                            <select
                                className="border p-2 rounded w-full md:w-64"
                                value={selectedPatientId}
                                onChange={(e) => setSelectedPatientId(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                {patients.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedPatientId && (
                            <button
                                onClick={() => {
                                    setEditIncident(null);
                                    setShowModal(true);
                                }}
                                className="px-4 py-2 bg-[#A67B5B] text-white rounded hover:bg-[#8C6449]"
                            >
                                + Add Appointment
                            </button>
                        )}
                    </div>

                    {!selectedPatientId ? (
                        <p className="text-[#6A4E3C]">Select a patient to view incidents.</p>
                    ) : filtered.length === 0 ? (
                        <p className="text-[#6A4E3C] italic">No appointments found.</p>
                    ) : (
                        <div className="space-y-4">
                            {filtered.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#FFF9F3] p-4 rounded-xl border shadow-md"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-semibold text-lg text-[#6A4E3C]">
                                            {item.title}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full font-medium ${item.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : item.status === "Cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-orange-100 text-orange-700"
                                                }`}
                                        >
                                            {item.status || "Upcoming"}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-600">
                                        {new Date(item.appointmentDate).toLocaleString()}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>

                                    <div className="mt-3 flex gap-4 text-sm">
                                        <button
                                            onClick={() => {
                                                setEditIncident(item);
                                                setShowModal(true);
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <ManageAppointmentForm
                    incident={editIncident}
                    patientId={selectedPatientId}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default ManageAppointments;
