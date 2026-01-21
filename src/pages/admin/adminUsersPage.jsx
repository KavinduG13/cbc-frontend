import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { Loader } from "../../components/loader"
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md"

function UserBlockConfirm(props) {
    const email = props.user.email;
    const close = props.close;
    const refresh = props.refresh;
    function blockUser() {
        const token = localStorage.getItem("token");
        axios
            .put(import.meta.env.VITE_API_URL + "/api/users/block/" + email, {
                isBlocked: !props.user.isBlocked
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data);
                close();
                toast.success("User block status changed successfully");
                refresh();
            }).catch(() => {
                toast.error("Failed to change user block status");
            })
    }

    return (
        <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
            <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
                <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border-red-600 hover:bg-white hover:text-red-600">
                    X
                </button>
                <p className="text-xl font-semibold text-center">Are you sure you want to {props.user.isBlocked ? "unblock" : "block"} the user with email: {email}?</p>
                <div className="flex gap-[40px]">
                    <button onClick={close} className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent">
                        Cancel
                    </button>
                    <button onClick={blockUser} className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false)
    const [userToBlock, setUserToBlock] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token")
            if (token == null) {
                toast.error("Please login to access the admin panel")
                navigate("/login")
                return;
            }

            axios
                .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data)
                    setUsers(response.data)
                    setIsLoading(false)
                })
        }
    }, [isLoading])

    return (
        <div className="w-full min-h-full">
            {isBlockConfirmVisible && (
				<UserBlockConfirm
					refresh={() => {
						setIsLoading(true);
					}}
					user={userToBlock}
					close={() => {
						setIsBlockConfirmVisible(false);
					}}
				/>
			)}
            <div className="mx-auto max-w-7xl">
                {/* Card shell */}
                <div className="rounded-2xl border border-secondary/15 bg-white shadow-sm overflow-hidden">
                    {/* Header bar */}
                    <div className="flex items-center justify-between gap-4 px-5 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white">
                        <h2 className="text-base md:text-lg font-semibold tracking-wide">
                            Users
                        </h2>
                        <div className="hidden md:flex items-center gap-2 text-xs opacity-90">
                            <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                            <span>Admin view</span>
                        </div>
                    </div>

                    {/* Scroll container for table */}
                    <div className="overflow-x-auto">
                        {isLoading ? <Loader /> :
                            <table className="w-full border-spacing-0">
                                <thead className="bg-secondary/95 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Image</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">First Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Last Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Role</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider uppercase">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-secondary/10">
                                    {users.map((user) => {
                                        return (
                                            <tr
                                                key={user.email}
                                                className="bg-white even:bg-primary/40 hover:bg-accent/10 transition-colors">
                                                <td className="px-4 py-3">
                                                    <div className="h-16 w-16 overflow-hidden rounded-full ring-1 ring-secondary/10 shadow-sm">
                                                        <img
                                                            src={user.image}
                                                            referrerPolicy="no-referrer"  // to handle potential CORS issues (Google userslage images thiyenne google eke store wela nisa)
                                                            alt={user.firstName}
                                                            className={"h-16 w-16 rounded-full object-cover border-2 p-1" + (user.isBlocked ? " border-red-600" : " border-green-600")} />
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                    <div className="flex items-center gap-1">
                                                        {user.email} {user.isEmailVerified && <MdVerified color="blue" />}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 align-middle">
                                                    <div className="font-medium text-secondary">
                                                        {user.firstName}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 align-middle">
                                                    <div className="font-medium text-secondary">
                                                        {user.lastName}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                    <div className="flex items-center gap-2">
                                                        <p className="">
                                                            {
                                                                user.role == "admin" && <MdOutlineAdminPanelSettings />
                                                            }
                                                        </p>
                                                        {user.role}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-3 align-middle">
                                                    <div className="flex flex-row gap-3 justify-center items-center">
                                                        {
                                                            <button
                                                                onClick={() => {
                                                                    setUserToBlock(user)
                                                                    setIsBlockConfirmVisible(true)
                                                                }}
                                                                className="w-[80px] h-[40px] bg-accent text-white hover:text-secondary rounded-full cursor-pointer">
                                                                {user.isBlocked ? "Unblock" : "Block"}
                                                            </button>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>}
                    </div>

                    {/* Footer accent line */}
                    <div className="h-1 w-full bg-accent/80" />
                </div>
            </div>
        </div>
    )
}
