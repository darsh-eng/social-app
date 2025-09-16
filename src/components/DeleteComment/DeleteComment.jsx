import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteComment({ Idx }) {
  const queryClient = useQueryClient();

  function deleteComment(idx) {
    axios.delete(`https://linked-posts.routemisr.com/comments/${idx}`, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then((res) => {
      if (res.data.message === "success") {
        toast.success("Comment deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["getPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getUserPost"] });
        queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
      }
    }).catch((err) => {
      toast.error("Failed to delete comment");
    });
  }

  return (
    <button
      onClick={() => deleteComment(Idx)}
      className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
    >
      <i className="fa-solid fa-trash"></i>
    </button>
  )
}
