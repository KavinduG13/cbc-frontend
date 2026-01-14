import axios from "axios"
import { useEffect, useState } from "react"

export default function UserData() {
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
            {
                isLogoutConfirmOpen && (
                    <div className="fixed z-[120px] w-full h-screen top-0 left-0 bg-black/30">
                        <div className="w-[300px] h-[150px] bg-primary rounded-lg p-4 flex flex-col justify-between items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                            <span className="text-lg text-secondary">Are you sure you want to logout?</span>
                            <div className="w-full flex justify-around">
                                <button className="bg-accent text-white px-4 rounded hover:bg-secondary transition" onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.href = "/login"
                                }}>Yes</button>
                                <button className="bg-accent text-white px-4 rounded hover:bg-secondary transition" onClick={() => {
                                    setIsLogoutConfirmOpen(false)
                                }}>No</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Loading */}
            {loading && (
                <div className="w-[30px] h-[30px] border-[3px] border-accent border-t-transparent rounded-full animate-spin"></div>
            )}

            {/* Logged User */}
            {user && (
                <div
                    className="
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

                    {/* Styled Dropdown */}
                    <div className="relative">
                        <select onChange={
                            (e) => {
                                if (e.target.value == "logout") {
                                    setIsLogoutConfirmOpen(true)
                                }
                            }
                        }
                            className="
                                appearance-none
                                w-[22px]
                                bg-transparent
                                text-secondary
                                cursor-pointer
                                outline-none
                                text-sm
                                pl-1
                                pr-4
                            "
                        >
                            <option></option>
                            <option>Account Settings</option>
                            <option>Orders</option>
                            <option value="logout">Logout</option>
                        </select>

                        {/* Custom Arrow */}
                        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-secondary text-xs">
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
