import { createContext, useContext, useState } from "react";
import { GetSavedValue } from "renderer/RazorFunctions/LocalStorage";

const NewProject = createContext({})
const useNewProjectWizard = () => useContext(NewProject)

const NewProjectContextProvider = ({children}:any)=>{
  const [projectData, setProjectData] = useState(
    GetSavedValue().projects
  );
  const [isNewProject, setNewProject] = useState<boolean>(false);


    const values = {
        projectData,
      setProjectData,
      isNewProject, setNewProject,
    };
    return(
        <NewProject.Provider value={values}>
            {children}
        </NewProject.Provider>
    )
}

export{NewProjectContextProvider, useNewProjectWizard}
