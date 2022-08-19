import { useTheme } from 'context/ThemeContext';
import React, { useRef } from 'react';
import './../styles/ProjectCard.scss';
import { ProjectCard, ProjectIcon } from 'renderer/Interface/Hub_Interfaces';
import { GetSavedValue, StoreData } from 'renderer/RazorFunctions/LocalStorage';
import { SmallHeader } from 'Components/TextComponents';
import { Delete_Icon } from 'Components/IconComponents';
import { useNewProjectWizard } from './NewPeojectContext';
import { TypeEditor, useEditor } from 'renderer/RazorEditor/EditorContext';

function ProjectCard(props: ProjectCard) {
  const { theme }: any = useTheme();
  const { setProjectData }: any = useNewProjectWizard();
  const { EditorReady}: TypeEditor = useEditor();
  const self = useRef<HTMLDivElement>(null);
  const style = {
    main: {
      background: theme.color.primary_800,
    },
    cardBottom: {
      background: theme.backgrounds.projectColor,
    },
    text: {
      color: theme.text.color,
    },
  };

 

  const openProject = () => {
    console.log('Open Project');          
    EditorReady?.(props.TitleName) ;        
  };
  const openOption = () => {
    var parent: any = document.getElementById(props.id);
    parent.children[2].style.display = 'grid';
  };
  const closeOption = () => {
    var parent: any = document.getElementById(props.id);
    parent.children[2].style.display = 'none';
  };
  const DeleteBox = () => {
    self.current ? (self.current.style.display = 'none') : '';
    const initData = GetSavedValue();
    console.log(props.idNumber);
    initData.projects.splice(
      props.idNumber === 0 ? 0 : props.idNumber,
      props.idNumber === 0 ? 1 : props.idNumber
    );

    console.log(initData);
    StoreData(initData);
    setProjectData(GetSavedValue().projects);
  };

  return (
    <div
      className="ProjectCards"
      id={props.id}
      onContextMenu={openOption}
      onMouseLeave={closeOption}
      onDoubleClick={openProject}
      ref={self}
    >
      <div className="cardTop" style={style.cardBottom}>
        <ProjectIcon color={props.bg} text={props.name} />
      </div>
      <div className="cardBottom" style={style.main}>
        <div className="cardBottomWrap">
          <div className="projectName" style={style.text}>
            {props.name}
          </div>
          <div className="projectTime" style={style.text}>
            {'4mins ago'}
          </div>
        </div>
      </div>
      <div className="cardOptions">
        <div className="cardOptionsWrap">
          <div
            style={{ background: theme.backgrounds.projectColor, }}
            className="optionBox del"
            id={`${props.id}_option_one`}
          ></div>
          <div
            style={{ background: theme.backgrounds.projectColor, }}
            className="optionBox del"
            id={`${props.id}_option_two`}
            onClick={DeleteBox}
          >
            <Delete_Icon size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectIcon(props: ProjectIcon) {
  return (
    <div
      className="iconBox"
      style={{
        background: props.color,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SmallHeader spacing={0}>{getProjectName(props.text)}</SmallHeader>
    </div>
  );
}
function getProjectName(a: string): string {
  var twoLetters = [];
  for (let i = 0; i < 5; i++) {
    if (a[i] !== ' ') {
      twoLetters.push(a[i]);
    }
  }
  var value = `${twoLetters.slice(0, 1)}${twoLetters.slice(1, 2)}`;
  return value.toUpperCase();
}

export default ProjectCard;
