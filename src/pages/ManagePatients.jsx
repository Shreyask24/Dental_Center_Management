import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getData, setData } from "../utils/localStorage";
import PatientFormModal from "../components/PatientFormModal";

const ManagePatients = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const data = getData("patients") || [];
        setPatients(data);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this patient?")) {
            const updated = patients.filter((p) => p.id !== id);
            setPatients(updated);
            setData("patients", updated);
        }
    };

    const handleSave = (newPatient) => {
        let updated;
        if (newPatient.id) {
            updated = patients.map((p) => (p.id === newPatient.id ? newPatient : p));
        } else {
            newPatient.id = "p" + Date.now();
            updated = [...patients, newPatient];
        }

        setPatients(updated);
        setData("patients", updated);
        setShowModal(false);
    };

    return (
        <>
            <AdminNavbar />
            <div className="bg-[#F7F1E1] min-h-screen p-8">
                <div className="max-w-5xl mx-auto bg-[#FFF9F3] p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[#6A4E3C]">Manage Patients</h2>
                        <button
                            onClick={() => {
                                setSelectedPatient(null);
                                setShowModal(true);
                            }}
                            className="px-4 py-2 bg-[#A67B5B] text-white rounded hover:bg-[#8C6449]"
                        >
                            + Add Patient
                        </button>
                    </div>

                    {patients.length === 0 ? (
                        <p className="text-[#6A4E3C]">No patients added yet.</p>
                    ) : (
                        <table className="w-full text-left text-sm border">
                            <thead>
                                <tr className="bg-[#F0E7DA] text-[#4E382A]">
                                    <th className="p-3">Name</th>
                                    <th className="p-3">DOB</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Health Info</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient.id} className="border-b hover:bg-[#FCF7F1]">
                                        <td className="p-3">{patient.name}</td>
                                        <td className="p-3">{patient.dob}</td>
                                        <td className="p-3">{patient.contact}</td>
                                        <td className="p-3">{patient.healthInfo}</td>
                                        <td className="p-3 space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedPatient(patient);
                                                    setShowModal(true);
                                                }}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(patient.id)}
                                                className="text-sm text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {showModal && (
                <PatientFormModal
                    patient={selectedPatient}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default ManagePatients;
