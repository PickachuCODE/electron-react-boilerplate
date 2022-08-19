import { useTheme } from "context/ThemeContext";
import { Contents } from "renderer/Interface/Hub_Interfaces";
import ElementBlock from "../EditorBlocks/ElementBlock";
import { ElementBox } from "../EditorBlocks/ElementBox";


export function ToolContentsLeft(props:Contents) {
  return (
    <>
      {props.toolCurrent === 'isElement' ? (
        <ElementTools /> // group of elements
      ) : props.toolCurrent === 'isCms' ? (
        <CMSTools /> // CMS ????????
      ) : (
        <></>
      )}
    </>
  );
}

function ElementTools() {
  const { theme }:any = useTheme();

  return (
    <div
      className="toolprops"
      style={{ background: theme.backgrounds.toolBarColor }}
    >
      <div className="toolContent">
        <div className="toolTitle">
          <p style={{ color: theme.text.color }}>Elements</p>
        </div>
        <ElementBlock blockTitle={'Container elements'}>
          <ElementBox mainNode={'Div'} nodeContent={``} />
          <ElementBox mainNode={'Main'} nodeContent={``} />
        </ElementBlock>
      </div>
    </div>
  );
}
function CMSTools() {
  const { theme }:any = useTheme();
  console.log('props.toolCurrent');
  return (
    <div
      className="toolprops"
      style={{ background: theme.backgrounds.toolBarColor }}
    >
      <div className="toolContent">
        <div className="toolTitle">
          <p style={{ color: theme.text.color }}>CMS</p>
        </div>
      </div>
    </div>
  );
}

// right side of the tool bar
export function ToolContentsRight(props:Contents) {
  return <>{props.toolCurrent === 'isDesign' ? <DesignTools /> : <></>}</>;
}
function DesignTools() {
  const { theme }:any = useTheme();
  return (
    <div
      className="toolprops toolright"
      style={{ background: theme.backgrounds.toolBarColor }}
    >
      <div className="toolContent">
        <div className="toolTitle righttool">
          <p style={{ color: theme.text.color, textAlign: 'right' }}>Design</p>
        </div>
        {/* <DesignBlock /> */}
      </div>
    </div>
  );
}
