import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import {
    MdShoppingBag,
    MdPeople,
    MdInventory2,
    MdAttachMoney,
    MdTrendingUp,
    MdAccessTime,
    MdCheckCircle,
} from "react-icons/md"
import { Loader } from "../../components/loader"

// ─── helpers ────────────────────────────────────────────────────────────────

function groupOrdersByDay(orders) {
    const map = {}
    orders.forEach((o) => {
        const day = new Date(o.date ?? o.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        map[day] = (map[day] ?? 0) + 1
    })
    // keep chronological order
    return Object.entries(map)
        .map(([date, orders]) => ({ date, orders }))
        .slice(-14) // last 14 distinct days
}

function groupRevenueByDay(orders) {
    const map = {}
    orders.forEach((o) => {
        const day = new Date(o.date ?? o.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
        map[day] = (map[day] ?? 0) + (o.total ?? 0)
    })
    return Object.entries(map)
        .map(([date, revenue]) => ({ date, revenue: +revenue.toFixed(2) }))
        .slice(-14)
}

// ─── sub-components ─────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, accent }) {
    return (
        <div className="relative bg-white rounded-2xl shadow-sm border border-secondary/10 p-5 flex items-start gap-4 overflow-hidden group hover:shadow-md transition-shadow duration-300">
            {/* background blob */}
            <div
                className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: accent }}
            />
            <div
                className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-sm"
                style={{ backgroundColor: accent }}
            >
                <Icon />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary/50 mb-1">
                    {label}
                </p>
                <p className="text-2xl font-bold text-secondary leading-none">{value}</p>
                {sub && (
                    <p className="text-xs text-secondary/50 mt-1 truncate">{sub}</p>
                )}
            </div>
        </div>
    )
}

function SectionHeader({ title }) {
    return (
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white">
            <h2 className="text-base md:text-lg font-semibold tracking-wide">{title}</h2>
            <div className="hidden md:flex items-center gap-2 text-xs opacity-90">
                <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                <span>Admin view</span>
            </div>
        </div>
    )
}

function CustomTooltip({ active, payload, label, prefix = "", suffix = "" }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-secondary/10 rounded-xl shadow-lg px-4 py-3 text-sm">
                <p className="font-semibold text-secondary mb-1">{label}</p>
                <p className="text-accent font-bold">
                    {prefix}
                    {payload[0].value}
                    {suffix}
                </p>
            </div>
        )
    }
    return null
}

// ─── main component ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeChart, setActiveChart] = useState("orders") // "orders" | "revenue"

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return
        }
        const headers = { Authorization: `Bearer ${token}` }
        const base = import.meta.env.VITE_API_URL

        Promise.all([
            axios.get(`${base}/api/orders`, { headers }),
            axios.get(`${base}/api/users/all-users`, { headers }),
            axios.get(`${base}/api/products`),
        ])
            .then(([ordersRes, usersRes, productsRes]) => {
                setOrders(ordersRes.data)
                setUsers(usersRes.data)
                setProducts(productsRes.data)
            })
            .catch(() => {})
            .finally(() => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <div className="w-full h-full bg-primary/60 flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    // ── derived stats ──────────────────────────────────────────────────────
    const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0)
    const pendingOrders = orders.filter(
        (o) => o.status?.toLowerCase() === "pending"
    ).length
    const completedOrders = orders.filter(
        (o) => o.status?.toLowerCase() === "delivered" || o.status?.toLowerCase() === "completed"
    ).length
    const lowStock = products.filter((p) => (p.stock ?? 0) < 10).length

    const orderChartData = groupOrdersByDay(orders)
    const revenueChartData = groupRevenueByDay(orders)

    const chartData = activeChart === "orders" ? orderChartData : revenueChartData
    const chartKey = activeChart === "orders" ? "orders" : "revenue"
    const chartColor = "var(--color-accent)"

    // ── recent orders (latest 5) ───────────────────────────────────────────
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.date ?? b.createdAt) - new Date(a.date ?? a.createdAt))
        .slice(0, 5)

    const statusColor = (status = "") => {
        const s = status.toLowerCase()
        if (s === "delivered" || s === "completed") return "bg-green-100 text-green-700"
        if (s === "processing") return "bg-blue-100 text-blue-700"
        if (s === "cancelled") return "bg-red-100 text-red-700"
        return "bg-yellow-100 text-yellow-700"
    }

    return (
        <div className="w-full min-h-full p-4 md:p-6 bg-primary/60 space-y-6">

            {/* ── Page title ──────────────────────────────────────────────── */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-secondary">
                    Admin Dashboard
                </h1>
                <p className="text-secondary/50 text-sm mt-1">
                    Welcome back — here's what's happening today.
                </p>
            </div>

            {/* ── Stat cards ──────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={MdShoppingBag}
                    label="Total Orders"
                    value={orders.length}
                    sub={`${pendingOrders} pending`}
                    accent="#f59e0b"
                />
                <StatCard
                    icon={MdAttachMoney}
                    label="Total Revenue"
                    value={`LKR ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    sub="All time"
                    accent="#10b981"
                />
                <StatCard
                    icon={MdPeople}
                    label="Registered Users"
                    value={users.length}
                    sub={`${users.filter((u) => u.role === "admin").length} admins`}
                    accent="#6366f1"
                />
                <StatCard
                    icon={MdInventory2}
                    label="Products"
                    value={products.length}
                    sub={lowStock > 0 ? `${lowStock} low stock` : "Stock OK"}
                    accent="#ec4899"
                />
            </div>

            {/* ── Chart + quick stats row ──────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Chart card — takes 2/3 width on xl */}
                <div className="xl:col-span-2 rounded-2xl border border-secondary/10 bg-white shadow-sm overflow-hidden">
                    <SectionHeader title="Activity Over Time" />

                    {/* chart toggle */}
                    <div className="flex gap-2 px-5 pt-4">
                        {["orders", "revenue"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveChart(tab)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                                    activeChart === tab
                                        ? "bg-accent text-white shadow-sm"
                                        : "bg-secondary/5 text-secondary/60 hover:bg-secondary/10"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="px-2 pt-2 pb-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                    width={45}
                                />
                                <Tooltip
                                    content={
                                        <CustomTooltip
                                            prefix={activeChart === "revenue" ? "LKR " : ""}
                                            suffix={activeChart === "orders" ? " orders" : ""}
                                        />
                                    }
                                />
                                <Area
                                    type="monotone"
                                    dataKey={chartKey}
                                    stroke={chartColor}
                                    strokeWidth={2.5}
                                    fill="url(#areaGrad)"
                                    dot={{ r: 3, fill: chartColor, strokeWidth: 0 }}
                                    activeDot={{ r: 5, fill: chartColor }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-1 w-full bg-accent/80" />
                </div>

                {/* Quick stats panel — takes 1/3 width on xl */}
                <div className="rounded-2xl border border-secondary/10 bg-white shadow-sm overflow-hidden">
                    <SectionHeader title="Order Breakdown" />
                    <div className="p-5 space-y-4">
                        {[
                            {
                                label: "Completed",
                                count: completedOrders,
                                icon: MdCheckCircle,
                                color: "text-green-500",
                                bg: "bg-green-50",
                            },
                            {
                                label: "Pending",
                                count: pendingOrders,
                                icon: MdAccessTime,
                                color: "text-yellow-500",
                                bg: "bg-yellow-50",
                            },
                            {
                                label: "Processing",
                                count: orders.filter(
                                    (o) => o.status?.toLowerCase() === "processing"
                                ).length,
                                icon: MdTrendingUp,
                                color: "text-blue-500",
                                bg: "bg-blue-50",
                            },
                            {
                                label: "Cancelled",
                                count: orders.filter(
                                    (o) => o.status?.toLowerCase() === "cancelled"
                                ).length,
                                icon: MdShoppingBag,
                                color: "text-red-400",
                                bg: "bg-red-50",
                            },
                        ].map(({ label, count, icon: Icon, color, bg }) => (
                            <div key={label} className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
                                    <Icon className={`text-lg ${color}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-secondary">{label}</span>
                                        <span className="text-sm font-bold text-secondary">{count}</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-secondary/10 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${color.replace("text-", "bg-")}`}
                                            style={{
                                                width: orders.length
                                                    ? `${Math.round((count / orders.length) * 100)}%`
                                                    : "0%",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* avg order value */}
                    <div className="mx-5 mb-5 mt-1 rounded-xl bg-primary/60 p-4 text-center border border-secondary/10">
                        <p className="text-xs uppercase tracking-widest text-secondary/50 font-semibold mb-1">
                            Avg. Order Value
                        </p>
                        <p className="text-xl font-bold text-accent">
                            LKR{" "}
                            {orders.length
                                ? (totalRevenue / orders.length).toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  })
                                : "0.00"}
                        </p>
                    </div>

                    <div className="h-1 w-full bg-accent/80" />
                </div>
            </div>

            {/* ── Recent Orders table ──────────────────────────────────────── */}
            <div className="rounded-2xl border border-secondary/10 bg-white shadow-sm overflow-hidden">
                <SectionHeader title="Recent Orders" />
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary/95 text-white">
                            <tr>
                                {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map(
                                    (h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase"
                                        >
                                            {h}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/10">
                            {recentOrders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center py-10 text-secondary/40 text-sm"
                                    >
                                        No orders yet.
                                    </td>
                                </tr>
                            )}
                            {recentOrders.map((order) => (
                                <tr
                                    key={order.orderID ?? order._id}
                                    className="bg-white even:bg-primary/40 hover:bg-accent/10 transition-colors"
                                >
                                    <td className="px-4 py-3 text-sm text-secondary/70 font-mono">
                                        {(order.orderID ?? order._id ?? "").toString().slice(-8)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-secondary font-medium">
                                        {order.customerName ?? order.email ?? "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-secondary/70">
                                        {order.items?.length ?? 0}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-secondary">
                                        LKR {(order.total ?? 0).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status ?? "Unknown"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-secondary/60">
                                        {new Date(order.date ?? order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="h-1 w-full bg-accent/80" />
            </div>
        </div>
    )
}