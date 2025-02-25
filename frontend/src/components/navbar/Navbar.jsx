import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className='bg-purple-200 p-2 flex flex-row justify-around w-[95vw]'>
            <Link to={'/'}>
                <div className='flex flex-row w-1/2'>VoteWise</div>
            </Link>
            <div className='flex flex-row w-1/2 justify-around'>
                <Link to={'/login'}>
                    <div className='cursor-pointer'>Login</div>
                </Link>
                <Link to={'/signup'}>
                    <div className='cursor-pointer'>Signup</div>
                </Link>
                <Link to={'/candidates'}>
                    <div className='cursor-pointer'>Candidates</div>
                </Link>
                <Link to={'/results'}>
                    <div className='cursor-pointer'>Results</div>
                </Link>
                <Link to={'/profile'}>
                    <div className='cursor-pointer'>Profile</div>
                </Link>
                <Link to={'/voting'}>
                    <div className='cursor-pointer'>Vote</div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar