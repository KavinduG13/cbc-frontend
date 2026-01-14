import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import UserDataMobile from "./userDataMobile";
import UserData from "./userData";

export default function Header() {

    const [isSideBarOpen, setIsSideBarOpen] = useState(false)

    return (
        <header className="w-full h-[100px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative items-center">
                <img src="/logo.png" className="hidden lg:flex h-full w-[170px] absolute object-cover left-0" />
                <div className="lg:hidden w-full relative flex justify-center items-center">
                    <MdMenu
                        className="absolute left-0 text-3xl"
                        onClick={() => setIsSideBarOpen(true)}
                    />
                    <img src="/logo.png" className="h-full w-[170px] object-cover" />
                </div>
                {
                    isSideBarOpen &&
                    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] text-secondary z-100">
                        <div className="w-[300px] bg-primary h-full flex flex-col relative">
                            <div className="lg:hidden h-[100px] w-full bg-accent relative flex justify-center items-center">
                                <MdMenu
                                    className="absolute left-2 text-3xl text-white"
                                    onClick={() => setIsSideBarOpen(false)}
                                />
                                <img src="/logo.png" className="h-full w-[170px] object-cover" />
                            </div>
                            <a href="/" className="p-4 border-b border-secondary/10">
                                Home
                            </a>
                            <a href="/products" className="p-4 border-b border-secondary/10">
                                Products
                            </a>
                            <a href="/about" className="p-4 border-b border-secondary/10">
                                About Us
                            </a>
                            <a href="/contact" className="p-4 border-b border-secondary/10">
                                Contact Us
                            </a>
                            <a href="/cart" className="p-4 border-b border-secondary/10">
                                Cart
                            </a>
                            <div className="w-[300px] lg:hidden flex absolute bottom-[20px] left-0 justify-center items-center gap-4">
                                <UserDataMobile />
                            </div>
                        </div>
                    </div>
                }
                <div className="hidden h-full lg:flex justify-center items-center w-full gap-[20px] text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="h-full w-[200px] hidden lg:flex absolute right-0 top-0 justify-center items-center gap-4">
                    <UserData />
                </div>
                <Link to="/cart" className="hidden h-full lg:flex justify-center items-center text-3xl absolute right-0">
                    <BsCart3 />
                </Link>
            </div>
        </header>
    )
}