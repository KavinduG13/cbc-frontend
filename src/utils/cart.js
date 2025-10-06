export function loadCart() {
    let cartString = localStorage.getItem("cart")  // "[item1, item2]" me wage string ekak thamai enne (localStorage eke cart kiyala value ekak thiyenawanm)

    if (cartString == null) {
        localStorage.setItem("cart", "[]") // eka naththam empty array ekak set karanawa
        cartString = "[]"
    }

    const cart = JSON.parse(cartString)  // string eka array ekakata convert karanawa
    return cart
}

export function addToCart(product, quantity) {
    let cart = loadCart()

    const existingItemIndex = cart.findIndex(
        (item) => {
            return item.productID == product.productID
        }
    )

    if (existingItemIndex == -1) {
        // item is not in the cart
        if (quantity < 1) {
            console.log("Quantity must be at least 1")
            return
        }

        const cartItem = {
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0]
        }
        cart.push(cartItem)

    } else {
        // item is already in the cart
        const existingItem = cart[existingItemIndex]
        const newQuantity = existingItem.quantity + quantity

        if (newQuantity < 1) {
            cart = cart.filter(
                (item) => {
                    return item.productID != product.productID
                }
            )
        } else {
            existingItem.quantity = newQuantity
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart))  // array eka string ekakata convert karala localStorage eke store karanawa using JSON.stringify
}

export function getTotal() {
    const cart = loadCart()
    let total = 0

    cart.forEach(
        (item) => {
            total += item.price * item.quantity
        }
    )
    return total
}