import { createContext, useContext, useState } from "react";
import LogoLight from '../lib/logos/razorLogo2-Dark.svg';
import LogoDark from '../lib/logos/razorLogo2-Light.svg';
import _logo from '../lib/logos/razorLogo.svg'

const ThemeContext = createContext({})
const useTheme  = ()=> useContext(ThemeContext)

const ThemeContextProvider = ({ children }:any) => {
  const [theme, currentTheme] = useState(DefaultThemes.DarkTheme);

  const themeValues = {
    theme,
    currentTheme,
  };
  return (
    <ThemeContext.Provider value={themeValues}>
      {children }
    </ThemeContext.Provider>
  );
};


// defualt system themes
const DefaultThemes = {
  DarkTheme: {
    themeName: 'DarkTheme',
    color: {
      mainColor: '#2BEA6C',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      primary_100: '#272727',
      primary_200: '#131313',
      primary_300: '#202020cc',
      primary_400: '#151515',
      primary_500: '#3A3A3A',
      primary_600: '#131313bf',
      primary_700: '#202020',
      primary_800: '#333333',
    },
    backgrounds: {
      hubSecColor: '#131313',
      wizardColor: '#131313bf',
      projectColor: '#202020',
      projectColorSecond: '#333333',
      toolBarColor: '#202020cc',
      toolBarChildColor: '#151515',
    },
    logo: {
        mainLogo: _logo,
      themeLogo: LogoDark,
    },
    text: {
      color: '#ffffff',
    },
    editorColors: {
      highlightColor: '#00C9F5',
      selectedColor: '#2BEA6C',
    },
  },

  LightTheme: {
    type: 'LightTheme',
    logoType: 'Light',
    baseColor: '#2BEA6C',
    primaryColor: '#ffffff',
    secondaryColor: '#DDDDDD',
    taskBarColor: '#A8A8A8',
    altColor: '#000',
    textColor: '#000000',
    hubSecColor: '#131313',
    projectColor: '#e7e7e7',
    projectColorSecond: '#292929',
    themeLogo: LogoLight,
    wizardColor: '#cdcdcdbf',
  },
};

export { ThemeContextProvider, useTheme }
