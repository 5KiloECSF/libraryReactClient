import React, { useState, useEffect } from "react";
// import Image from "next/dist/client/image";

import {Link} from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import {LocalImg} from "../../Constants/constants";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [shadow, setShadow] = useState(false);
    const [navBg, setNavBg] = useState("#ecf0f3");
    const [linkColor, setLinkColor] = useState("#1f2937");

    const styles = {
        navBarLink: "ml-10 text-sm uppercase hover:border-b",
    };
    const handleNav = (val) => {
        setNav(val);
    };

    useEffect(() => {
        const handleShadow = () => {
            if (window.scrollY >= 90) {
                setShadow(true);
            } else {
                setShadow(false);
            }
        };
        window.addEventListener("scroll", handleShadow);
    }, []);

    return (
        <div className="fixed w-full bg-white h-20 shadow-xl z-[100]">
            {/* Desktop Navbar */}
            <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
                <Link to="/">
                    <div className="h-full overflow-hidden"><img className="h-full h-20 w-40 overflow-hidden" src={LocalImg("logo1.png")} alt="/"/></div>
                </Link>
                <div className="pr-10">
                    <ul className="hidden md:flex">
                        <Link to="/">
                            <li className={styles.navBarLink}>Home</li>
                        </Link>
                        <Link to="/items">
                            <li className={styles.navBarLink}>Filter books</li>
                        </Link>

                    </ul>
                    <div onClick={() => handleNav(true)} className="md:hidden">
                        <AiOutlineMenu size={25} />
                    </div>
                </div>
            </div>

            {/* Mobile Nav bar */}
            <div
                className={
                    nav ? " md:hidden fixed left-0 top-0 w-full h-screen bg-black/70" : ""
                }>
                {/* mobile sidebar white */}
                <div
                    className={
                        nav
                            ? " fixed left-0 top-0 w-[75%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
                            : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
                    }>
                    {/* mobile header */}
                    <div>
                        {/* mobile logo & close */}
                        <div className="flex w-full items-center justify-between">
                            <Link to="/">
                                <div className="h-full overflow-hidden"><img className="h-full h-20 w-40 overflow-hidden" src={LocalImg("logo1.png")} alt="/"/></div>
                            </Link>
                            {/* close button */}
                            <div
                                onClick={() => handleNav(false)}
                                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer">
                                <AiOutlineClose />
                            </div>
                        </div>
                        {/* mobile info */}
                        <div className="border-b border-gray-300 my-4">
                            <p className="w-[85%] md:w-[90%] py-4 ">
                                {" "}
                                Read and Change your life
                            </p>
                        </div>
                    </div>

                    {/* mobile menu */}
                    <div className="py-4 flex-col">
                        <ul className="uppercase">
                            <Link to="/">
                                <li onClick={() => setNav(false)} className="py-4 text-sm">
                                    Home
                                </li>
                            </Link>
                            <Link to="/items">
                                <li onClick={() => setNav(false)} className="py-4 text-sm">
                                    Filter books
                                </li>
                            </Link>


                        </ul>
                        {/* mobile bottom */}
                        <div className="pt-40 ">
                            <p className="uppercase tracking-widest text-[#561e5">
                                {" "}
                                check social media
                            </p>
                            {/* icons */}
                            <div className="flex items-center justify-evenly my-4 w-full sm:w-[90%]">
                                <div className="rounded-full shadow-lg shadow-gray-400  p-3 cursor-pointer hover:scale-155 ease-in duration-300">
                                    <FaLinkedinIn />
                                </div>
                                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-120 ease-in duration-300">
                                    <FaGithub />
                                </div>
                                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                                    <AiOutlineMail />
                                </div>
                                <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
                                    <BsFillPersonLinesFill />
                                </div>
                                <CircleIcon icon={<BsFillPersonLinesFill />} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

export const CircleIcon = ({ icon }) => {
    return (
        <div className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer hover:scale-110 ease-in duration-300">
            {icon}
        </div>
    );
};
