"use client";
import axios from "axios";
import Link from "next/link";
import React,{useEffect, useState} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = e =>{
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async e =>{
        e.preventDefault();

        if(!formData.email || !formData.password){
            toast.error("Please fill all the fields");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(formData.email)){
            toast.error("Please enter a valid email address");
            return;
        }

        const loadingToastId = toast.loading("Loading...");

        try{
            const response = await axios.post("/api/user/login", JSON.stringify(formData), {
                headers:{
                    "Content-Type": "application/json"
                }
            });

            if(response.status === 200){
                toast.update(loadingToastId, { render: "Login successful", type: "success", isLoading: false, autoClose: 3000 });
                router.push("/");
            }
        }catch(err){
            toast.update(loadingToastId, { render: "Invalid email or password", type: "error", isLoading: false, autoClose: 3000 });
        }

    }

    console.log(formData);

    useEffect(()=>{
      //redirect homepage
      const token = Cookies.get("token");
      if(token){
        router.push("/")
      }
    },[router])

  return (
    <div className="pt-28">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => handleChange(e)}
                  value={formData.email}
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-[#895317] hover:text-[#895417a8]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                  value={formData.password}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#895317] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#895417a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#895417a8]"
                onClick={e=>handleSubmit(e)}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              href="/register"
              className="font-semibold text-[#895317] hover:text-[#895417a8]"
              
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
