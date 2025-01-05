"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginCredentials } from "@/types";
import { login } from "@/services";
import { useUser } from "@/providers";

export default function LoginPage() {
    const { setUser } = useUser();
    const [loginForm, setLoginForm] = useState<LoginCredentials>({
        email: "",
        password: ""
    });

    const handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    }

    const { replace } = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { statusCode, data } = await login(loginForm);
            if (statusCode === 200) {
                setUser(data);
                replace('/direct/inbox');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto w-full max-w-[20rem] bg-slate-300 p-4 gap-4">
                <div className="flex flex-col">
                    <label>Email</label>
                    <input type="email" name="email" className="p-1" value={loginForm.email} onChange={handleInputFieldChange} />
                </div>
                <div className="flex flex-col">
                    <label>Password</label>
                    <input type="password" name="password" className="p-1" value={loginForm.password} onChange={handleInputFieldChange} />
                </div>
                <button type="submit" className="p-2 w-full bg-red-400 rounded-md active:bg-red-500 hover:bg-red-600">Login</button>
            </form>
        </div>
    )
}