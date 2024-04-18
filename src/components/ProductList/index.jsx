import { ProductCard } from "./ProductCard"
import styles  from './styles.module.scss'
export const ProductList = ({ productList, addToCart, cartList }) => {



   return (
      <section className="container">
         <ul className={styles.productList}>
            {productList.map((product) => (
               <ProductCard key={product.id} 
               product={product} 
               addToCart={addToCart} 
               cartList={cartList}
               styles={styles} />
            ))}
         </ul>
      </section>
   )
}
