import { useTheme } from "context/ThemeContext";
import { StepBarForm } from "./FormComponents";

interface Wizard{
    children: JSX.Element,
    progressBar?: number
}

export function WizardBox(props: Wizard){
  const { theme }: any = useTheme();
  
    return (
      <div className="W_box" style={{ background: theme.color.primaryColor }}>
        <div className="w_boxWrap">
          <div className="loadingBar_NewProject">
            <StepBarForm progress={props.progressBar} />
          </div>
          <div className="W_boxContent">{props.children}</div>
        </div>
      </div>
    );
}

