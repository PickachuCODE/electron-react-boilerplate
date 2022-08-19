import { ButtonForm, InputForm } from 'Components/FormComponents';
import { GridOne_Icon } from 'Components/IconComponents';
import { SmallHeader, SubText } from 'Components/TextComponents';
import { WizardBox } from 'Components/WizardComponent';
import { useTheme } from 'context/ThemeContext';
import React, { useRef, useState } from 'react';
import { ProjectWizard } from 'renderer/Interface/Hub_Interfaces';
import { today } from 'renderer/RazorFunctions/DateFunction';
import { GetSavedValue, StoreData } from 'renderer/RazorFunctions/LocalStorage';
import LoadingSection from 'renderer/utils/LoadingSection';
import '../styles/NewProject.wizard.scss';
import '../../styles/Dashboard.scss';
import { useNewProjectWizard } from './NewPeojectContext';

const PROJECT_COLOR = ['#00B2FF', '#FF006B', '#00ff75', '#FF4D00', '#FFE600'];

class Project implements ProjectWizard {
  id: string;
  projectName: string;
  projectColor: string;
  icon: string;
  projectType: {
    type: string;
  };
  projetData: {};
  projectDate: string | number;

  constructor() {
    this.id = `razor_editor`;
    this.projectName = '';
    this.projectColor = '';
    this.icon = '';
    this.projectType = {
      type: '',
    };
    this.projetData = {};
    this.projectDate = today;
  }

  registerProject(project: {}): any {
    this.id = `razor-editor-${this.projectName}--${this.projectDate}`;
    this.projectColor = this.randomIconColor();
    let data = GetSavedValue();
    data.projects.push(project);
    StoreData(data);
  }
  randomIconColor() {
    return PROJECT_COLOR[Math.floor(Math.random() * PROJECT_COLOR.length)];
  }
}

const CreateProject = new Project();

function NewProjectWizard() {
  const { theme }: any = useTheme();
  const { isEditorReady, editoLoadingStatus }: TypeEditor = useEditor();
  const [progressNumber, setProgressNumber] = useState(10);
  const [progress, setProgress] = useState(0);
  const [LAST_NUMBER, setLAST_NUM] = useState(2); // this is used to show an end in the wizard

  const style = {
    main: {
      background: theme.color.primary_600,
    },
  };

  // created a state to monitor when the editorContextState
  // the wizard view state is modular and can be updated by ++LastNum

  const currentView =
    progress === LAST_NUMBER ? (
      isEditorReady ? (
        <RazorEditor />
      ) : (
        <LoadingSection
          LoadingTitle="We are loading your editor"
          LoadingSub={editoLoadingStatus || '...'}
        />
      )
    ) : (
      <WizardBox progressBar={progressNumber}>
        <WizardProject
          currentProgress={progress}
          progress={setProgress}
          progressNum={setProgressNumber}
          lastNumber={LAST_NUMBER}
        />
      </WizardBox>
    );
  return (
    <>
      <div className="wizard" style={style.main}>
        {currentView}
      </div>
    </>
  );
}

export default NewProjectWizard;
interface WizProject {
  progressNum: React.Dispatch<React.SetStateAction<number>>;
  progress: React.Dispatch<React.SetStateAction<number>>;
  currentProgress: number;
  lastNumber: number;
}
import { Icon } from '@iconify/react';
import plus from '@iconify/icons-akar-icons/plus';
import { TypeEditor, useEditor } from 'renderer/RazorEditor/EditorContext';
import RazorEditor from 'renderer/RazorEditor/RazorEditor';

function WizardProject(props: WizProject) {
  const { theme }: any = useTheme();
  const { setNewProject }: any = useNewProjectWizard();
  const { EditorReady }: TypeEditor = useEditor();

  function FirstStep() {
    const [value, setValue] = useState('');
    const handleButton = () => {
      // setProgress(1)
      console.log(value);
      if (value !== '') {
        props.progress(1);
        CreateProject.projectName = value;
        props.progressNum(40);
        console.log(CreateProject);
      }
    };
    return (
      <>
        <div className="w_boxIcon">
          <GridOne_Icon size={50} />
        </div>
        <div className="w_boxText">
          <SmallHeader>Create new project</SmallHeader>
          <SubText>Get started by giving your project a name</SubText>
        </div>
        <div className="w_boxInput">
          <InputForm
            onValueChange={(e) => {
              setValue(e.target.value);
            }}
            width={280}
            placeholder="Project Name"
          />
        </div>
        <div className="w_boxButton">
          <ButtonForm spacing={30} action={handleButton}>
            Next
          </ButtonForm>
        </div>
      </>
    );
  }
  function SecondStep() {
    const [value, setValue] = useState('');
    const { setProjectData }: any = useNewProjectWizard();
    const handleButton = () => {
      // setProgress(1)
      console.log(value);
      if (value !== '') {
        props.progressNum(100);
        CreateProject.projectType.type = value;
        setTimeout(() => {

          // This Handles 
          // 1. Saving metadata of projects
          // 2. Initing Editor (config---Editor)

          props.progress(props.lastNumber);
          CreateProject.registerProject(CreateProject);
          setProjectData(GetSavedValue().projects);
          EditorReady?.(CreateProject.projectName);
        }, 1500);
      }
    };
    return (
      <>
        <div className="w_boxIcon">
          <GridOne_Icon size={50} />
        </div>
        <div className="w_boxText">
          <SmallHeader>Type Of Project</SmallHeader>
          <SubText>What type of project are you working on</SubText>
        </div>
        <div className="w_boxInput">
          <InputForm
            onValueChange={(e) => {
              setValue(e.target.value);
            }}
            width={280}
            placeholder="Type of project"
          />
        </div>
        <div className="w_boxButton">
          <ButtonForm spacing={30} action={handleButton}>
            Create Project
          </ButtonForm>
        </div>
      </>
    );
  }

  const style: any = {
    plusSection: {
      borderRadius: '10px',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      color: theme.text.color,
      width: '40px',
      height: '40px',
      background: theme.color.primaryColor,
      overflow: 'hidden',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconBox: {
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
    },
    plusStyleCancel: {
      marginTop: '0px',
      textAlign: 'center',
      display: 'inline',
      color: theme.altColor,
      transform: 'rotateZ(45deg)',
    },
  };
  function handleNewProjectCancel() {
    setNewProject(false);
  }

  const renderStep =
    props.currentProgress === 0 ? (
      <FirstStep />
    ) : props.currentProgress === 1 ? (
      <SecondStep />
    ) : (
      <></>
    );

  return (
    <>
      {renderStep}
      <div className="plusSection" style={style.plusSection}>
        <div
          className="iconBoxs"
          style={style.iconBox}
          onClick={handleNewProjectCancel}
        >
          <Icon icon={plus} style={style.plusStyleCancel} height={16} />
        </div>
      </div>
    </>
  );
}
