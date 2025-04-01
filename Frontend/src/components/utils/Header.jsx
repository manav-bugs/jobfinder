import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function Header() {
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(AppContext);
    const navigateTo = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault();

        axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/logout`,
            { withCredentials: true }
        ).then(() => {
            setIsAuthorized(false);
            setUser({});
            navigateTo('/login');
        }).catch((err) => {
            console.log("Error logging out: ", err);
        });
    };

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to={'/'} className="flex items-center">
                        <img width="64" height="64" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Job-Search-recruitment-nawicon-outline-color-nawicon.png" alt="Job Finder" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">JobFinder</span>
                    </Link>
                    
                    <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white rounded-lg focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            {menuOpen ? (
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            ) : (
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            )}
                        </svg>
                    </button>
                    
                    <div className={`${menuOpen ? "block" : "hidden"} w-full lg:flex lg:w-auto text-white`}>
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 mt-4 lg:mt-0">
                            <li><Link to={'/'} className="block py-2 text-white hover:text-blue-400">HOME</Link></li>
                            <li><Link to={'/job/all'} className="block py-2 text-white hover:text-blue-400">ALL JOBS</Link></li>
                            {isAuthorized && (
                                <li><Link to={'/applications/me'} className="block py-2 text-white hover:text-blue-400">{user.role === 'Employer' ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}</Link></li>
                            )}
                            {isAuthorized && user.role === 'Employer' && (
                                <>
                                    <li><Link to={'/job/post'} className="block py-2 text-white hover:text-blue-400">POST NEW JOB</Link></li>
                                    <li><Link to={'/job/me'} className="block py-2 text-white hover:text-blue-400">VIEW YOUR JOBS</Link></li>
                                </>
                            )}
                            {isAuthorized ? (
                                <li><button onClick={handleLogout} className="block w-full text-left py-2 text-red-400 hover:text-red-600">LOGOUT</button></li>
                            ) : (
                                <>
                                    <li><Link to={'/login'} className="block py-2 text-white hover:text-blue-400">LOG IN</Link></li>
                                    <li><Link to={'/register'} className="block py-2 text-white hover:text-blue-400">REGISTER</Link></li>
                                </>
                            )}
                            {user.email && <li><span className="block py-2 text-white font-bold">{user.email}</span></li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
