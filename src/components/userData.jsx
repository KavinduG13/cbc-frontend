import axios from "axios"
import { useEffect, useRef, useState } from "react"

export default function UserData() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

    const menuRef = useRef(null)
    const btnRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token != null) {
            axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setUser(res.data)
                    setLoading(false)
                })
                .catch(() => {
                    localStorage.removeItem("token")
                    setUser(null)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    // Close menu on outside click / ESC
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                btnRef.current &&
                !btnRef.current.contains(e.target)
            ) {
                setMenuOpen(false)
            }
        }

        function handleEsc(e) {
            if (e.key === "Escape") setMenuOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEsc)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEsc)
        }
    }, [menuOpen])

    return (
        <div className="flex items-center justify-center mr-4">
            {/* Logout Confirm Modal */}
            {isLogoutConfirmOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">

                    {/* Modal Card */}
                    <div className="w-[340px] bg-primary rounded-2xl shadow-2xl p-6 flex flex-col gap-6 transform transition-all duration-300 scale-100 animate-scaleIn">

                        {/* Title Section */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-secondary">
                                Confirm Logout
                            </h2>
                            <p className="text-sm text-secondary/70 mt-2">
                                Are you sure you want to logout from your account?
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between gap-4">

                            {/* Cancel Button */}
                            <button
                                className="w-full py-2 rounded-lg border border-secondary text-secondary font-medium hover:bg-secondary hover:text-primary transition duration-200"
                                onClick={() => setIsLogoutConfirmOpen(false)}
                            >
                                Cancel
                            </button>

                            {/* Logout Button */}
                            <button
                                className="w-full py-2 rounded-lg bg-accent text-white font-medium shadow-md hover:scale-105 hover:shadow-lg transition duration-200"
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.href = "/login"
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Loading */}
            {loading && (
                <div className="w-[30px] h-[30px] border-[3px] border-accent border-t-transparent rounded-full animate-spin"></div>
            )}

            {/* Logged User */}
            {user && (
                <div
                    className="
                        relative
                        flex items-center gap-2
                        bg-primary px-2 py-1
                        rounded-full
                        shadow-sm hover:shadow-md
                        transition
                        mr-4
                    "
                >
                    {/* Avatar */}
                    <img
                        src={user.image}
                        alt="User"
                        className="w-[40px] h-[40px] rounded-full border-[2px] border-accent object-cover"
                    />

                    {/* Name */}
                    <span className="text-secondary text-sm font-medium whitespace-nowrap">
                        {user.firstName}
                    </span>

                    {/* Menu Button */}
                    <button
                        ref={btnRef}
                        onClick={() => setMenuOpen((v) => !v)}
                        className="text-secondary text-sm px-1 outline-none"
                    >
                        ▼
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div
                            ref={menuRef}
                            className="
            absolute right-0 top-[60px]
            w-[220px]
            bg-primary/95 backdrop-blur-md
            rounded-2xl
            shadow-2xl
            border border-secondary/10
            z-50
            overflow-hidden
            animate-dropdownIn
        "
                        >
                            {/* Account Settings */}
                            <button
                                className="
                w-full text-left px-5 py-3 text-sm font-medium
                text-secondary
                hover:bg-secondary/5
                transition duration-200
            "
                                onClick={() => {
                                    setMenuOpen(false)
                                    window.location.href = "/settings"
                                }}
                            >
                                Account Settings
                            </button>

                            {/* Orders */}
                            <button
                                className="
                w-full text-left px-5 py-3 text-sm font-medium
                text-secondary
                hover:bg-secondary/5
                transition duration-200
            "
                                onClick={() => {
                                    setMenuOpen(false)
                                    window.location.href = "/orders/my"
                                }}
                            >
                                My Orders
                            </button>

                            {/* Divider */}
                            <div className="mx-4 h-[1px] bg-secondary/10"></div>

                            {/* Logout */}
                            <button
                                className="
                w-full text-left px-5 py-3 text-sm font-semibold
                text-accent
                hover:bg-accent/10
                transition duration-200
            "
                                onClick={() => {
                                    setMenuOpen(false)
                                    setIsLogoutConfirmOpen(true)
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>
            )}

            {/* Not Logged In */}
            {!loading && user == null && (
                <a
                    href="/login"
                    className="
                        bg-accent text-secondary
                        px-4 py-2
                        rounded-full
                        text-sm font-medium
                        hover:bg-secondary hover:text-white
                        transition
                        mr-4
                    "
                >
                    Login
                </a>
            )}
        </div>
    )
}
