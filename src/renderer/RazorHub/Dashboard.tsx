import { useTheme } from 'context/ThemeContext';
import '../styles/Dashboard.scss';
import ButtonFull from 'renderer/utils/ButtonFull';
import SearchBar from 'renderer/utils/SearchBar';
import SideBar from 'renderer/HubComponents/SideBar';
import testBackground from '../../lib/images/b.jpg';

import ProjectCard from '../HubComponents/ProjectComponents/ProjectCard';

// Icons Pack
import { Icon } from '@iconify/react';
import plus from '@iconify/icons-akar-icons/plus';
import { useAuthContext } from 'renderer/Firebase/AuthContext';
import LoadingSection from 'renderer/utils/LoadingSection';
import { AllSet, SignIn } from './AuthManger/SignIn';
import { useEffect, useState } from 'react';
import NewProjectWizard from 'renderer/HubComponents/ProjectComponents/NewProjectWizard';
import { useNewProjectWizard } from 'renderer/HubComponents/ProjectComponents/NewPeojectContext';
import { TypeEditor, useEditor } from 'renderer/RazorEditor/EditorContext';
import RazorEditor from 'renderer/RazorEditor/RazorEditor';

function Hub() {
  const { user, authLoading, isFreshUser }: any = useAuthContext();
  const { isEditorReady, editoLoadingStatus }: TypeEditor = useEditor();

  let currentScreen = authLoading ? (
    <LoadingSection LoadingTitle="Hi" LoadingSub="Hmm" />
  ) : (
    <>
      {user ? (
        <>
          {isFreshUser ? (
            <AllSet />
          ) : isEditorReady ? (
            editoLoadingStatus ? (
              <LoadingSection
                LoadingTitle="Loading up your editor"
                LoadingSub={editoLoadingStatus}
              />
            ) : (
              <RazorEditor />
            )
          ) : (
            <Projects />
          )}
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
  return <>{currentScreen}</>;
}

function Projects() {
  const { theme }: any = useTheme();
  const { isNewProject, setNewProject }: any = useNewProjectWizard();
  const { projectData }: any = useNewProjectWizard();
  const [myProjects, setProjectList] = useState<JSX.Element[]>();

  useEffect(() => {
    setProjectList(
      projectData.map((info: any, index: number) => {
        return (
          <ProjectCard
            idNumber={index}
            key={info.id}
            id={info.id}
            name={info.projectName}
            bg={info.projectColor}
            TitleName={info.projectName}
          />
        );
      })
    );
    console.log('Project list updated');
  }, [projectData]);
  const style: any = {
    display: {
      background: `url(${testBackground}) no-repeat`,
      backgroundSize: 'cover',
      backgroundPositionY: '-600px', // updateable
    },
    content: {
      background: theme.color.primary_400,
    },
    mainText: {
      color: theme.text.color,
    },
    subText: {
      color: theme.text.color,
    },
    plusStyle: {
      marginTop: '0px',
      textAlign: 'center',
      display: 'inline',
      color: theme.altColor,
    },
    plusStyleCancel: {
      marginTop: '0px',
      textAlign: 'center',
      display: 'inline',
      color: theme.altColor,
      transform: 'rotateZ(45deg)',
    },
  };

  function handleNewProject() {
    setNewProject(true);
  }
  function handleNewProjectCancel() {
    setNewProject(false);
  }

  return (
    <div className="HubBoard">
      {/* Wizard Section  -start-*/}
      {isNewProject ? <NewProjectWizard /> : <></>}
      {/* Wizard Section  -end-*/}

      <div className="DashDisplay" style={style.display}>
        <div className="dashOverlay">
          <div className="displayWrap">
            <div className="infoTextMain">
              <h1 className="hubMainText" style={style.mainText}>
                My Projects
              </h1>
              <p style={style.subText}>Lets get those ideas rolling out</p>
            </div>
            <div className="helpersSection">
              <div className="helperSectionWrap">
                <ButtonFull class={'hubButton'} text={'Import Project'} />
                <SearchBar class={'HubSearch SearchBar'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="DashContent" style={style.content}>
        <div className="side">
          <SideBar activeWindow={'Projects'} />
        </div>
        <div className="projects">
          <div className="dashboardProjectWrap">
            <div className="content">{myProjects}</div>

            <div className="plusSection">
              {/* <p className="textNewProject">New Project</p> */}
              <div className="iconBoxs" onClick={handleNewProject}>
                <Icon icon={plus} style={style.plusStyle} height={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hub;
