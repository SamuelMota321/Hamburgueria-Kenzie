export const ProductCard = ({ product, addToCart, cartList, styles }) => {
    const isProductInCart = cartList.some(item => item.id === product.id)

    const handleAddToCart = () => {
        if (isProductInCart) {
            const updatedCart = cartList.map(item => {
                if (item.id === product.id) {
                    item.quantity += 1
                }
                return item
            })
            addToCart(updatedCart)
        } else {
            addToCart([...cartList, { ...product, quantity: 1 }])
        }
    }

    return (
        <li className={styles.card}>
            <div className={styles.imgBack}>
                <img src={product.img} alt={product.name} />
            </div>
            <div>
                <h3 className="title sm">{product.name}</h3>
                <span>{product.category}</span>
                <span className=" highlight">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                <button onClick={handleAddToCart} className="btn">Adicionar</button>
            </div>
        </li>
    )
}
