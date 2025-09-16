import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import style from "./UploadProfile.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });

  const { register, handleSubmit } = form;

  function UploadPhoto(value) {
    let myData = new FormData();
    myData.append("photo", value.photo[0]);

    axios
      .put(`https://linked-posts.routemisr.com/users/upload-photo`, myData, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          toast.success("✅ Photo updated successfully");
          toggleModal();
          queryClient.invalidateQueries({ queryKey: ["getProfile"] });
          queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
          queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        }
      })
      .catch(() => {
        toast.error("❌ Sorry, photo upload failed. Try again!");
      });
  }

  return (
    <>
      <button
        onClick={toggleModal}
        className="group flex items-center gap-3 text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
        focus:ring-4 focus:outline-none focus:ring-purple-400/50 font-semibold 
        rounded-2xl text-lg px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
      >
        <i className="fa-solid fa-image group-hover:scale-110 transition-transform duration-300"></i>
        <span>Update Photo</span>
        <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
      </button>

      {isOpen && createPortal((
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg mx-4 animate-slideIn" role="dialog" aria-modal="true">
            <div className="relative bg-slate-900/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-6 py-5 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <i className="fa-solid fa-image text-white"></i>
                    </div>
                    Update Profile Photo
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
                  onSubmit={handleSubmit(UploadPhoto)}
                  className="space-y-6"
                >
                  {/* File Upload Area */}
                  <div className="space-y-3">
                    <label
                      htmlFor="uploadPhoto"
                      className="flex text-sm font-semibold text-slate-300 items-center gap-2"
                    >
                      <i className="fa-solid fa-upload text-purple-400 text-xs"></i>
                      Choose a photo
                    </label>

                    {/* Custom File Upload */}
                    <div className="relative">
                      <input
                        type="file"
                        id="uploadPhoto"
                        {...register("photo")}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="border-2 border-dashed border-slate-600/50 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-colors duration-300 group/upload">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover/upload:scale-110 transition-transform duration-300">
                            <i className="fa-solid fa-cloud-upload-alt text-2xl text-purple-400"></i>
                          </div>
                          <div>
                            <p className="text-slate-300 font-medium mb-1">Click to upload or drag and drop</p>
                            <p className="text-slate-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full group/btn text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                    focus:ring-4 focus:outline-none focus:ring-purple-500/50 font-semibold 
                    rounded-2xl text-lg px-6 py-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-3">
                      <i className="fa-solid fa-save group-hover/btn:scale-110 transition-transform duration-300"></i>
                      Save Photo
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
