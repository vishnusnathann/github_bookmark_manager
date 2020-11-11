import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
<>
    <nav className="relative flex flex-wrap items-center  px-2 py-3 navbar-expand-lg bg-blue-500 mb-3">
        <div className=" px-2  flex flex-wrap items-center justify-start">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/">
            <span
            className="text-xl font-bold leading-relaxed inline-block mr1- py-1 whitespace-no-wrap uppercase text-white"
            
            data-testid="home-link"
            >
                GitHub search
            </span>
            </Link>
        </div>

        </div>
    </nav>
    </>
    )
}

export default Navbar;

