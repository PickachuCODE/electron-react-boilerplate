export interface LocalDataSchema  {
  user: {} | null;
  projects: {}[];
  plugins: {}[];
  workspace: {}[];
  newUser: boolean;
};

export const dataSchema: LocalDataSchema = {
  user: null,
  projects: [],
  plugins: [],
  workspace: [],
  newUser: true,
};
