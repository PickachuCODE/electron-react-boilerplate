import { useTheme } from 'context/ThemeContext'
import { ElementBlock } from 'renderer/Interface/Hub_Interfaces';

function ElementBlock(props: ElementBlock) {
  // handles batch placements on Elements
  const { theme }: any = useTheme();
  return (
    <div
      className="toolChildElements"
      style={{ background: theme.backgrounds.toolBarChildColor }}
    >
      <p className="toolChildElementTitle" style={{ color: theme.text.color }}>
        {props.blockTitle}
      </p>

      <div className="toolChildChildren">{props.children}</div>
    </div>
  );
}

export default ElementBlock