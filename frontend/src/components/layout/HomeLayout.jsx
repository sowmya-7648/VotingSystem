import React from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-16"> {/* Ensures space below navbar */}
                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout;
