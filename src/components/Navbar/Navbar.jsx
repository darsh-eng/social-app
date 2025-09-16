import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setUserLogin } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dropdown toggle
  useEffect(() => {
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');

    if (userMenuButton && userDropdown) {
      const toggleDropdown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
      };

      userMenuButton.addEventListener('click', toggleDropdown);

      // Close dropdown when clicking outside
      const handleClickOutside = (event) => {
        if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
          userDropdown.classList.add('hidden');
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        userMenuButton.removeEventListener('click', toggleDropdown);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, []);

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("login");

  }
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


  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl'
        : 'bg-slate-900/80 backdrop-blur-sm'
        }`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-users text-white text-sm"></i>
            </div>
            <span className="self-center text-xl font-bold whitespace-nowrap text-white group-hover:text-blue-400 transition-colors">
              Social App
            </span>
          </Link>



          {/* User Menu */}
          <div className="flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userLogin !== null ? (
              <>
                <div className="relative">
                  <button
                    type="button"
                    className="flex cursor-pointer text-sm bg-slate-800 hover:bg-slate-700 rounded-full p-1 focus:ring-4 focus:ring-slate-600 transition-all duration-200"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full border-2 border-slate-600"
                      src={data?.photo}
                      alt="user photo"
                    />
                  </button>

                  <div className="z-50 hidden my-4 text-base list-none bg-slate-800 divide-y divide-slate-700 rounded-xl shadow-xl border border-slate-700" id="user-dropdown">
                    <div className="px-4 py-3">
                      <span className="block text-sm font-semibold text-white">{data?.name}</span>
                      <span className="block text-sm text-slate-400 truncate">{data?.email}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                        >
                          <i className="fa-solid fa-user mr-2"></i>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <span
                          onClick={signOut}
                          className="block cursor-pointer px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-red-400 transition-colors"
                        >
                          <i className="fa-solid fa-sign-out-alt mr-2"></i>
                          Sign out
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className='flex gap-3'>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>


      {/* Spacer to prevent content from going under the navbar */}
      <div className="h-16"></div>
    </>
  )
}
