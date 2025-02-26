import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("voterId");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className='bg-purple-200 p-2 flex flex-row justify-around w-[95vw]'>
            <Link to={'/'}>
                <div className='flex flex-row w-1/2 font-bold text-xl'>VoteWise</div>
            </Link>
            <div className='flex flex-row w-1/2 justify-around'>
                {!token ? (
                    <>
                        <Link to={'/login'}><div className='cursor-pointer'>Login</div></Link>
                        <Link to={'/signup'}><div className='cursor-pointer'>Signup</div></Link>
                    </>
                ) : (
                    <>
                        <Link to={'/candidates'}><div className='cursor-pointer'>Candidates</div></Link>
                        <Link to={'/results'}><div className='cursor-pointer'>Results</div></Link>
                        <Link to={'/profile'}><div className='cursor-pointer'>Profile</div></Link>
                        <Link to={'/voting'}><div className='cursor-pointer'>Vote</div></Link>
                        <div onClick={handleLogout} className='cursor-pointer text-red-500 font-semibold'>
                            Logout
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
