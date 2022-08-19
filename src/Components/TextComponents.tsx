import { useTheme } from "context/ThemeContext";

interface SmallHeader {
    children: string
    spacing?: number
}
interface BigHeader {
  children: string;
}
interface SubText {
  children: string;
}
export function SmallHeader(props: SmallHeader){
    const {theme}: any = useTheme()
    const style = {
      color: theme.text.color,
      marginBottom: `${props.spacing}px` || '10px',
      fontSize: "25px",
      fontWeight: "700"
    };
    return(
        <p style={style}> {props.children} </p>
    )
}
export function SubText(props: SubText) {
  const { theme }: any = useTheme();
  const style = {
    color: theme.text.color,
    marginBottom: '10px',
    fontSize: '15px',
    fontWeight: '400',
    opacity: 0.6,
  };
  return <p style={style}> {props.children} </p>;
}