import { useState } from "react"
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload"
import toast from "react-hot-toast"
import axios from "axios"

export default function AddProductPage() {

    const [productId, setProdictId] = useState("")
    const [name, setName] = useState("")
    const [altNames, setAltNames] = useState([""])
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const [price, setPrice] = useState(0)
    const [labelledPrice, setLabelledPrice] = useState(0)
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()

    async function addProduct() {
        const token = localStorage.getItem("token")
        if (token == null) {
            navigate("/login")
            return
        }

        const promises = []
        for (let i = 0; i < images.length; i++) {
            promises[i] = mediaUpload(images[i])
        }
        try {
            const urls = await Promise.all(promises)
            const alternativeNames = altNames.split(",")
            const product = {
                productID: productId,
                name: name,
                altNames: alternativeNames,
                description: description,
                images: urls,
                price: price,
                labelledPrice: labelledPrice,
                category: category,
                stock: stock
            }

            await axios.post(import.meta.env.VITE_API_URL+"/api/products",product,{
				headers:{
					Authorization : "Bearer "+token
				}
			})
			toast.success("Product added successfully");
			navigate("/admin/products");

		} catch {
			toast.error("An error occurred");
		}

	}

    return (
        <div className="min-h-screen w-full bg-primary flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl border-2 border-accent rounded-2xl bg-white/90 shadow-xl flex flex-col">
                <div className="p-6 border-b border-accent/40">
                    <h1 className="text-2xl font-semibold text-secondary">Add Product</h1>
                    <p className="text-sm text-secondary/70 mt-1">
                        Fill the product details below. Images can be uploaded as multiple files.
                    </p>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-secondary flex-1">
                    {/* Product ID */}
                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label className="text-sm font-medium">Product ID</label>
                        <input
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder="e.g., CBC-0012"
                            value={productId}
                            onChange={(e) => { setProdictId(e.target.value) }} />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-2 md:col-span-1">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder="e.g., Crystal Glow Serum"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    {/* Alt Names */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium">Alternative Names</label>
                        <input
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder='e.g., "Glow Booster", "Vitamin C Serum"'
                            value={altNames}
                            onChange={(e) => { setAltNames(e.target.value) }} />
                        <p className="text-xs text-secondary/60">Tip: comma-separated is okay.</p>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="min-h-[120px] rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder="Short description of the product..."
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }} />
                    </div>

                    {/* Images */}
                    <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-sm font-medium">Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => { setImages(e.target.files) }}
                            className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium file:text-secondary hover:file:opacity-90 cursor-pointer text-secondary" />
                        <p className="text-xs text-secondary/60">You can select multiple images.</p>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Price</label>
                        <input
                            type="number"
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }} />
                    </div>

                    {/* Labelled Price */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Labelled Price</label>
                        <input
                            type="number"
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder="0.00"
                            value={labelledPrice}
                            onChange={(e) => { setLabelledPrice(e.target.value) }} />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Category</label>
                        <select
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}>
                            <option value="" disabled>Select a category</option>
                            <option value="Cream">Cream</option>
                            <option value="Lotion">Lotion</option>
                            <option value="Serum">Serum</option>
                            <option value="Powder">Powder</option>
                            <option value="Skin-care">Skin Care</option>
                            <option value="Eye-care">Eye Care</option>
                        </select>
                    </div>

                    {/* Stock */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Stock</label>
                        <input
                            type="number"
                            className="w-full rounded-xl bg-primary/60 border border-accent/60 px-3 py-2 outline-none focus:ring-2 focus:ring-accent placeholder:text-secondary/50"
                            placeholder="0"
                            value={stock}
                            onChange={(e) => { setStock(e.target.value) }} />
                    </div>
                </div>

                {/* Footer with Cancel + Submit Buttons */}
                <div className="px-6 py-4 bg-primary/60 rounded-b-2xl border-t border-accent/30 flex justify-between items-center">
                    <span className="text-xs text-secondary/70">
                        Data will be submitted by your existing logic.
                    </span>

                    {/* Group buttons together with controlled spacing */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => {
                            navigate("/admin/products")
                        }}
                            type="button"
                            className="px-6 py-2 rounded-xl bg-[#FF000050] text-secondary h-[40px] w-[100px] font-semibold hover:opacity-90 focus:ring-2 focus:ring-accent transition">
                            Cancel
                        </button>
                        <button onClick={addProduct}
                            type="button"
                            className="px-6 py-2 rounded-xl bg-accent text-secondary h-[40px] w-[100px] font-semibold hover:opacity-90 focus:ring-2 focus:ring-accent transition">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
