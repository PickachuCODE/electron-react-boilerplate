import { createContext, useContext, useEffect, useState } from 'react';
import { createFileInFolder } from './EditorFunctions';
const EditorContext = createContext<TypeEditor>({});
const useEditor = () => useContext(EditorContext);

function EditorContextProvider({ children }: any) {
  const [isEditorReady, setEditor] = useState(false);
  const [editoLoadingStatus, setLoadingStatus] = useState<any>('');
  const [TitleEditor, setTitleEditor] = useState({ title: '', saved: true });

  const [iEditor, setIEditor]: any = useState('');

  const [targetID, setTargetID]: any = useState(); //selector
  const [targetHover, setTargetHover]: any = useState(); //hover
  const [hoverElementWrap, setHoverElement]: any = useState();

  useEffect(() => {
    if (!targetID) return;
    console.log(targetID.id, targetHover.id);
    if (targetID.id === targetHover.id) {
      hoverElementWrap.style.display = 'none';
    }
  }, [targetHover]);

  function selector_Hover(target: any) {
    const hoverElement = iEditor.current.contentWindow.document.getElementById(
      'editor-razor-selector-parentHover'
    );
    setHoverElement(hoverElement);
    hoverElement.children[0].style.height = `${target.clientHeight}px`;
    hoverElement.children[0].style.width = `${target.clientWidth}px`;
    hoverElement.style.top = `${target.offsetTop}px`;
    hoverElement.style.left = `${target.offsetLeft}px`;
    hoverElement.style.display = 'block';

    // get the text element in the selector
    hoverElement.children[1].children[0].innerText = target.localName;
    setTargetHover(
      iEditor.current.contentWindow.document.getElementById(target.id)
    );
    target.addEventListener('mouseleave', () => {
      hoverElement.style.display = 'none';
    });
  }
  function selector_Select(target: any) {
    const selectorElement =
      iEditor.current.contentWindow.document.getElementById(
        'editor-razor-selector-parentSelect'
      );
    hoverElementWrap.style.display = 'none';
    selectorElement.children[0].style.height = `${target.clientHeight}px`;
    selectorElement.children[0].style.width = `${target.clientWidth}px`;
    selectorElement.style.top = `${target.offsetTop}px`;
    selectorElement.style.left = `${target.offsetLeft}px`;
    selectorElement.style.display = 'block';

    // get the text element in the selector
    selectorElement.children[1].children[0].innerText = target.localName;

    setTargetID(
      iEditor.current.contentWindow.document.getElementById(target.id)
    );
    // event should be add to remove selector highlight
  }

  async function ConfigEditor(): Promise<any> {
    setEditor(true);
    setLoadingStatus('creating your editor will take less than a minutes');
    setLoadingStatus(await createFileInFolder());

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
        setLoadingStatus(false);
      }, 10000);
    });
  }

  function EditorReady(Title: string) {
    ConfigEditor().then((res) => {
      setTitleEditor({ title: `${Title} -Razor Studio`, saved: true });
      console.log(res);
    });
  }

  const values = {
    iEditor,
    setIEditor,
    isEditorReady,
    setEditor,
    editoLoadingStatus,
    setLoadingStatus,
    ConfigEditor,
    TitleEditor,
    setTitleEditor,
    EditorReady,
    selector_Hover,
    selector_Select,
  };
  return (
    <EditorContext.Provider value={values}>{children}</EditorContext.Provider>
  );
}

interface TypeEditor {
  isEditorReady?: boolean;
  setEditor?: React.Dispatch<React.SetStateAction<boolean>>;
  editoLoadingStatus?: string;
  setLoadingStatus?: React.Dispatch<React.SetStateAction<string>>;
  ConfigEditor?: () => Promise<void> | void;
  TitleEditor?: {
    title: string;
    saved: boolean;
  };
  setTitleEditor?: React.Dispatch<
    React.SetStateAction<{
      title: string;
      saved: boolean;
    }>
  >;
  EditorReady?: (Title: string) => void;
  iEditor?: any; //updateType
  setIEditor?: any;
  selector_Select?: any;
  selector_Hover?: any;
}

export { useEditor, EditorContextProvider, TypeEditor };
