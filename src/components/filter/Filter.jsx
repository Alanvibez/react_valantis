import { useCallback, useState } from 'react';
import styles from './Filter.module.css';
import MyInput from '../ui/input/MyInput';
import MySelect from '../ui/select/MySelect';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/productSlice';
import { useDebounce } from '../../hooks/useDebounce';

const Filter = () => {
  const [filterMethod, setFilterMethod] = useState('');
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useDispatch();

  const handleFilterMethod = useCallback((e) => {
    setFilterMethod(e.target.value);
    setIsSelect(e.target.value !== '');
  }, []);

  const handleSetFilter = (e) => {
    dispatch(
      setFilter({
        filterValue: e.target.value,
        filterMethod: filterMethod,
      })
    );
  };

  const debounceOnChange = useDebounce(handleSetFilter);

  const option = [
    {
      name: 'По цене',
      value: 'byPrice',
    },
    {
      name: 'По названию',
      value: 'byName',
    },
    {
      name: 'По бренду',
      value: 'byBrand',
    },
  ];

  return (
    <div className={styles.filter}>
      <MySelect
        options={option}
        text={'Выберите опцию поиска...'}
        onChange={handleFilterMethod}
      />
      <MyInput type='text' onChange={debounceOnChange} disabled={isSelect} />
    </div>
  );
};

export default Filter;
