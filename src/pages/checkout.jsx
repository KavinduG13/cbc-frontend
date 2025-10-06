import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci"
import { BiTrash } from "react-icons/bi"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function CheckoutPage() {

    const location = useLocation()
    const [cart, setCart] = useState(location.state)

    function getTotal() {
        let total = 0
        cart.forEach(
            (item) => {
                total += item.price * item.quantity
            }
        )
        return total
    }

    return (
        <div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center">
            <div className="w-[600px] flex flex-col  gap-4">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-full h-[120px] bg-white flex relative items-center">
                                <button className="absolute right-[-40px] text-red-500 text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px]" onClick={
                                    () => {
                                        
                                    }
                                }><BiTrash /></button>
                                <img className="h-full aspect-square object-cover" src={item.image} />
                                <div className="w-[200px] h-full flex flex-col pl-[5px] pt-[10px]">
                                    {/* name */}
                                    <h1 className="font-semibold text-lg w-full text-wrap">{item.name}</h1>
                                    {/* productID */}
                                    <span className="text-sm text-secondary/70">{item.productID}</span>
                                </div>
                                <div className="w-[100px] h-full flex flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-3xl" onClick={
                                        () => {
                                            const newCart = [...cart]   // create a copy of the cart array
                                            newCart[index].quantity += 1    // modify the copy by increasing the quantity of the item at the current index
                                            setCart(newCart)    // update the state with the new array, then the setCart knows that the variable has changed and re-renders the component
                                        }
                                    } />
                                    <span className="font-semibold text-4xl">{item.quantity}</span>
                                    <CiCircleChevDown className="text-3xl" onClick={
                                        () => {
                                            const newCart = [...cart]

                                            if (newCart[index].quantity > 1) {
                                                newCart[index].quantity -= 1        // decreasing the quantity if and only if it's more than 1
                                            }
                                            setCart(newCart)
                                        }
                                    } />
                                </div>
                                <div className="w-[180px] h-full flex flex-col">
                                    {
                                        item.labelledPrice > item.price &&
                                        <span className="text-secondary w-full line-through text-right text-lg pr-[10px] mt-[20px]">LKR {item.labelledPrice.toFixed(2)}</span>
                                    }
                                    <span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">LKR {item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
                    <button to="/checkout" className="absolute left-0 bg-accent text-white font-semibold px-[20px] py-[10px] rounded-md hover:bg-accent/80 ml-[10px]">Order Now</button>
                    <div className="h-[50px]">
                        <span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">Total: LKR {getTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}