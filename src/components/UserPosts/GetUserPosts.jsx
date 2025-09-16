import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Comment } from '../Comment/Comment'
import { CreateComment } from '../CreateCommentModal/CreateComment'
import { Link } from 'react-router-dom'
import UpdatePost from '../UpdatePost/UpdatePost'
import toast from 'react-hot-toast'

export default function GetUserPosts({ id }) {
  let queryClient = useQueryClient();
  function deletePost(postId) {
    axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem('userToken')
      }
    }).then((res) => {
      if (res.data.message === "success") {
        toast.success("The post is deleted successfully")
      }
      queryClient.invalidateQueries({ queryKey: ["getUserPost"] })

    }).catch((err) => {
      if (err) {
        toast.error("The post can't deleted , Please Try Again")
      }

    })
  }
  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }

  function getUserProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ["getUserPost", id],
    queryFn: getUserPosts,
    select: (data) => data?.data?.posts
  })

  let { data: currentUser } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getUserProfile,
    select: (data) => data?.data?.user
  })

  if (isLoading) {
    return (<div className="flex justify-center items-center min-h-screen">
      <i className="fas fa-spinner animate-spin text-slate-200 text-4xl"></i>
    </div>
    )
  }

  if (isError) {
    return <h2 className='flex justify-center items-center text-red-600 text-4xl'>{error.message}</h2>
  }

  return (
    <>
      {data?.length > 0 ? (
        data.map((post) => (
          <div
            key={post._id || post.id}
            className="sm:w-full md:w-[80%] lg:w-[60%] bg-[#1e293b] rounded-xl sm:rounded-2xl shadow-lg my-6 sm:my-8 mx-auto p-4 sm:p-5"
          >
            <Link to={`/postdetails/${post.id || post._id}`} >
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.photo}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-600"
                    alt={post.user.name}
                  />
                  <div>
                    <p className="font-semibold text-gray-100 text-sm sm:text-base">{post.user.name}</p>
                    <p className="text-[11px] sm:text-xs text-gray-400">{post.createdAt}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-200 cursor-pointer">
                  <i className="cursor-pointer fa-solid fa-ellipsis"></i>
                </button>
              </div>

              {post.body && (
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-3">
                  {post.body}
                </p>
              )}

              {post.image && (
                <img
                  src={post.image}
                  className="w-full rounded-lg mt-2 shadow-md"
                  alt={post.body}
                />
              )}
            </Link>
            <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-700 text-gray-400 
                grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6 text-sm">

              {/* Like */}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg 
                     hover:text-blue-400 hover:bg-red-500/10 cursor-pointer transition py-2 px-3">
                <i className="fa-regular fa-thumbs-up"></i>
                <span>Like</span>
              </button>

              {/* Comment */}
              <span className="inline-flex w-full items-center justify-center">
                <CreateComment postId={post.id || post._id} />
              </span>

              {/* Update */}
              <span className="inline-flex w-full items-center justify-center">
                <UpdatePost id={post.id || post._id} />
              </span>

              {/* Delete */}
              <button
                onClick={() => { deletePost(post.id || post._id) }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg 
               hover:text-red-500 hover:bg-red-500/10 cursor-pointer transition py-2 px-3"
              >
                <i className="fa-solid fa-trash"></i>
                <span>Delete</span>
              </button>
            </div>



            {post.comments?.length > 0 && (
              <div className="mt-3">
                <Comment comment={post.comments[0]} currentUserId={currentUser?._id} />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-2xl text-slate-400 my-12">
          No posts available for this user.
        </p>
      )}
    </>
  )
}
