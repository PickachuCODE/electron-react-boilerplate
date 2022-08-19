export interface LoadingProp {
  sub: string;
  title: string;
}

export interface LoadingSectionProp {
  LoadingTitle: string;
  LoadingSub: string;
  onLoadCallback?: Function
}

export interface ProjectWizard {
  id: string;
  projectName: string;
  projectColor: string;
  icon: string;
  projectType: {
    type: string;
  };
  projetData: {};
  projectDate: string | number;
  registerProject(project: {}): any;
}

export interface ProjectCard {
  idNumber: number;
  id: string;
  name: string;
  bg: string;
  TitleName : string;
}

export interface ProjectIcon{
  color:string
  text: string
}

export interface TaskButtons {
  main: string;
  action: any;
  isActive: string | null;
}

export interface ElementBlock{
  blockTitle: string
  children: any
}
export interface Contents {
  toolCurrent: string | null;
  action: ()=>void;
}