import { useTheme } from 'context/ThemeContext';
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthContextProvider } from 'renderer/Firebase/AuthContext';
import Plugins from 'renderer/HubComponents/Plugins';
import '../styles/App.scss';
import '../styles/Defaults.scss';
import Hub from './Dashboard';
import TaskBar from './TaskBar';

import { dataSchema } from 'Schema/RazorDateSchema';// this is for local-STORING
import { GetSavedValue, objectIsEmpty, StoreData } from 'renderer/RazorFunctions/LocalStorage';
import { NewProjectContextProvider } from 'renderer/HubComponents/ProjectComponents/NewPeojectContext';
import { EditorContextProvider } from 'renderer/RazorEditor/EditorContext';


function RazorHub(){
  return (
    <>
      <Outlet />
    </>
  );
}
console.clear()

export default function App() {
  const { theme }: any = useTheme();
  const [appReady, setAppReady] = useState(false)

  useEffect(()=>{
    // 1.Handles app logo intro
    let animLogo: gsap.core.Timeline = gsap.timeline();
    animLogo.to('.logoMain', {
      delay: 8,
      y: 50,
      // opacity: 0.0,
      onComplete: () => {
        setTimeout(() => {
          setAppReady(true);
        }, 1500);
      },
    });  
  }, [])

  const style = {
    appBody:{
      background: theme.color.primaryColor,
     }
  };

  let projectData = GetSavedValue() ;//LOCAL STORAGE

  if (objectIsEmpty(projectData)) {
    StoreData(dataSchema);
  }
  
  return (
    <>
      <AuthContextProvider>
        <EditorContextProvider>
          <TaskBar />

          <div className="appWrap" style={style.appBody}>
            {!appReady ? (
              <LogoSection />
            ) : (
              <NewProjectContextProvider>
                <>
                  <Router>
                    <Routes>
                      <Route path="/" element={<RazorHub />}>
                        <Route index element={<Hub />} />
                        <Route path="Plugins" element={<Plugins />} />
                      </Route>
                    </Routes>
                  </Router>
                </>
              </NewProjectContextProvider>
            )}
          </div>
        </EditorContextProvider>
      </AuthContextProvider>
    </>
  );
}

function LogoSection(){
  const { theme }: any = useTheme();

  const style = {
    logo: theme.logo.mainLogo,
    logoSection: {
      background: theme.color.primaryColor,
    },
  }
  return (
    <div className="LogoSection" style={style.logoSection}>
      <div className="LogoWraper">
        <img className='logoMain' src={style.logo} alt="" />
      </div>
    </div>
  );
}