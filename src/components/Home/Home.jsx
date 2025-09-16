import React from 'react'
import style from "./Home.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Comment } from '../Comment/Comment'
import { Link } from 'react-router-dom'
import { CreateComment } from '../CreateCommentModal/CreateComment'
import CreatePost from '../CreatePost/CreatePost'

export default function Home() {

  function getAllPosts() {
    return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
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

  let { isError, data, isLoading, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
    select: (data) => data?.data?.posts
  })

  let { data: currentUser } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getUserProfile,
    select: (data) => data?.data?.user
  })


  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 mx-auto">
            <i className="fa-solid fa-exclamation-triangle text-red-400 text-4xl"></i>
          </div>
          <h2 className="text-red-400 text-2xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-slate-400 text-lg">{error.message}</p>
        </div>
      </div>
    )
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
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Create Post Card */}
        <CreatePost />

        {/* Posts Feed */}
        <div className="space-y-8">
          {data.map((post, index) => (
            <div
              key={post._id || post.id}
              className="group bg-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden 
                hover:shadow-3xl hover:shadow-blue-500/10 hover:border-slate-600/50 transition-all duration-500 
                hover:scale-[1.02] hover:-translate-y-1"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Post Header */}
              <div className="p-4 sm:p-6 pb-3 sm:pb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Link to={`/postdetails/${post.id || post._id}`} className="block relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative group/avatar">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-0 group-hover/avatar:opacity-70 transition-opacity duration-300"></div>
                        <img
                          src={post.user.photo}
                          className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-slate-600 shadow-lg group-hover/avatar:border-blue-400 transition-all duration-300"
                          alt={post.user.name}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-base sm:text-lg group-hover:text-blue-300 transition-colors duration-300">{post.user.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                          <i className="fa-solid fa-clock text-xs"></i>
                          {new Date(post.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group/btn">
                      <i className="fa-solid fa-ellipsis text-lg group-hover/btn:rotate-90 transition-transform duration-300"></i>
                    </button>
                  </div>

                  {/* Post Content */}
                  {post.body && (
                    <div className="relative">
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 group-hover:text-slate-100 transition-colors duration-300">
                        {post.body}
                      </p>
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                    </div>
                  )}

                  {/* Post Image */}
                  {post.image && (
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group/img relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-10"></div>
                      <img
                        src={post.image}
                        className="w-full h-auto object-cover max-h-[60vh] group-hover/img:scale-105 transition-transform duration-500"
                        alt={post.body}
                      />
                    </div>
                  )}
                </Link>
              </div>

              {/* Post Actions */}
              <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer hover:scale-105">
                    <i className="fa-regular fa-thumbs-up text-lg group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300"></i>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors duration-300">Like</span>
                  </button>

                  <div className="flex items-center">
                    <CreateComment postId={post.id || post._id} />
                  </div>

                  <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group cursor-pointer hover:scale-105">
                    <i className="fa-solid fa-share text-lg group-hover:text-green-400 group-hover:scale-110 transition-all duration-300"></i>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-green-400 transition-colors duration-300">Share</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {post.comments && post.comments.length > 0 && (
                <div className="px-6 pb-6 bg-slate-800/20">
                  <Comment comment={post.comments[0]} currentUserId={currentUser?._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )


}
