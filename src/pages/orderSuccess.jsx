export default function OrderSuccessPage() {
    return (
        <div className="min-h-screen bg-[var(--color-primary)] px-4 md:px-10 xl:px-20 py-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-[var(--color-secondary)] mb-4">
                Order Placed Successfully!
            </h1>
            <p className="text-gray-500 text-center mb-10">
                Thank you for your purchase. Your order has been placed and is being processed. You can track your order in the "My Orders" section.
            </p>
            <a href="/orders/my" className="bg-accent text-white font-semibold px-[20px] py-[10px] rounded-md hover:bg-accent/80">
                View My Orders
            </a>
        </div>
    )
}