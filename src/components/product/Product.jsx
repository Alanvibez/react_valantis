import styles from './Product.module.css';

const Product = ({ id, product, price, brand }) => {
  return (
    <div className={styles.product}>
      <p className={styles.name}>Название: {product}</p>
      <p className={styles.price}>Цена: {price ?? 'null'}</p>
      <p className={styles.brand}>Бренд: {brand ?? 'null'}</p>
      <p className={styles.id}>ID: {id}</p>
    </div>
  );
};

export default Product;
