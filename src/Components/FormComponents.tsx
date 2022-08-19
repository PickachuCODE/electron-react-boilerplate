import { useTheme } from "context/ThemeContext";

interface FormInputStyle{
    Box: {},
    content: {},
}
interface FormInput{
    placeholder: string,
    align?: string,
    width?: number,
    onValueChange?: (e:any)=>void
}

export function InputForm(props: FormInput){
  const { theme }: any = useTheme();

    const style: FormInputStyle = {
      Box: {
        background: theme.color.primary_100,
        width: props.width || '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        padding: '5px 10px',
      },
      content: {
        border: 'none',
        height: '30px',
        width: '100%',
        textAlign: props.align || 'left',
        padding: '0 10px 0 ',
        outline: 'none',
        background: 'none',
        color: theme.text.color,
      },
    };
    return(
        <div style={style.Box}>
            <input type="text"  
              id="" 
              style={style.content} 
              onChange={props.onValueChange}
              placeholder={props.placeholder}
            />
        </div>
    )
}
interface FormButton {
  action?: any;
  children: string;
  spacing?: number
}
export function ButtonForm(props: FormButton){
    const { theme }: any = useTheme();
    const style: any = {
      buttonMain: {
        color: theme.text.color,
        background: theme.color.mainColor,
        padding: `10px ${props.spacing || 20 }px`,
        borderRadius: '10px',
      },
    };
    console.log(typeof style);
    return (
      <button
        className={`buttonFull`}
        style={style.buttonMain}
        onClick={props.action}
      >
        {props.children}
      </button>
    );
}

interface FormProgress{
  progress?: number
}

export function StepBarForm(props: FormProgress){
    const { theme }: any = useTheme();

    const style = {
      bar: {},
      barWrap: {
        width: '300px',
        background: theme.color.primary_300,
        overflow: 'hidden',
        borderRadius: '100px',
      },
      steps: {
        background: theme.color.mainColor,
        height: '5px',
        width: `${props.progress}%` || '10%',
        borderRadius: '100px',
        transition: '1s'
      },
    };
    return(
        <div style={style.bar}>
            <div style={style.barWrap}>
                <div style={style.steps}></div>
            </div>
        </div>
    )
}