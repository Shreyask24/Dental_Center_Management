import React, { useState, useEffect } from "react";

const PatientFormModal = ({ patient, onClose, onSave }) => {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [contact, setContact] = useState("");
    const [healthInfo, setHealthInfo] = useState("");

    useEffect(() => {
        if (patient) {
            setName(patient.name || "");
            setDob(patient.dob || "");
            setContact(patient.contact || "");
            setHealthInfo(patient.healthInfo || "");
        }
    }, [patient]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            id: patient?.id || undefined,
            name,
            dob,
            contact,
            healthInfo,
        };
        onSave(payload);
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white relative rounded-xl p-6 w-full max-w-md shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl"
                    aria-label="Close"
                >
                    &times;
                </button>

                <h3 className="text-xl font-bold mb-4 text-[#8C6449]">
                    {patient ? "Edit Patient" : "Add Patient"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Contact Number"
                        required
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        value={healthInfo}
                        onChange={(e) => setHealthInfo(e.target.value)}
                        placeholder="Health Info (optional)"
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#A67B5B] text-white px-4 py-2 rounded hover:bg-[#8C6449]"
                        >
                            {patient ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PatientFormModal;
