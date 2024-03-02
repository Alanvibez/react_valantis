import MyButton from '../ui/button/MyButton';
import styles from './Pagination.module.css';

const Pagination = ({ pages, onNextPageClick, onPrevPageClick }) => {
  const { page, total } = pages;
  
  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={styles.container}>
      <MyButton onClick={handlePrevPageClick} text='<' />

      <span className={styles.pages}>
        {page} / {total}
      </span>

      <MyButton onClick={handleNextPageClick} text='>' />
    </div>
  );
};

export default Pagination;
