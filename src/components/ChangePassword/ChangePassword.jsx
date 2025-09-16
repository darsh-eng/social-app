import axios from "axios";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });
  const { register, handleSubmit } = form;
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  function getChangePasword(value) {
    axios
      .patch(
        `https://linked-posts.routemisr.com/users/change-password`,
        value,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          toast.success("Password is changed successfully ✅");
          setIsOpen(false);
        }
      })
      .catch(() => {
        toast.error("❌ Sorry, password couldn't be changed. Try again.");
      });
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="group flex items-center gap-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
        focus:ring-4 focus:outline-none focus:ring-blue-400/50 font-semibold 
        rounded-2xl text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
        type="button"
      >
        <i className="fa-solid fa-key group-hover:rotate-12 transition-transform duration-300"></i>
        <span>Change Password</span>
        <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
      </button>

      {isOpen && createPortal((
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md mx-4 animate-slideIn" role="dialog" aria-modal="true">
            <div className="relative bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 px-6 py-5 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <i className="fa-solid fa-lock text-white"></i>
                    </div>
                    Change Password
                  </h3>
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <i className="fas fa-times text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <form
                  onSubmit={handleSubmit(getChangePasword)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="oldPassword"
                      className="flex text-sm font-semibold text-slate-300 items-center gap-2"
                    >
                      <i className="fa-solid fa-lock text-blue-400 text-xs"></i>
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("password")}
                        id="oldPassword"
                        placeholder="Enter your current password"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-white 
                        rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 
                        placeholder-slate-400 transition-all duration-300 hover:border-slate-500/50"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <i className="fa-solid fa-eye-slash text-slate-400 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="flex text-sm font-semibold text-slate-300 items-center gap-2"
                    >
                      <i className="fa-solid fa-key text-green-400 text-xs"></i>
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("newPassword")}
                        id="newPassword"
                        placeholder="Enter your new password"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 text-white 
                        rounded-2xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 
                        placeholder-slate-400 transition-all duration-300 hover:border-slate-500/50"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <i className="fa-solid fa-eye-slash text-slate-400 text-sm"></i>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full group/btn text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                    focus:ring-4 focus:outline-none focus:ring-blue-500/50 font-semibold 
                    rounded-2xl text-lg px-6 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <i className="fa-solid fa-save group-hover/btn:scale-110 transition-transform duration-300"></i>
                      Save Changes
                      <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform duration-300"></i>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ), document.body)}
    </>
  );
}
