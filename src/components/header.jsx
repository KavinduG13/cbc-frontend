import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
    return(
        <header className="w-full h-[100px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative">
                <img src="/logo.png" className="h-full w-[170px] absolute object-cover left-0" />
                <div className="h-full flex justify-center items-center w-full gap-[20px] text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <Link to="/cart" className="h-full flex justify-center items-center text-3xl absolute right-0">
                <BsCart3 />
                </Link>
            </div>
        </header>
    )
}