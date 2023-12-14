import React , { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import WindowBar from "../WindowBar";
import { getFiles } from "../../helpers/explorer";
export default function Terminal(){
    
    const app = useSelector(state => state.apps.terminal);
    const files = useSelector(state => state.files);

    const [currentPath , setCurrentPath] = useState([])
    const [lines , setLines ] = useState([]);
    const termianlRef = React.createRef();
    const lineRef = React.createRef();
    const lastContent = React.createRef();


    useEffect(() => {
        init();
        lineRef.current.focus();
        termianlRef.current.onfocus = function(e){
            lineRef.current.focus();
        }
    })

    return(
        <WindowBar app={app}>
            <div style={{overflowY:"scroll"}} className="terminal-container" ref={termianlRef}  >
                <div  ref={lastContent}>{lines.map(line=> <Line lineText={line} /> )}</div>
                <div className="terminal-current-line">
                <div  className="terminal-path" >$</div>
            <textarea rows="1"   className="terminal-command-area" ref={lineRef}></textarea>
                </div>
            </div>
        </WindowBar>
    );

    function init(){
        const terminal = termianlRef.current;
        terminal.onkeydown = onEnterPressed;
    }    

    function cd(thisText){
        let arr = thisText.trim().split(" ");
        if( arr[1] === ".."){
            if( currentPath === [] )
                return;
            let cp = currentPath;
            cp.pop();
            setCurrentPath(cp);
            return;

        }
        let pathFiles =  getFiles(files ,currentPath);
        let found = false;
        for( let i=0;i<pathFiles.length;i++ ){
            if( pathFiles[i].name === arr[1] ){
                if( pathFiles[i].type !== "FOLDER" && pathFiles[i].type !== "WINDOWS_DISK" && pathFiles[i].type !== "DISK"){
                    return;
                }
                found = true;
                //let cp = [ ...pathFiles[i].absolutePath , pathFiles[i].name ];
                let cp = [ ...pathFiles[i].absolutePath  ];
                setCurrentPath( cp );
            }
        }
        if( found === false ){
        }
    }

    function ll(thisText){
        let pathFiles =  getFiles(files ,currentPath);
        let paths = formatTable(pathFiles);
        setPreviousLines( paths)
        

    }

    function pwd(){
        setPreviousLines(showCurrentPath(currentPath))
    }

    
    function Line(props){
        return <div  style={{ whiteSpace: 'pre-wrap' }}>{props.lineText}</div>
    }


    function showCurrentPath( cp ){
        let str = "";
        if( cp.length === 0 ) return ">";
        for(let i=0;i<cp.length;i++){
            str+=cp[i]+">";
        }
        return str; 
    }


    function onEnterPressed(e){
        if( e.key === "Enter" ){
                            
            let thisText = lineRef.current.value
            lineRef.current.value="";
            if( thisText === "" ){
                setPreviousLines(showCurrentPath(currentPath) );
                return
            }
            let arr = thisText.trim().split(" ");
            if( arr[0] === "cd" ){
                cd(thisText)   
                setPreviousLines(thisText);              
            }
            else if( arr[0] === "ls"){
                ll(thisText);
            }
            else if( arr[0] === "pwd"){
                pwd();
                
            }
            else{
                let msg = `command ${arr[0]} is not recognized as internal or external command`;
                setPreviousLines(msg);
            }


            
            

        }
    }

    function setPreviousLines(str){
        setLines([...lines,"- "+str]);  
    }


    function formatTable(objects) {
        // Find the maximum width for each column
        const columnWidths = { name: 0, type: 0 };
        objects.forEach((obj) => {
          if (obj.name.length > columnWidths.name) {
            columnWidths.name = obj.name.length;
          }
          if (obj.type.length > columnWidths.type) {
            columnWidths.type = obj.type.length;
          }
        });
        // Create the formatted table
        let table = "";
        // Add table header
        table += `\nName${" ".repeat(columnWidths.name+4)}\tType${" ".repeat(columnWidths.type+4)}\n`;
        // Add each object's data to the table with padding
        objects.forEach((obj) => {
          table += `${obj.name}${" ".repeat(columnWidths.name - obj.name.length + 10)}`;
          table += `${obj.type}${" ".repeat(columnWidths.type - obj.type.length + 10)}\n`; 
        });
        table +="\n";
        return table;
      }



}

