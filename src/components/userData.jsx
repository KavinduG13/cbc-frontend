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
                <div className="fixed z-[120px] w-full h-screen top-0 left-0 bg-black/30">
                    <div className="w-[300px] h-[150px] bg-primary rounded-lg p-4 flex flex-col justify-between items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <span className="text-lg text-secondary">
                            Are you sure you want to logout?
                        </span>
                        <div className="w-full flex justify-around">
                            <button
                                className="bg-accent text-white px-4 rounded hover:bg-secondary transition"
                                onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.href = "/login"
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-accent text-white px-4 rounded hover:bg-secondary transition"
                                onClick={() => setIsLogoutConfirmOpen(false)}
                            >
                                No
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
                                absolute right-0 top-[55px]
                                w-[180px]
                                bg-white
                                rounded-lg
                                shadow-lg
                                z-50
                                overflow-hidden
                            "
                        >
                            <button
                                className="w-full text-left px-4 py-2 text-sm hover:bg-primary text-secondary"
                                onClick={() => {
                                    setMenuOpen(false)
                                    window.location.href = "/settings"
                                }}
                            >
                                Account Settings
                            </button>

                            <button
                                className="w-full text-left px-4 py-2 text-sm hover:bg-primary text-secondary"
                                onClick={() => {
                                    setMenuOpen(false)
                                    window.location.href = "/orders"
                                }}
                            >
                                Orders
                            </button>

                            <div className="h-[1px] bg-secondary/10"></div>

                            <button
                                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"
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
