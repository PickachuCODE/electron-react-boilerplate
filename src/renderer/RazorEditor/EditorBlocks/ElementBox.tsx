import { useTheme } from "context/ThemeContext"
import { TypeEditor, useEditor } from "../EditorContext"
let countId = 0
let reserved = ["div","main" , "section", "header", "body"]

export function ElementBox(props:any) {
    let isCreated = false
    const { iEditor }: TypeEditor = useEditor();
    const { theme }:any = useTheme()
    

    function HandleDragStart() {
        const droppable = iEditor.current.contentWindow.document.querySelectorAll(".editor-razor-droppable")
        console.log("start")
        isCreated = false
        StartDragOver(droppable) //trigger dragging
    }
    function CreateElement(target:any) {
        var element:any = ""
        let node = props.mainNode.toLowerCase()
        if(isCreated) return
        element = document.createElement(node)
        element.style.padding = "5px" //default styling

        // check nodes sent in from props
        if (reserved.includes(node)) {
            element.classList.add(`editor-razor-droppable`)
            element.classList.add(`ClassName`) //a fake class
            element.id = `${countId++}-razor`      
            
            if (node === "div" || node === "main" && element.children.length === 0) {// default  styling for reserved element with no child
                element.style.padding = "10px" 
                element.style.minHeight = "50px" 
            }
            if (node === "section" && element.children.length === 0) {// default  styling for reserved element with no child
                element.style.padding = "10px"
                element.style.minHeight = "100vh"
            }
        } else {
            element.id = `${countId++}-razor`
        }
        // console.log(element.setAttribute("id", `${countId++}-razor`))
        isCreated = true
        element.innerHTML = props.nodeContent // set inner attr of the element
        const getChildren = element.children
        setId(getChildren)
        target.append(element)
        return
    }
    document.getElementById("a")?.children
    function setId(Children:any) {
        for (const child of Children) {
            child.id = `${countId++}-razor`
            child.style.padding = "5px" //default styling
            if (reserved.includes(child.localName)){
                child.classList.add(`editor-razor-droppable`)
                child.style.padding = "5px" //default styling
            }
            if (child.children.length > 0) {
                setId(child.children)
            }
        }
    }
    // drag over blocks in the editor
    function StartDragOver(droppable:any) {
        droppable.forEach((element:any) => {
            element.addEventListener("dragover", (e:any) => {
                e.preventDefault()
            })
            element.addEventListener("drop", function (e:any) {
                e.preventDefault()
                if (reserved.includes(e.target.localName)) {
                    if (e.target.classList.contains("editor-razor-droppable")) {
                        CreateElement(e.target)
                        console.log(isCreated)
                    } 
                    isCreated = true
                    return
                }
                else {
                    isCreated = true
                    console.log(e.target.localName,isCreated)
                    return
                }
            })
        })
    }

    return (
        <div className="ECBox"
            style={{
                display: "grid", justifyContent: "center", alignItems: "center", color: 'white', height: "42px", width: "42px", background: theme.color.primaryColor
            }}
            draggable={true}
            onDragStart={HandleDragStart}>
            {props.mainNode}
        </div>
    )
}
    