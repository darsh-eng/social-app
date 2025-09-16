import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Comment } from '../Comment/Comment'
import { CreateComment } from '../CreateCommentModal/CreateComment'

export default function Postdetails() {

    let { id } = useParams()


    function getPost() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
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
        queryKey: ["getSinglePost"],
        queryFn: getPost,
        select: (data) => data?.data?.post

    })

    let { data: currentUser } = useQuery({
        queryKey: ["getProfile"],
        queryFn: getUserProfile,
        select: (data) => data?.data?.user
    })


    if (error) {
        return <h2 className='flex justify-center items-center text-red-600 text-4xl'>{error.message}</h2>
    }
    if (isLoading) {
        return (<div className="flex justify-center items-center min-h-screen">
            <i className="fas fa-spinner animate-spin text-slate-200 text-4xl"></i>
        </div>
        )
    }

    return (
        <>
            <div

                className="sm:w-full md:w-[80%] lg:w-[60%] bg-[#1e293b] rounded-2xl shadow-lg my-8 mx-auto p-5"
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={data.user.photo}
                            className="w-10 h-10 rounded-full object-cover border border-gray-600"
                            alt={data.user.name}
                        />
                        <div>
                            <p className="font-semibold text-gray-100">{data.user.name}</p>
                            <p className="text-xs text-gray-400">{data.createdAt}</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-200 cursor-pointer">
                        <i className="cursor-pointer fa-solid fa-ellipsis"></i>
                    </button>
                </div>

                {data.body && (
                    <p className="text-gray-200 text-base leading-relaxed mb-3">
                        {data.body}
                    </p>
                )}

                {data.image && (
                    <img
                        src={data.image}
                        className="w-full rounded-lg mt-2 shadow-md"
                        alt={data.body}
                    />
                )}

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700 text-gray-400">
                    <button className="cursor-pointer flex items-center gap-2 hover:text-blue-400 transition">
                        <i className=" fa-regular fa-thumbs-up"></i>
                        <span className="text-sm">Like</span>
                    </button>
                    <span className=" flex items-center ">
                        <CreateComment postId={data.id || data._id} />
                    </span>
                    <button className="cursor-pointer flex items-center gap-2 hover:text-blue-400 transition">
                        <i className=" fa-solid fa-share"></i>
                        <span className="text-sm">Share</span>
                    </button>
                </div>
                {data?.comments.map((comment) => <Comment key={comment._id || comment.id} comment={comment} currentUserId={currentUser?._id} />)}
            </div>
        </>
    )
}
