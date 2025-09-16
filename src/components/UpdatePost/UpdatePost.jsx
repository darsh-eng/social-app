import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import style from "./UpdatePost.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
export default function UpdatePost({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const toggleModal = () => setIsOpen(!isOpen);

  let forms = useForm();
  let { register, handleSubmit, reset } = forms;

  function UpdatePosts(value) {
    setIsLoading(true);
    let myData = new FormData();
    myData.append("body", value.body);

    if (value.image && value.image[0]) {
      myData.append("image", value.image[0]);
    }

    axios.put(`https://linked-posts.routemisr.com/posts/${id}`, myData, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    }).then((res) => {
      if (res.data.message === "success") {
        toast.success("Post updated successfully! 🎉", {
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "10px",
          },
        });

        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });

        setIsOpen(false);
        reset();
      }
    }).catch((err) => {
      toast.error("Failed to update post. Please try again. 😢", {
        style: {
          background: "#1e293b",
          color: "#fff",
          borderRadius: "10px",
        },
      });
      console.error("Update post error:", err);
    }).finally(() => {
      setIsLoading(false);
    });
  }
  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center cursor-pointer py-2 rounded-lg bg-slate-800 text-gray-400  hover:text-blue-400 transition"
      >
        <i className="fa-solid fa-pen-to-square"></i>
        <span>Update</span>

      </button>

      {isOpen && createPortal((
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
          onClick={toggleModal}
        >
          <div
            className="relative w-full max-w-lg mx-4"
            role="dialog" aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-900 rounded-2xl shadow-lg border border-slate-700">
              <div className="flex items-center  justify-between px-6 py-4 border-b border-slate-700">
                <button className="text-lg  sm:text-sm font-semibold text-white">
                  Update Post
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 hover:text-white hover:bg-slate-700 
                  rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <i className="fas fa-close"></i>
                </button>
              </div>

              <div className="p-6">
                <form
                  onSubmit={handleSubmit(UpdatePosts)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex justify-center items-center">
                    <div className='w-full'>

                      <input
                        id="postText"
                        type="text"
                        {...register("body")}
                        className="flex-1 block px-4 py-3 text-sm text-white w-full bg-slate-800 rounded-lg border border-slate-600 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                        placeholder="Write your post..."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="post-image"
                        className="block  cursor-pointer hover:text-blue-600  text-gray-300"
                      >
                        <i className=" fa-2xl fa fa-image"></i>
                      </label>
                      <input
                        type="file"
                        id="post-image"
                        {...register("image")}
                        accept="image/*"
                        className="hidden w-full text-sm text-gray-300 border border-slate-600 rounded-lg cursor-pointer 
              bg-slate-800 focus:outline-none placeholder-gray-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 
                    focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium 
                    rounded-xl text-base px-5 py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Updating...
                      </>
                    ) : (
                      <>
                        Update Post
                        <i className='fa-1x fa-solid fa-paper-plane ms-3'></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ), document.body)}
    </>
  )
}
