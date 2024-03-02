import styles from './ProductList.module.css';
import Product from '../product/Product';
import { useSelector } from 'react-redux';


const ProductList = () => {
  const products = useSelector((state) => state.product.filtredList);

  return (
    <div className={styles.products}>
      {products &&
        products.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              product={product.product}
              price={product.price}
              brand={product.brand}
            />
          );
        })}
    </div>
  );
};

export default ProductList;
