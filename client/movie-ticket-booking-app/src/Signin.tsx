import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Signin = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState();
    const navigate = useNavigate();
    const [showEror,setShowError] = useState(false);
    const handleSignin = async() => {
        if (!email||!password) {
            setShowError(true);
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format!");
        }
        axios.post("http://localhost:3000/api/m1/user/signin",{
            email,
            password
        }).then((res)=>{
            if(res){
                console.log(res.data);
                toast.success("Login Successfull!");
                const token = res.data.token;
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                localStorage.setItem("userid",userId);
                localStorage.setItem("Token",res.data.token);
                navigate("/home");
            }
        }).catch((err)=>{console.error("Someting went wrong!",err);
        })
    }
    return(
        <div className="flex justify-center items-center h-screen">
            <form className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-border bg-backgroundSecondary p-4 sm:p-20">          
                <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-semibold">Sign In</h1>
                        <p className="text-sm">Sign in to access your account</p>
                    </div>
                    <div className="form-group">
                        <div className="form-field">
                            <label className="form-label">Email address</label>
                            <input placeholder="Type here" type="email" className="input max-w-full" onChange={(e:any)=>setEmail(e.target.value)}/>
                            <label className="form-label">
                                <span className="form-label-alt">Please enter a valid email.</span>
                            </label>
                        </div>
                        <div className="form-field">
                            <label className="form-label">Password</label>
                            <div className="form-control">
                                <input placeholder="Type here" type="password" className="input max-w-full" onChange={(e:any)=>setPassword(e.target.value)}/>
                            </div>
                    </div>
                    <div className="form-field">
                        <div className="form-control justify-between">
                            <div className="flex gap-2">
                                <input type="checkbox" className="checkbox" />
                                <a href="#">Remember me</a>
                            </div>
                            <label className="form-label">
                                <a className="link link-underline-hover link-primary text-sm">Forgot your password?</a>
                            </label>
                        </div>
                    </div>
                    {showEror && (
                        <span className="form-label-alt text-red-600 mt-2 text-center">All fields are required.</span>
                    )}
                    <div className="form-field pt-5">
                        <div className="form-control justify-between">
                            <button type="button" className="btn btn-primary w-full" onClick={handleSignin}>Sign in</button>
                        </div>
                    </div>
                    <div className="form-field">
                        <div className="form-control justify-center">
                            <a href="/signup" className="link link-underline-hover link-primary text-sm">Don't have an account yet? Sign up.</a>
                        </div>
                    </div>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}