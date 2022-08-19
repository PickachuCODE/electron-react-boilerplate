import { useTheme } from 'context/ThemeContext';
import taskbarLogo from '../../lib/logos/taskBarLogo.svg'
import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-carbon/close';
import checkboxIcon from '@iconify/icons-carbon/checkbox';
import { useAuthContext } from 'renderer/Firebase/AuthContext';
import { TypeEditor, useEditor } from 'renderer/RazorEditor/EditorContext';
function TaskBar() {
   const {theme}: any = useTheme()
   const {user}: any = useAuthContext()
   const { TitleEditor }:TypeEditor = useEditor();
   const style = {
     bar: {
       color: 'black',
     },
     taskBarLogo: {
       width: '20px',
     },
     projectinfo: {
       color: "white",
     },
   }; 

  return (
    <div className="taskbar" style={style.bar}>
      <div className="taskbarWrap">
        <div className="logoImage">
          <img src={taskbarLogo} alt="" style={style.taskBarLogo} />
        </div>
        <div className="taskbarProjectInfo">
          <div className="projectInfoWrap">
            <div className="line"></div>
            <p style={style.projectinfo}>{TitleEditor?.title}</p>
            {TitleEditor?.saved ? (
              <></>
            ) : (
              <div
                className="notSavedIndicator"
                style={{ background: theme.color.mainColor }}
              ></div>
            )}
          </div>
        </div>
        <div className="taskBarOther">
          <div className="user">
            <div className="userWrap">
              {user ? (
                <p>
                  <span style={{ color: theme.color.mainColor }}>@</span>
                  {user.user.displayName}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="taskButtons">
            <div className="TBox">&minus;</div>
            <div className="TBox">
              <Icon icon={checkboxIcon} width="15" />
            </div>
            <div className="TBox cancel">
              <Icon icon={closeIcon} width="25" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskBar