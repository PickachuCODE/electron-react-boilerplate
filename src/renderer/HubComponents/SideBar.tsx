import { useTheme } from 'context/ThemeContext';
import pluginIcon from '../../lib/icons/clarity_plugin-line.svg'
import marketIcon from '../../lib/icons/icon-park-outline_weixin-market.svg';
import learnIcon from '../../lib/icons/bx_book-alt.svg';
import frameIcon from '../../lib/icons/bi_grid-1x2.svg';
import CommunityIcon from '../../lib/icons/akar-icons_chat-dots.svg';
import teamIcon from '../../lib/icons/akar-icons_people-group.svg';
import './styles/HubSideBar.scss'
import { Link } from 'react-router-dom';

function SideBar(props:any) {
  return (
    <div className="SideBar">
      <div className="hubWrapBar">
        <div className="hubTopBar">
          <SideButtons to={'/'} name={'Projects'} active={props.activeWindow}>
            <img src={pluginIcon} alt="" />
          </SideButtons>
          <SideButtons
            to={'/Plugins'}
            name={'Plugins'}
            active={props.activeWindow}
          >
            <img src={pluginIcon} alt="" />
          </SideButtons>
          <SideButtons
            to={'/Marketplace'}
            name={'Marketplace'}
            active={props.activeWindow}
          >
            <img src={marketIcon} alt="" />
          </SideButtons>
          <SideButtons to={'/Learn'} name={'Learn'} active={props.activeWindow}>
            <img src={learnIcon} alt="" />
          </SideButtons>
          <SideButtons
            to={'/Frameworks'}
            name={'Frameworks'}
            active={props.activeWindow}
          >
            <img src={frameIcon} alt="" />
          </SideButtons>
          <SideButtons
            to={'/Community'}
            name={'Community'}
            active={props.activeWindow}
          >
            <img src={CommunityIcon} alt="" />
          </SideButtons>
        </div>
        <div className="hubButtomBar">
          <SideButtons to={'/Teams'} name={'Teams'} active={props.activeWindow}>
            <img src={teamIcon} alt="" />
          </SideButtons>
        </div>
      </div>
    </div>
  );
}


function SideButtons(props:any){
    const {theme}: any = useTheme()
    const activeName:string = props.active
    const isActive:boolean = Boolean(activeName === props.name)
    const style = {
      sideBox: {
        borderRight: isActive ? `2px solid ${theme.color.secondaryColor}` : '',
      },
    };
    const data = isActive ? <></> : 
        <Link to={props.to}>
        <div className="sideBarBox" style={style.sideBox}>
          <div className="iconSideBox">{props.children}</div>
          <p
            className="sidebarText"
            style={{
              fontSize: isActive ? '18px' : '14px',
              color: theme.text.color,
            }}
          >
            {props.name}
          </p>
        </div>
      </Link>
    
    return <>{data}</>;
}


export default SideBar