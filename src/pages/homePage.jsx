import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import ProductSlider from "../components/productSlider";
import AboutPage from "./aboutPage";
import ContactPage from "./contactPage";
import OrdersPage from "./ordersPage";
import OrderSuccessPage from "./orderSuccess";

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary">
            <Header />
            <Routes path="/">
                <Route path="/" element={<ProductSlider />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/overview/:id" element={<ProductOverview />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders/my" element={<OrdersPage  />} />
                <Route path="/orders/success" element={<OrderSuccessPage />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    )
}