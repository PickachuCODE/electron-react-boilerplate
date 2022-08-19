export function createFileInFolder():Promise<string>{
    return new Promise<string>((resolve => {
       setTimeout(()=>{
        resolve("Your editor is all set, lets build those ideas 🚀")
       }, 8000) 
    }))
}
