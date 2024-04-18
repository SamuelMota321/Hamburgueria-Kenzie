import { useEffect, useState } from "react"
import { CartModal } from "../../components/CartModal"
import { Header } from "../../components/Header"
import { ProductList } from "../../components/ProductList"
import { api } from "../../services/api.js"

export const HomePage = () => {
   const [productList, setProductList] = useState([])
   const [cartList, setCartList] = useState([])
   const [isCartOpen, setIsCartOpen] = useState(false)

   useEffect(() => {
      const getList = async () => {
         const { data } = await api.get("products")
         setProductList(data)
      }
      getList()
      loadCartFromLocalStorage() 
   }, [])

   useEffect(() => {
      saveLocalStorage(cartList)
   }, [cartList])

   const loadCartFromLocalStorage = () => {
      const cartItems = localStorage.getItem("cartList")
      if (cartItems) {
         setCartList(prevCartList => [...prevCartList, ...JSON.parse(cartItems)])
      }
   }
   
   const saveLocalStorage = (cartItems) => {
      localStorage.setItem("cartList", JSON.stringify(cartItems))
   }
   
   const toggleCart = () => {
      setIsCartOpen(!isCartOpen)
   }

   const addToCart = (product) => {
      setCartList(product)
   }

   const removeFromCart = (productId) => {
      setCartList(cartList.filter(item => item.id !== productId))
   }

   const clearCart = () => {
      setCartList([])
   }

   const handleAddQuantity = (product) => {
      const updatedProduct = cartList.map(item => {
         if (item.id === product.id) {
            item.quantity += 1
         }
         return item
      })
      setCartList(updatedProduct)
   }

   const handleRemoveQuantity = (product) => {
      if (product.quantity === 1) {
         return removeFromCart(product.id)
      }
      const updatedProduct = cartList.map(item => {
         if (item.id === product.id) {
            item.quantity -= 1
         }
         return item
      })
      setCartList(updatedProduct)
   }

   return (
      <>
         <Header
            toggleCart={toggleCart}
            cartList={cartList} />
         <main>
            <ProductList
               productList={productList}
               addToCart={addToCart}
               cartList={cartList}
            />
            {isCartOpen ? (
               <CartModal
                  cartList={cartList}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                  toggleCart={toggleCart}
                  handleAddQuantity={handleAddQuantity}
                  handleRemoveQuantity={handleRemoveQuantity}
               />
            ) : <></>}
         </main>
      </>
   )
}
