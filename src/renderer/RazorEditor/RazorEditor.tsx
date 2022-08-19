// import { SmallHeader } from 'Components/TextComponents'
import { useTheme } from 'context/ThemeContext';
import { useState } from 'react';
import { TaskButtons } from 'renderer/Interface/Hub_Interfaces';
import Editor from './EditorComponents/Editor';
import { ToolContentsLeft, ToolContentsRight } from './EditorComponents/EditorToolContent';
import './style/RazorEditor.scss'

function RazorEditor() {
  const { theme }:any = useTheme();

  return (
      <div className="RazorEditorLayout">
        {/* TopSection */}
        <div
          className="TopSection"
          style={{ background: theme.color.primary_400 }}
        ></div>

        {/* MiddleSection */}
        <div
          className="MiddleSection"
          style={{ background: theme.color.primary_100 }}
        >
          <MiddleSection />
        </div>

        {/* Bottom Section */}
        <div
          className="BottomSection"
          style={{ background: theme.color.mainColor }}
        ></div>
      </div>
  );
}

export default RazorEditor




function MiddleSection() {
  const [selectedTool, setSelectedTool] = useState<null | string>(null);
  const [selectedToolRight, setSelectedToolRight] = useState<null | string>(null);
  const [activeToolButton, setActiveToolButton] = useState<null | string>(null);
  const [activeToolButtonRight, setActiveToolButtonRight] = useState<null | string>(null);

  const handleToolBarExit = () => {
    // e.preventDefault()
    setSelectedTool(null);
    setActiveToolButton(null);
    setSelectedToolRight(null);
    setActiveToolButtonRight(null);
  };
  const handleElement = () => {
    setSelectedTool('isElement');
    setActiveToolButton('isElement');
  };
  const handleCMS = () => {
    setSelectedTool('isCms');
    setActiveToolButton('isCms');
  };
  const handleDesign = () => {
    setSelectedToolRight('isDesign');
    setActiveToolButtonRight('isDesign');
  };
  return (
    <div className="MiddleWrap">
      <div className="toolwrap" style={{ marginRight: '15px' }}>
        <ToolContentsLeft
          toolCurrent={selectedTool}
          action={handleToolBarExit}
        />

        {/* top tool section 💩 */}
        <div className="toolwrapTop" style={{ justifyContent: 'right' }}>
          <div className="TWwrap">
            <TaskButtonsLeft
              action={handleElement}
              main="isElement"
              isActive={activeToolButton}
            />
            <TaskButtonsLeft
              action={handleCMS}
              main="isCms"
              isActive={activeToolButton}
            />
          </div>
        </div>

        {/* buttom tool section 💩 */}
        <div className="toolwrapBottom" style={{ justifyContent: 'right' }}>
          <div className="TWwrap">
            <TaskButtonsLeft
              action={handleCMS}
              main="isCms"
              isActive={activeToolButton}
            />
            <TaskButtonsLeft
              action={handleCMS}
              main="isOther"
              isActive={activeToolButton}
            />
          </div>
        </div>
      </div>

      <div className="editorWrap" onMouseEnter={handleToolBarExit}>
        <Editor />
      </div>

      <div className="toolwrap" style={{ marginLeft: '15px' }}>
        <ToolContentsRight
          toolCurrent={selectedToolRight}
          action={handleToolBarExit}
        />
        <div className="toolwrapTop" style={{ justifyContent: 'left' }}>
          <div className="TWwrap">
            <TaskButtonsRight
              action={handleDesign}
              main="isDesign"
              isActive={activeToolButtonRight}
            />
            <TaskButtonsRight
              action={handleDesign}
              main="isLayers"
              isActive={activeToolButtonRight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// to control the tool section display from left or right
function TaskButtonsLeft(props: TaskButtons) {
  const { theme }: any = useTheme();
  return (
    <div
      className="TaskButton"
      onClick={props.action}
      style={{
        display:
          props.isActive === null
            ? 'block'
            : props.isActive === props.main
            ? 'block'
            : 'none',
        border:
          props.isActive === null
            ? `none`
            : props.isActive === props.main
            ? `solid 2px ${theme.baseColor}`
            : 'none',
      }}
    ></div>
  );
}
function TaskButtonsRight(props: TaskButtons) {
  const { theme }: any = useTheme();
  return (
    <div
      className="TaskButton"
      onClick={props.action}
      style={{
        display:
          props.isActive === null
            ? 'block'
            : props.isActive === props.main
            ? 'block'
            : 'none',
        border:
          props.isActive === null
            ? `none`
            : props.isActive === props.main
            ? `solid 2px ${theme.baseColor}`
            : 'none',
      }}
    ></div>
  );
}