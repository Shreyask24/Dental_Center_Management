import React, { useState, useEffect } from "react";

const PatientFormModal = ({ patient, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: "",
        dob: "",
        contact: "",
        healthInfo: "",
    });

    useEffect(() => {
        if (patient) setForm(patient);
    }, [patient]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...form, id: patient?.id || undefined });
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white relative rounded-xl p-6 w-full max-w-md shadow-lg">
                {/* Cross Icon */}
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
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="healthInfo"
                        value={form.healthInfo}
                        onChange={handleChange}
                        placeholder="Health Info"
                        className="w-full border p-2 rounded"
                    />

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="text-sm text-gray-500">
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
