"use client"
import { useAuth } from "@/components/auth/AuthProvider"
import { useRouter } from "next/navigation";
import { useState } from "react";

const  LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isAuthenticated,setUser } = useAuth()
    const router = useRouter();
    if (isAuthenticated) {
        router.push('/')
    }
    const onSubmit = () => {
        if (!email || !password) {
            alert("Please enter information");
        } else {
            login({
                "email": email,
                "password": password
            })
                .then((res) => {
                    console.log(res);
                    setUser({"email":email})
                    //router.push("/")
                })
                .catch((e) => alert(e));
        }
    };
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="h-fit flex flex-col gap-2 bg-white defaultBorder rounded-xl px-10 py-12">
                <p className="text-2xl font-bold bottom-3">Login Form</p>
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
                    className="w-80 h-10 px-2 defaultBorder rounded"
                    placeholder="password"
                    type="password"
                />
                <button
                    onClick={onSubmit}
                    className="h-10 w-80 mt-8 bg-pantone font-medium rounded text-white hover:font-semibold hover:shadow-xl"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginPage