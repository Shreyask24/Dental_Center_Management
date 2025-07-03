import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getData } from "../utils/localStorage";
import AdminNavbar from "../components/AdminNavbar";

const Calendar = () => {
    const incidents = getData("incidents") || [];

    const [selectedDate, setSelectedDate] = useState(new Date());

    const appointmentsForDate = incidents.filter((incident) => {
        const appointment = new Date(incident.appointmentDate);
        return appointment.toDateString() === selectedDate.toDateString();
    });

    return (
        <>
            <AdminNavbar />
            <div className="min-h-screen bg-[#F7F1E1] p-8">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-8">
                    <h1 className="text-2xl font-bold text-[#8C6449]">Calendar View</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-[#FFF9F3] p-4 rounded-xl">
                            <ReactCalendar
                                onChange={setSelectedDate}
                                value={selectedDate}
                                className="!border-none w-full"
                                tileClassName={({ date, view }) => {
                                    if (view === "month") {
                                        const hasAppointment = incidents.some(
                                            (i) =>
                                                new Date(i.appointmentDate).toDateString() === date.toDateString()
                                        );

                                        return hasAppointment
                                            ? "highlight-appointment-day"
                                            : null;
                                    }
                                }}
                            />


                        </div>

                        <div className="bg-[#FFF9F3] p-4 rounded-xl">
                            <h2 className="text-xl font-semibold text-[#4E382A] mb-3">
                                Appointments on {selectedDate.toDateString()}
                            </h2>

                            {appointmentsForDate.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">
                                    No appointments found.
                                </p>
                            ) : (
                                <ul className="space-y-3 text-[#6A4E3C] text-sm">
                                    {appointmentsForDate.map((incident) => (
                                        <li
                                            key={incident.id}
                                            className="bg-white p-3 rounded shadow border border-[#e0cfc0]"
                                        >
                                            <div className="font-medium">{incident.title}</div>
                                            <div>
                                                {new Date(incident.appointmentDate).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}{" "}
                                                — {incident.status}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                {incident.description}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
