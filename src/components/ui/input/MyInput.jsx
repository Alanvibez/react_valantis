import style from './MyInput.module.css';


const MyInput = ({ onChange, value, type, disabled }) => {
  return (
    <input
      className={style.input}
      onChange={onChange}
      value={value}
      type={type}
      disabled={!disabled}
    ></input>
  );
};

export default MyInput;
