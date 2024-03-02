import style from './MyButton.module.css'


const MyButton = ({ onClick, text, disabled }) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
        {text}
    </button>
  )
}

export default MyButton;