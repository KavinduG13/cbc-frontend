import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModel({
    isModelOpen,
    selectedOrder,
    closeModel,
    refresh,
}) {
    const [status, setStatus] = useState(selectedOrder?.status)
    if (!isModelOpen || !selectedOrder) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-primary rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="relative flex items-center justify-between px-6 py-4 bg-secondary text-white">

                    {/* Left: Order ID + Status */}
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">
                            Order #{selectedOrder.orderID}
                        </h3>

                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-secondary">
                            {selectedOrder.status}
                        </span>
                    </div>

                    {/* Right: Close button */}
                    <button
                        onClick={closeModel}
                        className="absolute right-4 top-4 text-white/80 hover:text-red-600 text-xl font-bold transition"
                        aria-label="Close model">
                        ✕
                    </button>
                </div>

                {/* Date below header */}
                <div className="px-6 py-2 bg-secondary text-white text-xs">
                    {new Date(selectedOrder.date).toLocaleString()}
                </div>


                {/* Body */}
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <Info label="Customer" value={selectedOrder.customerName} />
                        <Info label="Email" value={selectedOrder.email} />
                        <Info label="Phone" value={selectedOrder.phone} />
                        <Info label="Address" value={selectedOrder.address} />
                    </div>

                    {/* Items */}
                    <div>
                        <h4 className="font-semibold text-secondary mb-3">
                            Order Items
                        </h4>

                        <div className="space-y-3">
                            {selectedOrder.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 items-center bg-white rounded-xl p-3 border border-secondary/10"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg border"
                                    />

                                    <div className="flex-1">
                                        <p className="font-medium text-secondary">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-secondary/70">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <div className="text-sm font-semibold text-secondary">
                                        LKR {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center border-t pt-4">
                        <span className="font-semibold text-secondary">Total</span>
                        <span className="text-lg font-bold text-secondary">
                            LKR {selectedOrder.total.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t bg-white">
                    <select
                        className="w-full px-4 py-2 rounded-lg border border-secondary/30 bg-primary text-secondary text-sm font-medium outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 hover:border-secondary/50" defaultValue="pending"
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <button
                        onClick={() => {
                            const token = localStorage.getItem("token")
                            axios.put(
                                `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                                { status: status },
                                { headers: { Authorization: `Bearer ${token}`}}
                            )
                            .then(() => {
                                toast.success("Order status updated")
                                closeModel()
                                refresh()
                            })
                            .catch((err) => {
                                console.error(err)
                                toast.error("Failed to update order status")
                            })
                        }}
                        disabled={status == selectedOrder.status}
                        className="px-5 py-2 rounded-lg border border-secondary/30 text-secondary text-sm font-medium hover:bg-accent"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

/* Small reusable label/value block */
function Info({ label, value }) {
    return (
        <div>
            <p className="text-secondary/70 text-xs">{label}</p>
            <p className="font-medium text-sm">{value}</p>
        </div>
    );
}

/* Prop validation (optional but professional) */
OrderDetailsModel.propTypes = {
    isModelOpen: PropTypes.bool.isRequired,
    selectedOrder: PropTypes.object,
    closeModel: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
};
