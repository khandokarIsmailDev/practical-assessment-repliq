"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]:value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    const { firstName, lastName, email, mobile, password } = formData;
    if (!firstName || !lastName || !email || !mobile || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Minimum 3 characters validation
    if (firstName.length < 3 || lastName.length < 3 || password.length < 3) {
      toast.error("First name, last name, and password must have at least 3 characters.");
      return;
    }

    // Phone number validation (at least 9 characters)
    if (mobile.length < 9) {
      toast.error("Phone number must have at least 9 characters.");
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Show loading toast only if validation passes
    const loadingToastId = toast.loading("Loading...");

    try {
        const response = await axios.post("/api/user/registration", JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        if (data.status === "success") {
            //empty the form
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              mobile: "",
              password: "",
            });

            toast.update(loadingToastId, { render: "Registration successful", type: "success", isLoading: false, autoClose: 3000 });
        } else if (data.error === "User already exists") {
            toast.update(loadingToastId, { render: "User already exists", type: "error", isLoading: false, autoClose: 3000 });
        } else {
            toast.update(loadingToastId, { render: "Registration failed", type: "error", isLoading: false, autoClose: 3000 });
        }
    } catch (err) {
        toast.error("Error registering user: " + err.message);
    }

    
  };

  console.log("here is the form data", JSON.stringify(formData));

  return (
    <div className="pt-28">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {/* first name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  onChange={(e) => handleChange(e)}
                  value={formData.firstName}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm pl-2"
                />
              </div>
            </div>

            {/* last name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  onChange={(e) => handleChange(e)}
                  value={formData.lastName}
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* email */}
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

            {/* phone number */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="mobile"
                  name="mobile"
                  type="number"
                  autoComplete="mobile"
                  onChange={(e) => handleChange(e)}
                  value={formData.mobile}
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => handleChange(e)}
                  value={formData.password}
                  required
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#895317] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#895417a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#895417a8]"
                onClick={(e) => handleSubmit(e)}
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              href="/login"
              className="font-semibold text-[#895317] hover:text-[#895417a8]"
              
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
