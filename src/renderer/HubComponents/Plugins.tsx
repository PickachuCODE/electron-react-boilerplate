import { useTheme } from 'context/ThemeContext';
import React from 'react'
import ButtonFull from 'renderer/utils/ButtonFull';
import SearchBar from 'renderer/utils/SearchBar';
import SideBar from './SideBar';

function Plugins() {
  const { theme }: any = useTheme();
  const style: any = {
    display: {
      background: theme.color.primaryColor,
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
  };
  return (
    <div className="HubBoard">
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
          <SideBar activeWindow={'Plugins'} />
        </div>
        <div className="projects">Plugins</div>
      </div>
    </div>
  );
}

export default Plugins