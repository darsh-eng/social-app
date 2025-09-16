import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import GetUserPosts from '../UserPosts/GetUserPosts'
import ChangePassword from '../ChangePassword/ChangePassword'
import UploadProfile from '../UploadProfile/UploadProfile'
import CreatePostCompact from '../CreatePost/CreatePostCompact'
export default function Profile() {

  function getUserProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }

  let { isError, isLoading, error, data } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getUserProfile,
    select: (data) => data?.data?.user
  })


  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="mt-6 text-slate-300 text-lg font-medium animate-pulse">Loading your profile...</p>
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
          <h2 className="text-red-400 text-2xl font-bold mb-2">Profile Error</h2>
          <p className="text-slate-400 text-lg">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {data && (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
            {/* Header Section */}
            <div className="text-center mb-10 sm:mb-16 animate-fadeInUp">
              <h1 className="text-3xl sm:text-5xl font-bold gradient-text mb-4 sm:mb-6">My Profile</h1>
              <div className="h-2 w-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg"></div>
              <p className="text-slate-400 text-base sm:text-lg mt-3 sm:mt-4">Welcome to your personal space</p>
            </div>

            {/* Main Cards Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-16">

              {/* User Info Card */}
              <div className="group bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden 
              hover:shadow-3xl hover:shadow-blue-500/10 hover:border-slate-600/50 transition-all duration-500 
              hover:scale-[1.02] hover:-translate-y-1 animate-fadeInUp">
                <div className="h-24 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
                <div className="p-5 sm:p-8 relative">
                  {/* Profile Header */}
                  <div className="flex flex-col items-center text-center mb-8">
                    <div className="relative group/avatar">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover/avatar:opacity-70 transition-opacity duration-500"></div>
                      <img
                        src={data.photo}
                        alt={data.name}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 shadow-2xl object-cover group-hover/avatar:border-blue-400 transition-all duration-500"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
                    </div>
                    <div className="mt-4 sm:mt-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors duration-300">{data.name}</h2>
                      <p className="text-slate-400 text-sm sm:text-lg mb-3 flex items-center justify-center gap-2">
                        <i className="fa-solid fa-envelope text-sm"></i>
                        {data.email}
                      </p>
                      <span className="inline-block px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <i className="fa-solid fa-crown mr-2"></i>
                        {data.role}
                      </span>
                    </div>
                  </div>

                  {/* User Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="group/detail bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover/detail:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-user text-white text-sm"></i>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Username</p>
                      </div>
                      <p className="font-bold text-lg text-slate-200 group-hover/detail:text-blue-300 transition-colors duration-300">{data.name}</p>
                    </div>

                    <div className="group/detail bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover/detail:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-venus-mars text-white text-sm"></i>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Gender</p>
                      </div>
                      <p className="font-bold text-lg text-slate-200 group-hover/detail:text-pink-300 transition-colors duration-300">{data.gender}</p>
                    </div>

                    <div className="group/detail bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover/detail:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-calendar-plus text-white text-sm"></i>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Joined</p>
                      </div>
                      <p className="font-bold text-lg text-slate-200 group-hover/detail:text-green-300 transition-colors duration-300">{new Date(data.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="group/detail bg-slate-800/50 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover/detail:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-birthday-cake text-white text-sm"></i>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">Date of Birth</p>
                      </div>
                      <p className="font-bold text-lg text-slate-200 group-hover/detail:text-purple-300 transition-colors duration-300">{data.dateOfBirth}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Card */}
              <div className="group bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden 
              hover:shadow-3xl hover:shadow-emerald-500/10 hover:border-slate-600/50 transition-all duration-500 
              hover:scale-[1.02] hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="h-24 bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20"></div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
                <div className="p-5 sm:p-8 relative">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold gradient-text mb-3 flex items-center justify-center gap-3">
                      <i className="fa-solid fa-cog animate-spin" style={{ animationDuration: '3s' }}></i>
                      Account Settings
                    </h2>
                    <p className="text-slate-400 text-lg">Manage your account preferences</p>
                  </div>

                  <div className="space-y-8">
                    {/* Change Password Section */}
                    <div className="group/setting bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover/setting:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-lock text-white text-lg"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover/setting:text-blue-300 transition-colors duration-300">Change Password</h3>
                          <p className="text-slate-400">Update your account password securely</p>
                        </div>
                      </div>
                      <ChangePassword />
                    </div>

                    {/* Update Photo Section */}
                    <div className="group/setting bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover/setting:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-image text-white text-lg"></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover/setting:text-purple-300 transition-colors duration-300">Update Photo</h3>
                          <p className="text-slate-400">Change your profile picture</p>
                        </div>
                      </div>
                      <UploadProfile />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="group bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden 
            hover:shadow-3xl hover:shadow-orange-500/10 hover:border-slate-600/50 transition-all duration-500 
            hover:scale-[1.01] animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="h-24 bg-gradient-to-r from-orange-600 via-red-700 to-pink-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              </div>
              <div className="p-8 relative">
                <div className="text-center mb-6 sm:mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2 sm:mb-3 flex items-center justify-center gap-3">
                    <i className="fa-solid fa-pen-to-square"></i>
                    My Posts
                  </h2>
                  <p className="text-slate-400 text-base sm:text-lg">Create and manage your posts</p>
                </div>
                <div className="space-y-5 sm:space-y-6">
                  <CreatePostCompact />
                  <GetUserPosts id={data._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
