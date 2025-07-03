import React, { useState, useEffect } from "react";

const ManageAppointmentForm = ({ incident, patientId, onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [comments, setComments] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [cost, setCost] = useState(0);
    const [treatment, setTreatment] = useState("");
    const [status, setStatus] = useState("Upcoming");
    const [nextDate, setNextDate] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (incident) {
            setTitle(incident.title || "");
            setDescription(incident.description || "");
            setComments(incident.comments || "");
            setAppointmentDate(incident.appointmentDate || "");
            setCost(incident.cost || "");
            setTreatment(incident.treatment || "");
            setStatus(incident.status || "Upcoming");
            setNextDate(incident.nextDate || "");
            setFiles(incident.files || []);
        }
    }, [incident]);

    const handleFiles = async (e) => {
        const selectedFiles = [...e.target.files];
        const uploaded = await Promise.all(
            selectedFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve({ name: file.name, url: reader.result });
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })
        );
        setFiles([...files, ...uploaded]);
    };

    const removeFile = (index) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            comments,
            appointmentDate,
            cost,
            treatment,
            status,
            nextDate,
            files,
            patientId,
        };

        onSave(payload);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative h-[90vh] overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4 text-[#8C6449]">
                    {incident ? "Edit Appointment" : "New Appointment"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full border p-2 rounded"
                            placeholder="e.g., Tooth Cleaning"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Description</label>
                        <textarea
                            rows={2}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full border p-2 rounded resize-none"
                            placeholder="Describe the issue"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Appointment Date & Time</label>
                        <input
                            type="datetime-local"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                            required
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Comments</label>
                        <input
                            type="text"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="Optional"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm mb-1">Cost ($)</label>
                            <input
                                type="number"
                                value={cost}
                                onChange={(e) => setCost(Number(e.target.value))}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border p-2 rounded"
                            >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Treatment</label>
                        <input
                            type="text"
                            value={treatment}
                            onChange={(e) => setTreatment(e.target.value)}
                            className="w-full border p-2 rounded"
                            placeholder="e.g., Root Canal"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Next Visit Date</label>
                        <input
                            type="date"
                            value={nextDate}
                            onChange={(e) => setNextDate(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Attach Files (Images or PDFs)</label>
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            multiple
                            onChange={handleFiles}
                            className="w-full border p-2 rounded"
                        />

                        {files.length > 0 && (
                            <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
                                {files.map((file, idx) => (
                                    <li key={idx} className="flex justify-between items-center">
                                        <span>{file.name || `File ${idx + 1}`}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="text-red-500 text-xs ml-2"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#A67B5B] text-white py-2 rounded hover:bg-[#8C6449]"
                    >
                        {incident ? "Update" : "Add"} Appointment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageAppointmentForm;
