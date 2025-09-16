import { QueryClient, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const CreateComment = ({ postId, trigger }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();


  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      content: "",
      post: postId,
    },
  });

  async function addComment(value) {
    try {
      let res = await axios.post(
        `https://linked-posts.routemisr.com/comments`,
        value,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (res.data.message === "success") {
        toast.success("Comment added 🎉", {
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "10px",
          },
        });


      }
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
    } catch (err) {
      toast.error("Something went wrong 😢", {
        style: {
          background: "#1e293b",
          color: "#fff",
          borderRadius: "10px",
        },
      });
    }

    reset();
    setOpen(false);
  }

  const defaultTrigger = (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center cursor-pointer hover:bg-red-500/10  py-2 rounded-lg bg-slate-800/80 hover:text-blue-400 text-gray-400  transition"
      type="button"
    >
      <i className="fa-regular fa-comment"></i>
      <span className="sm:text-sm">Comment</span>
    </button>
  );

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)} className="inline-flex">{trigger}</span>
      ) : (
        defaultTrigger
      )}

      {open && createPortal(
        (
          <div
            className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-xl bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <h2 className="text-lg font-semibold text-white">Add Comment</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit(addComment)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Write your comment
                    </label>
                    <textarea
                      {...register("content")}
                      className="w-full px-4 py-3 text-white bg-slate-800 rounded-xl border border-slate-600 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 resize-none
                        leading-relaxed min-h-[140px]"
                      placeholder="Type something..."
                      required
                    />
                  </div>

                  <input type="hidden" value={postId} {...register("post")} />

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium 
                        transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600/80 disabled:opacity-70 text-white font-semibold 
                        transition-all cursor-pointer flex items-center gap-2"
                    >
                      <i className={`fa-solid ${isSubmitting ? 'fa-spinner animate-spin' : 'fa-paper-plane'}`}></i>
                      {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </>
  );
};
