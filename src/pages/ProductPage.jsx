import { useEffect, useState, useCallback } from 'react';
import Filter from '../components/filter/Filter';
import Pagination from '../components/pagination/Pagination';
import ProductList from '../components/product-list/ProductList';
import { getFilteredProducts, getAllProducts } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setTotal } from '../redux/slices/productSlice';
import styles from './ProductPage.module.css';
import Loader from '../components/loader/Loader';

const ProductPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const total = useSelector((state) => state.product.total);
  const { value, method } = useSelector((state) => state.product.filter);
  
  const handleNextPageClick = useCallback(() => {
    if (page < total) setPage((prev) => prev + 1);
  }, [page, total]);

  const handlePrevPageClick = useCallback(() => {
    if (page > 1) setPage((prev) => prev - 1);
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getFilteredProducts(page, method, value);
        dispatch(setProducts(data));
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, dispatch, method, value]);


  return (
    <div className={styles.wrapper}>
      <Filter />
      <div className={styles.container}>
        {isLoading ? <Loader /> : <ProductList page={page} />}
      </div>
      <Pagination
        pages={{
          page,
          total,
        }}
        onNextPageClick={handleNextPageClick}
        onPrevPageClick={handlePrevPageClick}
      />
    </div>
  );
};

export default ProductPage;
