import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [url, setUrl] = useState(false);
  const [isDropDownMenu, setIsDropDownMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const {isLoggedIn,profile,logOut} = useAuth();

  
  return (
    <header className="  bg-white shadow-lg ">
      <nav className="max-w-6xl mx-auto h-16 flex justify-between items-center px-4 md:px-6 ">
        {/*  //left  */}
        <div className="flex space-x-4">
          {/* logo */}
          <div>
            <Link
              to="/"
              className="text-orange-600 text-2xl font-bold hover:text-orange-700 cursor-pointer"
            >
              BLOGIFY
            </Link>
          </div>
          {/* menu */}
          <div className="md:flex items-center space-x-4 hidden">
            <Link
              to="/"
              className="text-orange-600 pb-1 text-sm font-medium border-b border-orange-600  cursor-pointer"
            >
              Home{" "}
            </Link>
            <Link
              to="/articles"
              className="text-gray-700 pb-1 text-sm font-medium border-b border-transparent  hover:text-orange-600 cursor-pointer"
            >
              Articles{" "}
            </Link>
            {/* protected routes */}
            {
              isLoggedIn && (
                <>
                  <Link
              to="/editor"
              className="text-gray-700 pb-1 text-sm font-medium border-b border-transparent hover:text-orange-600  cursor-pointer"
            >
              Article Editor
            </Link>
            <Link
              to="/myArticles"
              className="text-gray-700 pb-1 text-sm font-medium border-b border-transparent hover:text-orange-600  cursor-pointer"
            >
              My Articles
            </Link></>
              )
            }
          
          </div>
        </div>
        {/* right */}
        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-2 ">
              <div>
                <h3 className="text-sm">{`Hello , ${profile?.username}👋`}</h3>
              </div>
              <div className="relative ">
                <button
                 className="bg-gray-200 flex items-center justify-center rounded-full w-8 h-8 focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                 onMouseEnter={() => setIsDropDownMenu(true)}
                 onClick={() => setIsDropDownMenu(!isDropDownMenu)}
                 >
                
                  {profile?.avatar_url ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={profile.avatar_url} 
                      alt="user img"
                    />
                  ) : (
                    <span className=" text-gray-600">
                      {" "}
                      <FaUser size={25} />
                    </span>
                  )}
                </button>
                {/* drop down menu */}
                {
                    isDropDownMenu && (
                        <div 
                        className="absolute right-0 bg-white mt-1 w-48 rounded-md shadow-lg z-10 "
                        onMouseLeave={() => setIsDropDownMenu(false)}
                        >
                        <div className="absolute right-0 h-3 w-48"></div>
                        <Link to="/profile" className="block text-sm text-gray-700 px-4 py-2 font-medium hover:bg-gray-200">
                          Profile
                        </Link>
                        <Link className="block text-sm text-gray-700 px-4 py-2 font-medium hover:bg-gray-200">
                          Profile
                        </Link>
                        <button onClick={()=> logOut()} className="block text-sm text-gray-700 px-4 py-2 font-medium hover:bg-gray-200">
                          Signout
                        </button>
                      </div>
                    )
                }
            
             </div>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/signin"
                className="bg-orange-600 text-white px-4 py-2 rounded ring-offset-2 ring-indigo-600 cursor-pointer"
              >
                Signin
              </Link>
              <Link
                to="/signup"
                className="bg-transparent text-orange-600 border border-orange-500 px-4 py-2 rounded hover:bg-orange-600 hover:text-white  cursor-pointer"
              >
                Signup
              </Link>
            </div>
          )}
           

        </div>
        <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
      </nav>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-orange-700 bg-orange-50">
              Home
            </Link>
            <Link to="/articles" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
              Articles
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/write" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Write
                </Link>
                <Link to="/myArticles" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  My Articles
                </Link>
                <Link to="/profile" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Profile
                </Link>
                <button
                 onClick={()=> logOut()}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  Sign Out
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link to="/signin" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Sign In
                </Link>
                <Link to="/signup" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                  Sign Up
                </Link>
              </>
            )}
         </div>
         </div>
      )}
    </header>
  );
};

export default Header;
