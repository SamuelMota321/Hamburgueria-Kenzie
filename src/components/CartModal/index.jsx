import { MdClose } from "react-icons/md"
import { CartItemCard } from "./CartItemCard"
import styles from './styles.module.scss'
import { useEffect, useRef } from "react"

export const CartModal = ({ cartList, removeFromCart, clearCart, toggleCart, handleAddQuantity, handleRemoveQuantity, }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + (product.price * product.quantity)
   }, 0)

   const modalRef = useRef(null)

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            toggleCart()
         }
      }

      const handleKeyPress = (event) => {
         if (event.key === 'Escape') {
            toggleCart()
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyPress)

      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
         document.removeEventListener('keydown', handleKeyPress)
      }
   }, [toggleCart])

   return (
      <div role="dialog" className={styles.modalOverlay}>
         <div ref={modalRef} className={styles.modalBox}>
            <div className={styles.cartHeader}>
               <h2 className=" title white">Carrinho de compras</h2>
               <button aria-label="close" title="Fechar" onClick={toggleCart}>
                  <MdClose size={21} />
               </button>
            </div>
            <div className={styles.cartList}>
               <ul>
                  {cartList.map((product) => (
                     <CartItemCard key={product.id}
                        product={product}
                        removeFromCart={removeFromCart}
                        cartList={cartList}
                        handleAddQuantity={handleAddQuantity}
                        handleRemoveQuantity={handleRemoveQuantity}
                        styles={styles}
                     />
                  ))}
               </ul>
            </div>
            <div className={styles.cartTotal}>
               <div>
                  <span>Total</span>
                  <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
               </div>
               <button onClick={clearCart}>Remover todos</button>
            </div>
         </div>
      </div>
   )
}
