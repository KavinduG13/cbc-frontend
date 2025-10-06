import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useParams } from "react-router-dom"
import { Loader } from "../components/loader"
import ImageSlider from "../components/imageSlider"
import { addToCart, loadCart } from "../utils/cart"

export default function ProductOverview() {

    const params = useParams()
    // Loading, Success, Error
    const [status, setStatus] = useState("Loading")
    const [product, setProduct] = useState(null)

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then(
                (res) => {
                    setProduct(res.data)
                    setStatus("Success")
                }
            ).catch(
                () => {
                    toast.error("Failed to load product details")
                    setStatus("Error")
                }
            )
        }
        , [])

    return (
        <div className="w-full h-[calc(100vh-100px)] text-secondary">
            {
                status == "Loading" && <Loader />
            }
            {
                status == "Success" && (<div className="w-full h-full flex">
                    <div className="w-[50%] h-full flex justify-center items-center">
                        <ImageSlider images={product.images} />
                    </div>
                    <div className="w-[50%] h-full flex flex-col p-10 gap-4 items-center">
                        <span className="">{product.productID}</span>
                        <h1 className="text-2xl font-bold text-center">{product.name}
                            {
                                product.altNames.map(
                                    (name, index) => {
                                        return (
                                            <span key={index} className="font-normal text-secondary/70"> {" | " + name}</span>
                                        )
                                    }
                                )
                            }
                        </h1>
                        {/* description */}
                        <p className="mt-[30px] text-secondary/70 text-justify">{product.description}</p>
                        {/* category */}
                        <p>Category: {product.category}</p>
                        {/* price */}
                        {
                            product.labelledPrice > product.price ?
                                <div className="flex gap-3 items-center">
                                    <p className="text-lg text-secondary font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
                                    <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                                </div> :
                                <p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
                        }
                        <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                            <button className="w-full h-full bg-accent text-white font-semibold rounded hover:bg-accent/90 transition"
                            onClick={()=>{
                                addToCart(product, 1)
                                toast.success("Added to cart")
                            }}>Add to Cart</button>
                            <Link to="/checkout" state={[{
                                image: product.images[0],
                                name: product.name,
                                productID: product.productID,
                                price: product.price,
                                labelledPrice: product.labelledPrice,
                                quantity: 1
                            }]} className="w-full h-full text-center bg-secondary text-white font-semibold rounded hover:bg-secondary/90 transition"
                            >Buy Now</Link>
                        </div>
                    </div>
                </div>)
            }
            {
                status == "Error" && <h1 className="text-red-500">Failed to load product details</h1>
            }
        </div>
    )
}