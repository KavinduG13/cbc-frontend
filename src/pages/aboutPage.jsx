export default function AboutPage() {
    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex flex-col items-center justify-center gap-4 bg-[url('/about-bg.jpg')] bg-cover bg-center">
            <h1 className="text-4xl font-bold text-secondary">About Us</h1>
            <p className="text-lg text-secondary/80 max-w-2xl text-center">
                Welcome to our e-commerce store! We are passionate about providing you with the best shopping experience possible. Our mission is to offer a wide range of high-quality products at competitive prices, all while delivering exceptional customer service. Whether you're looking for the latest gadgets, stylish fashion, or unique home decor, we've got you covered. Thank you for choosing us as your go-to online shopping destination!
            </p>
        </div>
    )
}