import { useTheme } from 'context/ThemeContext';
import {
  LoadingSectionProp,
  LoadingProp,
} from 'renderer/Interface/Hub_Interfaces';
import './styles/LoadingSection.scss';
export default function LoadingSection(props: LoadingSectionProp) {
  return (
    <div className="athLoading">
      <div className="loadingCoponents">
        <div className="CompLoadingWrap">
          <LoadingImage />
          <LoadingTip title={props.LoadingTitle} sub={props.LoadingSub} />
        </div>
      </div>
    </div>
  );
}

function LoadingTip(props: LoadingProp) {
  const { theme }: any = useTheme();
  const StyleHeaderLoad = {
    color: theme.text.color,
  };
  return (
    <div className="TipInfo-Hero">
      <h2 className="Header-Tip-Loading" style={StyleHeaderLoad}>
        {props.title}
       </h2>
      <p
        className="content-Tip-Loading"
        style={{
          color: theme.text.color,
          paddingTop: '1px',
          opacity: '0.8',
        }}
      >
        {props.sub}
      </p>
    </div>
  );
}
function LoadingImage() {
  return (
    <div className="loadingWrap">
      <div className="boundingBox">
        <div className="boxLoadHolder1">
          <div id="load-1" className="load-1"></div>
        </div>
        <div className="boxLoadHolder2">
          <div id="load-2"></div>
        </div>
        <div className="boxLoadHolder3">
          <div id="load-3"></div>
        </div>
        <div className="boxLoadHolder4">
          <div id="load-4"></div>
        </div>
      </div>
    </div>
  );
}
