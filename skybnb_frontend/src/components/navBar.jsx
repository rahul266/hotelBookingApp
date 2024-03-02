'use client'
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

function Navbar({ onSearch }) {
    const { login, logout,isAuthenticated } = useAuth();
    const Router = useRouter()
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', () => {
            setCurrentPath(window.location.pathname);
        });
    }, []);
    const handleSearch = () => {
        onSearch(searchTerm);
    }
    const signout = () => {
        logout()
        Router.push('/login')
    }
    console.log(Router)
    return (
        <nav className="py-4 px-6 flex items-center justify-between">
            <div className=" ml-16 flex items-center">
                <a href="/">
                    <span className="font-bold text-pantone text-2xl">Skybnb</span>
                </a>
                
            </div>
            {isAuthenticated ? (
                <>
                    <div className="focus-within:shadow-lg  flex items-center border border-gray-300 rounded-3xl justify-between">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-80 h-11 rounded-full pl-8 pr-3 py-2 focus:outline-none"
                    />
                        <button
                            className="text-white bg-pantone px-3 py-3 rounded-full"
                            onClick={handleSearch}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="h-6 w-6 px-1 pl-1 stroke-current"
                            strokeWidth="3"
                            role="presentation"  
                        >
                            <path
                                fill="none"
                                d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"
                            />
                        </svg>
                    </button>
                </div>
                    <div className="flex items-center">
                        <button onClick={() => { Router.push('/bookings') }} className="bg-pantone text-white px-4 py-2 rounded-md ml-4">
                            My Bookings
                        </button>
                        <button onClick={signout} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md ml-4">
                            Logout
                        </button>
                </div>
                </>
            ) : (
                <div className="flex items-center">
                    {currentPath === '/login' && (
                            <button onClick={() => { setCurrentPath('/register'); Router.push('/register') }} className="bg-pantone hover:font-medium hover:shadow-md text-white px-4 py-2 rounded-md">
                            Register
                        </button>
                    )}
                    {currentPath === '/register' && (
                            <button onClick={() => { setCurrentPath('/login'); Router.push('/login') }} className="bg-pantone hover:font-medium hover:shadow-md text-white px-4 py-2 rounded-md">
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
