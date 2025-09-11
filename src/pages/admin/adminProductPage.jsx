import axios from "axios"
import { useEffect, useState } from "react"
import { CiCirclePlus } from "react-icons/ci"
import { FaRegEdit } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"
import { Link } from "react-router-dom"

export default function AdminProductPage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products").then((response) => {
            console.log(response.data)
            setProducts(response.data)
        })
    }, [])

    return (
        <div className="w-full h-full p-6 bg-primary/60">
            <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl">
                <CiCirclePlus className="hover:text-accent" />
            </Link>
            <div className="mx-auto max-w-7xl">
                {/* Card shell */}
                <div className="rounded-2xl border border-secondary/15 bg-white shadow-sm overflow-hidden">
                    {/* Header bar */}
                    <div className="flex items-center justify-between gap-4 px-5 py-4 bg-gradient-to-r from-secondary to-secondary/90 text-white">
                        <h2 className="text-base md:text-lg font-semibold tracking-wide">
                            Products
                        </h2>
                        <div className="hidden md:flex items-center gap-2 text-xs opacity-90">
                            <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
                            <span>Admin view</span>
                        </div>
                    </div>

                    {/* Scroll container for table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-spacing-0">
                            <thead className="bg-secondary/95 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Image</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Product ID</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Product Name</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Product Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Labelled Price</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase">Category</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold tracking-wider uppercase">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-secondary/10">
                                {products.map((item) => {
                                    return (
                                        <tr
                                            key={item.productID}
                                            className="bg-white even:bg-primary/40 hover:bg-accent/10 transition-colors"
                                        >
                                            <td className="px-4 py-3">
                                                <div className="h-16 w-16 overflow-hidden rounded-xl ring-1 ring-secondary/10 shadow-sm">
                                                    <img
                                                        src={item.images[0]}
                                                        className="h-16 w-16 object-cover"
                                                        alt={item.name}
                                                    />
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.productID}
                                            </td>

                                            <td className="px-4 py-3 align-middle">
                                                <div className="font-medium text-secondary">
                                                    {item.name}
                                                </div>
                                                {/* subtle secondary line for accessibility */}
                                                <div className="text-xs text-secondary/60">SKU #{item.productID}</div>
                                            </td>

                                            <td className="px-4 py-3 align-middle">
                                                <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-2.5 py-1 text-xs font-medium text-secondary">
                                                    {item.price}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 align-middle text-sm text-secondary/90">
                                                {item.lablledPrice}
                                            </td>

                                            <td className="px-4 py-3 align-middle">
                                                <span className="inline-flex items-center rounded-full bg-secondary/5 px-2.5 py-1 text-xs font-medium text-secondary">
                                                    {item.category}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3 align-middle">
                                                <div className="flex flex-row gap-3 justify-center items-center">
                                                    <button
                                                        type="button"
                                                        title="Delete"
                                                        className="inline-flex items-center justify-center rounded-full p-2 ring-1 ring-secondary/15 text-secondary/80 hover:text-red-600 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition"
                                                    >
                                                        <FaRegTrashCan className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Edit"
                                                        className="inline-flex items-center justify-center rounded-full p-2 ring-1 ring-secondary/15 text-secondary/80 hover:text-accent hover:bg-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition"
                                                    >
                                                        <FaRegEdit className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer accent line */}
                    <div className="h-1 w-full bg-accent/80" />
                </div>
            </div>
        </div>
    )
}
