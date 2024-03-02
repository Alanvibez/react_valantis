import styles from './MySelect.module.css';

const MySelect = ({ options, text, onChange, value }) => {
  
  return (
    <select className={styles.select} value={value} onChange={onChange}>
      <option value=''>{text}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
