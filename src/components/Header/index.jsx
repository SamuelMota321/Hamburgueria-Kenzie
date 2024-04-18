import { useState } from "react"
import Logo from "../../assets/Logo.svg"
import { MdSearch, MdShoppingCart } from "react-icons/md"
import styles  from './styles.module.scss'

export const Header = ( { toggleCart , cartList } ) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue +  product.quantity
   }, 0)

   return (
      <header className={`${styles.header}`}>
         <div className="container">
         <img src={Logo} alt="Logo Kenzie Burguer" />
            <button onClick={toggleCart}>
                <MdShoppingCart size={21} />
                <span>{total}</span>
            </button>
         </div>
      </header>
   )
}
