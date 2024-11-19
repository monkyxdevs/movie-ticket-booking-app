import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [username,setUsername] = useState();
    const [showEror,setShowError] = useState(false);
    const navigate = useNavigate();
    const handleSignin = async() => {
        if (!email || !password ||!username) {
            setShowError(true)
        }
        axios.post("http://localhost:3000/api/m1/user/signup",{
            email,
            username,
            password
        }).then((res)=>{
            if(res){
                console.log(res.data);
                toast.success("Sigup Successfull!");
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
                        <h1 className="text-3xl font-semibold">Sign Up</h1>
                        <p className="text-sm">Sign up to create an account</p>
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
                            <label className="form-label">Username</label>
                            <input placeholder="Type here" type="email" className="input max-w-full" onChange={(e:any)=>setUsername(e.target.value)}/>
                            <label className="form-label">
                                <span className="form-label-alt">Please enter a valid useranme.</span>
                            </label>
                        </div>
                        <div className="form-field">
                            <label className="form-label">Password</label>
                            <div className="form-control">
                                <input placeholder="Type here" type="password" className="input max-w-full" onChange={(e:any)=>setPassword(e.target.value)}/>
                            </div>
                        </div>
                        {showEror && (
                            <span className="form-label-alt text-red-600  text-center">All fields are required.</span>
                        )}
                        <div className="form-field pt-1">
                            <div className="form-control justify-between">
                                <button type="button" className="btn btn-primary w-full" onClick={handleSignin}>Sign up</button>
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="form-control justify-center">
                                <a href="/signin" className="link link-underline-hover link-primary text-sm">Already have an account? Sign in.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}