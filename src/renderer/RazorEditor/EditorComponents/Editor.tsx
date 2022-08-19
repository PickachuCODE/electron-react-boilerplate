import Frame from "react-frame-component";
import '../style/RazorEditor.scss'
import { useEffect, useRef } from "react";
import { TypeEditor, useEditor } from "../EditorContext";
import { useTheme } from "context/ThemeContext";
// const { ipcRenderer } = require("./electron");


export default function Editor() {
    const initEditor = `
    <!DOCTYPE html>
    <head>
        <style>
            *{
                margin:0px;
                padding: 0px;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            }
            body{
                height: 100vh;
            }
        </style>
    </head>
    <body id=${"editor-razor"} class=${"editor-razor-droppable"}>
    <body>
    </html>`
    const { setIEditor}:TypeEditor = useEditor()
    let editorRef = useRef<any>(null)
    useEffect(() =>{
        setIEditor(editorRef)
    })
    return (
        <div className="editor">
            
            <Frame
                initialContent={initEditor}
                mountTarget="#editor-razor"
                id="RAZOREDITOR"
                ref={editorRef}
            >
                <InitEditor/>
        </Frame>
        </div>
    );
}

function InitEditor() {
    const { iEditor, selector_Hover ,selector_Select }:TypeEditor = useEditor()
    const {theme}: any = useTheme()
    let i_element = iEditor.current.contentWindow.document //get iframe documents
    const reservedId = ["editor-razor-util", "editor-razor-selector-hover"]
    
    i_element.addEventListener("mouseover", (e:any) => {
        if (reservedId.includes(e.target.id)) return //to avoid self hovering
        selector_Hover(e.target)
        return 0 //end 
    })
    i_element.addEventListener("click", (e:any) => {
        if (reservedId.includes(e.target.id)) return //to avoid self hovering
        selector_Select(e.target)
        return 0 //end 
    })

    

    const editor_style:any = {
        selector_ParentHover: {
            height: 0,
            width: 0,
            position: 'fixed',
            pointerEvents: 'none',
            display: 'none'
        },
        selector_Hover: {
            height: 0,
            width: 0,
            border: `2px solid ${theme.editorColors.highlightColor}`,
            pointerEvents: 'none',
        },
        selector_Hover_Text: {
            height: 'fit-content',
            width: 'fit-content',
            pointerEvents: 'none',
            marginLeft: '10px',
            padding: '3px 10px',
            background: theme.editorColors.highlightColor,
            borderRadius: '0px 0px 5px 5px'
        },
        selector_ParentSelect: {
            height: 0,
            width: 0,
            position: 'fixed',
            pointerEvents: 'none',
        },
        selector_Select: {
            height: 0,
            width: 0,
            border: `2px solid ${theme.editorColors.selectedColor}`,
            pointerEvents: 'none',
        },
        selector_Select_Text: {
            height: 'fit-content',
            width: 'fit-content',
            pointerEvents: 'none',
            marginLeft: '10px',
            padding: '3px 10px',
            background: theme.editorColors.selectedColor,
            borderRadius: '0px 0px 5px 5px'
        },
    }

    return (
        <div id="editor-razor-util">
            
            <div id="editor-razor-selector-parentSelect" style={editor_style.selector_ParentSelect}>
                <div id="editor-razor-selector-select" style={editor_style.selector_Select}></div>
                <div id="editor-razor-selector-select-info" style={editor_style.selector_Select_Text}>
                    <p id="editor-razor-selector-hover-info-text" style={{ fontSize: "11px", color: theme.textColor }}></p>
                </div>
            </div>
            <div id="editor-razor-selector-parentHover" style={editor_style.selector_ParentHover}>
                <div id="editor-razor-selector-hover" style={editor_style.selector_Hover}></div>
                <div id="editor-razor-selector-hover-info" style={editor_style.selector_Hover_Text}>
                    <p id="editor-razor-selector-hover-info-text" style={{fontSize: "11px", color: theme.textColor}}></p>
                </div>
            </div>
           
        </div>
    ) 
}