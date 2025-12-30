import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderDetailsModel from "../../components/orderInfoModel";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if(isLoading) {
            const token = localStorage.getItem("token")
            if (token == null) {
                navigate("/login")
                return;
            }
            axios
            .get(import.meta.env.VITE_API_URL + "/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                console.log(response.data)
                setOrders(response.data)
                setIsLoading(false)
            })
        }   
    }, [isLoading])

    return (
        <div className="w-full h-full p-6 bg-primary/60">
            <OrderDetailsModel isModelOpen = {isModelOpen} closeModel={() => setIsModelOpen(false)} selectedOrder = {selectedOrder} refresh = {() =>{setIsLoading(true)}}/>
            <div className="mx-auto max-w-7xl">
                {/* Card shell */}
                <div className="rounded-2xl border border-secondary/15 bg-white shadow-sm overflow-hidden">
                    {/* Header bar */}
                    <div className="flex items-center justify-between gap-4 px-5 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white">
                        <h2 className="text-base md:text-lg font-semibold tracking-wide">
                            Orders
                        </h2>
                        <div className="hidden md:flex items-center gap-2 text-xs opacity-90">
                            <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                            <span>Admin view</span>
                        </div>
                    </div>

                    {/* Scroll container for table */}
                    <div className="overflow-x-auto">
                        {isLoading ? <Loader />:
                        <table className="w-full border-spacing-0">
                            <thead className="bg-secondary/95 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Order ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Number of Items</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Customer Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Email</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Phone</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Address</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Total</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Status</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider uppercase">Date</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-secondary/10">
                                {orders.map((item) => {
                                    return (
                                        <tr
                                            key={item.orderID}
                                            className="bg-white even:bg-primary/40 hover:bg-accent/10 transition-colors"
                                            onClick={() => {
                                                setSelectedOrder(item)
                                                setIsModelOpen(true)
                                            }}
                                            >
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.orderID}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.items.length}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.customerName}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.email}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.phone}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.address}
                                            </td>

                                            <td className="px-4 py-3 align-middle">
                                                {`LKR ${item.total.toFixed(2)}`}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.status}
                                            </td>
                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {new Date(item.date).toLocaleDateString()}
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
