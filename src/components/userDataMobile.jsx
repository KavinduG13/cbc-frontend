import axios from "axios"
import { useEffect, useState } from "react"

export default function UserDataMobile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

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

    return (
        <div className="flex items-center justify-center mr-4">
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
                        flex items-center gap-2
                        bg-accent px-2 py-1
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
                        className="w-[40px] h-[40px] rounded-full border-[2px] border-primary object-cover"
                    />

                    {/* Name */}
                    <span className="text-secondary text-sm font-medium whitespace-nowrap">
                        {user.firstName}
                    </span>

                    {/* Styled Dropdown */}
                    <div className="relative w-[160px]">
                        <select
                            onChange={(e) => {
                                const value = e.target.value

                                if (value === "settings") {
                                    window.location.href = "/settings"
                                }

                                if (value === "orders") {
                                    window.location.href = "/orders/my"
                                }

                                if (value === "logout") {
                                    setIsLogoutConfirmOpen(true)
                                }
                            }}
                            className="
            appearance-none
            w-full
            bg-primary
            text-secondary
            border border-secondary/20
            rounded-xl
            px-4 py-2
            text-sm font-medium
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-accent/40
            focus:border-accent
            transition duration-200
            cursor-pointer
        "
                        >
                            <option value="">Menu</option>
                            <option value="settings">Account Settings</option>
                            <option value="orders">My Orders</option>
                            <option value="logout">Logout</option>
                        </select>

                        {/* Custom Arrow */}
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary/70 text-xs">
                            ▼
                        </span>
                    </div>

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
