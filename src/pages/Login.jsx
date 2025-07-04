import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = login(email, password);
        if (res.success) navigate("/");
        else alert(res.message);
        console.log(res)
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#F7F1E1]">
            <div className="bg-[#FFF9F3] rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-[#8C6449] text-center mb-6">Authentication</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[#6A4E3C] mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-[#D9C8B2] rounded-lg focus:ring-2 focus:ring-[#A67B5B] outline-none bg-[#FDF7EE] text-[#4E382A]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[#6A4E3C] mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-[#D9C8B2] rounded-lg focus:ring-2 focus:ring-[#A67B5B] outline-none bg-[#FDF7EE] text-[#4E382A]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#A67B5B] hover:bg-[#8C6449] text-white font-medium rounded-lg transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;
