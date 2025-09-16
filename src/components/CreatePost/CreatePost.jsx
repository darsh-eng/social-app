import React from "react";
import style from "./CreatePost.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePost() {

  const queryClient = useQueryClient();
  let form = useForm({
    defaultValues: {
      body: "",
      image: ""
    }
  })
  let { register, handleSubmit } = form

  function handleCreatePost(vlaue) {

    let myData = new FormData();
    myData.append('body', vlaue.body)
    myData.append('image', vlaue.image[0])
    axios.post(`https://linked-posts.routemisr.com/posts`, myData, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    }).then((res) => {
      if (res.data.message === "success") {
        toast.success("The post is added successfully")
      }

      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
    }).catch((err) => {
      if (err) {
        toast.error("The post can't Added ,Please Try Again")
      }



    })

  }
  return (
    <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 flex items-center px-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <i className="fa-solid fa-pen-to-square"></i>
          Create New Post
        </h2>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-4">
          <div className="flex items-start gap-4">
            {/* User Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-user text-white text-lg"></i>
            </div>

            {/* Input Field */}
            <div className="flex-1">
              <textarea
                {...register("body")}
                className="w-full px-4 py-3 text-white bg-slate-800 rounded-2xl border border-slate-600 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400
                  resize-none transition-all duration-200 min-h-[60px]"
                placeholder="What's on your mind? Share your thoughts..."
                rows="3"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-700">
            <div className="flex items-center gap-4">
              {/* Image Upload */}
              <label
                htmlFor="post-image"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 
                  border border-slate-600 hover:border-slate-500 cursor-pointer transition-all duration-200 group"
              >
                <i className="fa-solid fa-image text-lg group-hover:text-blue-400 transition-colors"></i>
                <span className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors">
                  Add Photo
                </span>
              </label>
              <input
                type="file"
                id="post-image"
                {...register("image")}
                accept="image/*"
                className="hidden"
              />

              {/* Additional Options */}
              <button
                type="button"
                className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 
                  border border-slate-600 hover:border-slate-500 transition-all duration-200 group"
              >
                <i className="fa-solid fa-smile text-lg group-hover:text-yellow-400 transition-colors"></i>
                <span className="text-sm font-medium text-slate-300 group-hover:text-yellow-400 transition-colors">
                  Feeling
                </span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-blue-600 hover:bg-purple-700 
                text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200
                flex items-center gap-2 group"
            >
              <i className="fa-solid fa-paper-plane group-hover:translate-x-1 transition-transform"></i>
              <span>Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
