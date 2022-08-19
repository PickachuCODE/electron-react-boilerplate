import { useTheme } from 'context/ThemeContext'
import './styles/ButtonFull.scss'

function ButtonFull(props: any) {
    const {theme}: any= useTheme()
    const style:any ={
        buttonMain: {
             color: theme.text.color,
             background: theme.color.mainColor,
             padding: '10px 20px',
             borderRadius: '10px'
        }
    }
    console.log(typeof(style))
  return (
    <button className={`buttonFull ${props.class}`} style={style.buttonMain} onClick={props.action}>
        {props.text}
    </button>
  )
}

export default ButtonFull