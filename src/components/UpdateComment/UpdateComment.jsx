import React, { useState } from 'react'
import style from "./UpdateComment.module.css"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { createPortal } from 'react-dom';
export default function UpdateComment({ id }) {
  const toggleModal = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);
  let queryClient = useQueryClient();
  let form = useForm({
    defaultValues: {
      content: ""
    }
  });
  let { register, handleSubmit } = form;
  function UpdateComment(value) {
    axios.put(`https://linked-posts.routemisr.com/comments/${id}`, value, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then((res) => {
      if (res.data.message === "success") {
        toast.success("The Comment is Updated Successfully")
      }
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });

    }).catch(() => {
      toast.error("The comment can't be updated, please try again");
    })

  }
  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg bg-slate-800 text-gray-300  hover:text-blue-400 transition"
      >
        <i className="fa-solid fa-pen-to-square"></i>


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
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-white">Update Comment</h3>
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
                  onSubmit={handleSubmit(UpdateComment)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex justify-center items-center">
                    <div className='w-full'>

                      <input
                        id="postText"
                        type="text"
                        {...register("content")}
                        className="flex-1 block px-4 py-3 text-sm text-white w-full bg-slate-800 rounded-lg border border-slate-600 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                        placeholder="Edit your comment..."
                        required
                      />
                    </div>

                  </div>
                  <button
                    type="submit"
                    className="w-full cursor-pointer text-white bg-blue-600 hover:bg-blue-700 
                    focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium 
                    rounded-xl text-base px-5 py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    save
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
