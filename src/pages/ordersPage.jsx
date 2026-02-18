import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function OrdersPage(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])

    const product = props.product

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token")
            if (token == null) {
                toast.error("You are not logged in")
                return;
            }
            axios.get(import.meta.env.VITE_API_URL + "/api/orders/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    setOrders(res.data)
                    setIsLoading(false)
                })
                .catch(() => {
                    setIsLoading(false)
                    toast.error("Failed to load orders")
                })
        }
    }, [isLoading])

    return (
        <div className="min-h-screen bg-[var(--color-primary)] px-4 md:px-10 xl:px-20 py-10">

            {/* Page Title */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-[var(--color-secondary)]">
                    My Orders
                </h1>
                <p className="text-gray-500 mt-2">
                    Track your purchases and order history
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--color-accent)]"></div>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && orders.length === 0 && (
                <div className="text-center bg-white p-10 rounded-2xl shadow-md max-w-xl mx-auto">
                    <h2 className="text-xl font-semibold text-[var(--color-secondary)]">
                        No Orders Yet
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Looks like you haven't placed any orders.
                    </p>
                </div>
            )}

            {/* Orders List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-screen-2xl mx-auto lg:flex lg:flex-col">
                {!isLoading && orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-3xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl flex flex-col lg:w-[1350px]"
                    >
                        {/* Order Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1 min-w-0 pr-3">
                                <p className="font-semibold text-[var(--color-secondary)]">
                                    Order ID
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {order._id}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <span className="shrink-0 px-4 py-1 text-sm rounded-full bg-[var(--color-accent)] text-white font-medium shadow-sm">
                                {order.status}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="border-b mb-6"></div>

                        {/* Order Items */}
                        <div className="space-y-4 flex-1">
                            {order.items?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-center"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 xl:w-20 xl:h-20 object-cover rounded-xl border shrink-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-[var(--color-secondary)] truncate">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-[var(--color-secondary)] shrink-0">
                                        Rs. {item.price * item.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Total Section */}
                        <div className="mt-8 pt-6 border-t flex justify-between items-center">
                            <span className="text-lg font-semibold text-[var(--color-secondary)]">
                                Total
                            </span>
                            <span className="text-xl font-bold text-[var(--color-accent)]">
                                Rs. {order.total}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}