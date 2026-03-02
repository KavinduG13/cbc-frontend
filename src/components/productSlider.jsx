import { useEffect, useState } from "react"
import slide1 from "../assets/slide1.png"
import slide2 from "../assets/slide2.png"
import slide3 from "../assets/slide3.png"
import axios from "axios"
import { Loader } from "./loader"
import ProductCard from "./productCard"
import toast from "react-hot-toast"
import Footer from "./footer"

export default function ProductSlider() {

    const images = [slide1, slide2, slide3]

    const [activeImage, setActiveImage] = useState(0)
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // Auto Slide
    useEffect(() => {
        if (images.length === 0) return

        const interval = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [images.length])

    // Fetch Products
    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/products")
                .then((response) => {
                    setProducts(response.data.slice(0, 4))
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error("Error fetching products:", error)
                    setIsLoading(false)
                    toast.error("Failed to load products")
                })
        }
    }, [isLoading])

    return (
        <div className="w-full">

            {/* ================= HERO SLIDER ================= */}
            <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">

                {/* Images */}
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="Slide"
                        className={`absolute inset-0 w-full h-full object-center transition-opacity duration-1000 ease-in-out 
                        ${activeImage === index ? "opacity-100" : "opacity-0"}`}
                    />
                ))}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

                {/* Hero Content (Optional Text) */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                        Discover Premium Products
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
                        Quality, trust and elegance in every purchase.
                    </p>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-6 w-full flex justify-center gap-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`h-3 rounded-full transition-all duration-300 
                            ${activeImage === index
                                    ? "w-10 bg-accent"
                                    : "w-3 bg-white/60 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* ================= PRODUCT SECTION ================= */}
            <div className="max-w-7xl mx-auto px-6 mt-16">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                        Featured Products
                    </h2>
                    <div className="w-20 h-1 bg-accent mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Products */}
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((item) => (
                            <ProductCard
                                key={item.productID}
                                product={item}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Extra spacing bottom */}
            <div className="h-16"></div>
            
            <Footer />
        </div>
    )
}
