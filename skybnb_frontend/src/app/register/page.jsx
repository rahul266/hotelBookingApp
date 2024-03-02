"use client"
import { useAuth } from "@/components/auth/AuthProvider"
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "@/api/api"

const RegisterPage = (props) => {
    const [name,setName]=useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword]=useState("")
    const { login } = useAuth();
    const router = useRouter();
    const onSubmit = async () => {
        if (!name || !password || !email || !confirmPassword) {
            alert("Please enter all the information");
        } else {
            if (password !== confirmPassword) {
                alert("password and confirm password should be same")
                return
            }
            try {
                const data = await api.registerStudent({
                    "name": name,
                    "email": email,
                    "password": password
                })
                console.log(data)
                if (data.data) {
                    login({
                        "email": email,
                        "password": password
                    })
                        .then((res) => {
                            setUser({ "email": email })
                            router.push("/")
                        })
                        .catch((e) => alert(e));
                }
            } catch (error) {
                alert(error)
            }
        }
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className=" customShadow h-fit flex flex-col gap-2 bg-white defaultBorder rounded-xl px-10 py-12">
                <p className="text-2xl font-bold bottom-3">Register Form</p>
                <label className="mt-4">Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-80 h-10 px-2 defaultBorder rounded"
                    placeholder="Name"
                />
                <label className="mt-4">Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-80 h-10 px-2 defaultBorder rounded"
                    placeholder="Email"
                />
                <label className="mt-4">Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-80 h-10 px-2 border defaultBorder rounded"
                    placeholder="password"
                    type="password"
                />
                <label className="mt-4">Confirm password</label>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-80 h-10 px-2 defaultBorder rounded"
                    placeholder="password"
                    type="password"
                />
                <button
                    onClick={onSubmit}
                    className="h-10 w-80 mt-8 bg-pantone font-medium rounded text-white hover:font-semibold hover:shadow-xl"
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default RegisterPage