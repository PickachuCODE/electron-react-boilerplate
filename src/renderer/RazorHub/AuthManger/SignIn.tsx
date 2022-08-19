import { useTheme } from 'context/ThemeContext'
import { useEffect } from 'react';
import { useAuthContext } from 'renderer/Firebase/AuthContext';
import { GetSavedValue, StoreData } from 'renderer/RazorFunctions/LocalStorage';
import ButtonFull from 'renderer/utils/ButtonFull'
import '../../styles/SignIn.scss'

function SignIn() {
  return (
    <div className="SignIn">
      <WithGithHub />
    </div>
  );
}

function WithGithHub(){
    const {theme}: any = useTheme()
    const {signWithGitHub}: any = useAuthContext()
    function handleSignIn() {
      signWithGitHub()
    }

    const style: any = {
      Text: {
        color: theme.text.color,
        marginBottom: '10px',
      },
      subText: {
        color: theme.text.color,
        opacity: 0.6,
        textAlign: 'center',
      },
      buttonWrap:{
        display: 'flex',
        justifyContent: 'center',
      }
    };
    return (
      <div className="signInBox">
        <div className="imageHolder">
          <img src={theme.logo.themeLogo} alt="" />
        </div>
        <div className="textSection">
          <p className="Header signInText" style={style.Text}>
            Sign In With Your GitHub Account
          </p>
          <p className="Subtext signInText" style={style.subText}>
            Link your GitHub account to Razor to get Started
          </p>
        </div>
        <div className="buttonWrap" style={style.buttonWrap}>
          <ButtonFull text={'Github SignIn'} action={handleSignIn}/>
        </div>
      </div>
    );
}




function AllSet(){
  const { user, setFreshUser }: any = useAuthContext();
  
    useEffect(()=>{
        setTimeout(() => {
          console.log('fresh User');
          let savedUser: any = GetSavedValue();
          if (savedUser.newUser) {
            savedUser.newUser = false;
            setFreshUser(savedUser.newUser);
          }
          StoreData(savedUser);
        }, 8000);
    },[])
    const { theme }: any = useTheme();
    const style: any = {
      Text: {
        color: theme.text.color,
        marginBottom: '10px',
        textAlign: 'center',
      },
      subText: {
        color: theme.text.color,
        opacity: 0.6,
        textAlign: 'center',
      }
    };
    return (
      <div className="allSet_Main">
      <div className="allSet">
        <div className="imageBox_Main">
          <div className="imageBox"></div>
        </div>
        <div className="textSection">
          <p className="Header" style={style.Text}>{user.user.displayName}</p>
          <p className="Subtext" style={style.subText}>You are all set, Lets start building 🎉</p>
        </div>
      </div>
      </div>
    );
}

export  {SignIn, AllSet}