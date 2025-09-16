import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
export default function Register() {
  const [serverError, setServerError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters, include uppercase, lowercase, number and special character"),
    rePassword: z.string(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format" }).refine((date) => {
      const today = new Date();
      const birthDate = new Date(date);
      today.setHours(0, 0, 0, 0);
      return birthDate < today;
    }, { message: "Invalid date of birth" }),
    gender: z.enum(["male", "female", "other"])
  }).refine((object) => object.password === object.rePassword, {
    error: "Passwords must match",
    path: ["rePassword"]
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male"
    },
    resolver: zodResolver(schema)
  })
  let { register, handleSubmit, formState } = form;
  function handleRegister(value) {
    setisLoading(true);
    // call API to register user
    axios.post(`https://linked-posts.routemisr.com/users/signup`, value)
      .then((res) => {
        if (res.data.message === "success") {
          navigate("/login");
          setisLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data && err.response.data.message) {
          const serverMessage = err.response.data.message;
          setServerError(serverMessage);

        } else {
          setServerError(err.response.data.error);
          setisLoading(false);
        }
      });
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Logo/Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-6">
              <i className="fa-solid fa-users text-white text-3xl"></i>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Social App
            </h1>
            <p className="text-slate-400 text-lg">Join our community! Create your account today</p>
          </div>

          {/* Register Form */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-slate-400">Fill in your details to get started</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-user text-slate-400"></i>
                  </div>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {formState.errors.name && formState.touchedFields.name && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-circle"></i>
                    {formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-envelope text-slate-400"></i>
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {formState.errors.email && formState.touchedFields.email && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-circle"></i>
                    {formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-lock text-slate-400"></i>
                    </div>
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Create password"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  {formState.errors.password && formState.touchedFields.password && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-exclamation-circle"></i>
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fa-solid fa-lock text-slate-400"></i>
                    </div>
                    <input
                      type="password"
                      {...register("rePassword")}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  {formState.errors.rePassword && formState.touchedFields.rePassword && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <i className="fa-solid fa-exclamation-circle"></i>
                      {formState.errors.rePassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-calendar text-slate-400"></i>
                  </div>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white 
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
                {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-circle"></i>
                    {formState.errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Gender Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 border border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700/50 transition-all duration-200">
                    <input type="radio" {...register("gender")} value="male" defaultChecked className="text-blue-500" />
                    <i className="fa-solid fa-mars text-blue-400"></i>
                    <span className="text-slate-300 text-sm">Male</span>
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 border border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700/50 transition-all duration-200">
                    <input type="radio" {...register("gender")} value="female" className="text-pink-500" />
                    <i className="fa-solid fa-venus text-pink-400"></i>
                    <span className="text-slate-300 text-sm">Female</span>
                  </label>
                  
                </div>
                {formState.errors.gender && formState.touchedFields.gender && (
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-circle"></i>
                    {formState.errors.gender.message}
                  </p>
                )}
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    {serverError}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer py-3 bg-blue-600 text-white rounded-xl font-semibold text-lg 
                  shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-user-plus"></i>
                    Create Account
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-slate-700/50">
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
