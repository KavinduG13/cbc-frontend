import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

export default function ProductOverview() {

    const params = useParams()
    // Loading, Success, Error
    const [status, setStatus] = useState("Loading")

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_API_URL + "/api/products/" + params.id).then(
                (res) => {
                    console.log(res.data)
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
        <div>Product Overview {params.id}</div>
    )
}