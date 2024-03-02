import styles from './Loader.module.css';
import { Bars } from 'react-loader-spinner';
const Loader = () => {
  return (
    <div className={styles.container}>
      <Bars
        height='100'
        width='100'
        color='#f1356d'
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  );
};

export default Loader;
