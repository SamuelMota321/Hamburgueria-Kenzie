import { MdDelete } from "react-icons/md"

export const CartItemCard = ({ product, removeFromCart, handleAddQuantity, handleRemoveQuantity, styles }) => {

   return (
      <li className={styles.card}>
         <img src={product.img} alt={product.name} />
         <div className={styles.cardTxt}>
            <h3 className="title">{product.name}</h3>
            <p className="highlight">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
         </div>
         <div className={styles.cardBtns}>
            <button onClick={() => handleRemoveQuantity(product)}>-</button>
            <p>{product.quantity}</p>
            <button onClick={() => handleAddQuantity(product)}>+</button>

            <button aria-label="delete" title="Remover item" onClick={() => removeFromCart(product.id)}>
               <MdDelete size={21} />
            </button>
         </div>
      </li>
   )
}
