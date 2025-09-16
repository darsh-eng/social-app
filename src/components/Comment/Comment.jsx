import React from 'react'
import UpdateComment from '../UpdateComment/UpdateComment';
import DeleteComment from '../DeleteComment/DeleteComment';
import { useLocation } from 'react-router-dom';

export const Comment = ({ comment, currentUserId }) => {
    if (!comment) return null;

    let { createdAt, content, commentCreator, _id } = comment;
    const location = useLocation();

    const isOwnComment = currentUserId && commentCreator?._id === currentUserId;
    const isProfilePage = location.pathname === '/profile';
    const shouldShowButtons = isOwnComment || isProfilePage;

    return (
        <div className="group w-full bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 my-3 sm:my-4 border border-slate-700/50 
          hover:border-slate-600/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 
          hover:scale-[1.02] hover:-translate-y-1 animate-fadeInUp">
            {/* User info */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <div className="relative group/avatar">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-0 group-hover/avatar:opacity-70 transition-opacity duration-300"></div>
                        <img
                            src={commentCreator?.photo || commentCreator}
                            alt={commentCreator?.name || "User"}
                            className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-600 shadow-lg group-hover/avatar:border-blue-400 transition-all duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                    </div>
                    <div className="ml-4">
                        <h4 className="font-bold text-slate-200 text-sm sm:text-base group-hover:text-blue-300 transition-colors duration-300">
                            {commentCreator?.name || "Anonymous"}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                            <i className="fa-solid fa-clock text-xs"></i>
                            {new Date(createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>
                {shouldShowButtons && (
                    <div className='flex gap-2 sm:gap-3'>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                            <UpdateComment id={_id} />
                        </div>
                        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                            <DeleteComment Idx={_id} />
                        </div>
                    </div>
                )}
            </div>

            {/* Comment Content */}
            <div className="relative">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed group-hover:text-slate-100 transition-colors duration-300">
                    {content}
                </p>
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            </div>

            {/* Comment Actions */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700/50">
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors duration-300 group/action">
                    <i className="fa-regular fa-thumbs-up text-sm group-hover/action:scale-110 transition-transform duration-300"></i>
                    <span className="text-xs font-medium">Like</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors duration-300 group/action">
                    <i className="fa-solid fa-reply text-sm group-hover/action:scale-110 transition-transform duration-300"></i>
                    <span className="text-xs font-medium">Reply</span>
                </button>
            </div>
        </div>
    )
};
