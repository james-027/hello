'use client';
import "./style.css"
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState, SetStateAction, useCallback, useRef} from 'react';
import Image from 'next/image'
import 'react-toastify/dist/ReactToastify.css';
import InputAdorment from "@mui/material/InputAdornment";
import CheckBox from "@mui/material/Checkbox";
import TextField  from "@mui/material/TextField";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import LinkPlatform from '../Platform/link';
import AssignPlatform from '../Platform/assign';

import { ToastContainer, toast } from 'react-toastify';
import { motion,AnimatePresence, backIn } from "framer-motion";
import Papa from 'papaparse';

import csvParser from 'csv-parser';
import axios from 'axios';



interface ContainerProps { 
  globalPlatform:any, 
  setGlobalPlatform: React.Dispatch<React.SetStateAction<string>>;
 
}  

export default function Container({globalPlatform,setGlobalPlatform}:ContainerProps) { 
  let [openModule, setOpenModule] = useState("[]");
  let [myPlatform, setMyPlatform] = useState("[]");
  let [openplatform,setMyOpenPlatform] = useState("[]")
  let [myAssignPlatform, setAssignPlatform] = useState("[]");
  let [mysearch,setMySearch] = useState("");
  let [mydroparrow,setMyDropArrow] = useState("");
  let [myspace,setMySpace] = useState(0);
  let [mydrag,setMyDrag] = useState('');
  let [myscroller,setScroller] = useState("on")
  let [mychecker,setChecker] = useState(0)
  let [mychecker1,setChecker1] = useState(0)
  let [opencontent, setOpenContent] = useState(false);
  let [myfullscreen,setMyFullscreen] = useState("");
  let [heightwindow,setHeightWindow] = useState(0)
  let [isfullscreen,setIsFullscreen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState("[]");

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [parsedData, setParsedData] = useState<any[]>([]);

  var moduleName = "";
  var myassignid = "";
  if(typeof window!== 'undefined'){
    moduleName = localStorage.getItem("ModuleName") as string;
    myassignid = localStorage.getItem("AssignID") as string;
  }
    let  [myusers,setMyUsers] = useState("[]");
    let  [myPlatforms,setMyPlatforms] = useState("[]");

  useEffect(() => { 
    
    GetUsers()


    if(typeof window!== 'undefined'){
      

      setMyDropArrow(localStorage.getItem("APIfile")+"/assets/"+"droparrow.png");

      moduleName = localStorage.getItem("ModuleName") as string;
      setMyUsers(localStorage.getItem("GetUser") as string)
    }
setMySearch(localStorage.getItem("APIfile")+"/assets/"+"search.png")  
setMyFullscreen(localStorage.getItem("APIfile")+"/assets/"+"expand.png")
function handleFullscreenChange(){
  const fullscreen =
document.fullscreenElement;
setIsFullscreen(!!fullscreen)
if(!fullscreen){

  setMyFullscreen(localStorage.getItem("APIfile")+"/assets/"+"expand.png")
}




}
document.addEventListener('fullscreenchange',handleFullscreenChange)
return () =>{
  document.removeEventListener('fullscreenchange',handleFullscreenChange)
}
  }, []);

  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFileUploaded(true);
      setFileName(uploadedFile.name);
      setFile(uploadedFile);
      console.log('File selected:', uploadedFile);

      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target?.result) {
          let csvContent = event.target.result as string;

          // Check for BOM and remove it if present
          if (csvContent.charCodeAt(0) === 0xFEFF) {
            csvContent = csvContent.slice(1);
          }

          console.log('Raw CSV content:', csvContent); // Log the raw CSV content

          try {
            Papa.parse(csvContent, {
              header: true,
              skipEmptyLines: true,
              complete: function(results) {
                console.log('Parsed CSV data:', results.data); // Log the parsed CSV data
                setParsedData(results.data);
              },
              error: function(error: any) {
                console.error('Error parsing CSV:', error);
              }
            });
          } catch (error) {
            console.error('Error during CSV parsing:', error);
          }
        }
      };

      // Read the file as text
      reader.readAsText(uploadedFile, 'UTF-8'); // Ensure the file is read as text
    } else {
      console.log('No file selected'); // Log if no file is selected
    }
  };

  const handleProcessClick = async () => {
    if (!file) {
      toast.error('No file selected.');
      console.log('No file selected for upload'); // Log if no file is in state
      return;
    }

    console.log('Processing CSV data:', parsedData); // Log the parsed CSV data for further processing

    //  try {
    //   // Assuming your backend endpoint is running on localhost:3000
    //   const response = await axios.post('http://localhost:3000/upload_csv', { parsedData });
    //   console.log('Response from backend:', response.data);
    // } catch (error) {
    //   console.error('Error uploading data to backend:', error);
    // }
  };


  async function UploadAll(){
    
    try { 
      const response = await fetch(localStorage.getItem("APIupload")+"",{
          method: 'POST'
        } 
      );    
      const json = await response.json();


      
      if(response.status==200){ 

        setChecker(mychecker+=0.009*0.42+0.2) 
        setGlobalPlatform(globalPlatform+=0.009*0.42+0.2) 



      } else if(response.status===404){
        toast.error(json['Message'])
      }
    } catch (error) {



    } 
    
    }

  // const handleFileUpload = async (event: { target: { files: any[]; }; }) => {

  //   const selectedFile = event.target.files[0];
    
    
  //   etFileUploaded(true); // Update state to indicate file upload
  //   setFileName(file.name);


  //   if (!file) {
  //     setUploadMessage('Please select a file.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);

    
  //   try {
  //     const response = await axios.post('http://localhost:3998/upload_csv/', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       },
        
  //     });

  //     setUploadMessage(response.data.message);
  //   } catch (error) {
  //     setUploadMessage('Error uploading file.');
  //     console.error('Error uploading file:', error);
  //   }
  // };




  async function GetUsers(){ 
    try { 
        const response = await fetch(localStorage.getItem("APIspecialuser") as string, {
            method: 'GET',
            headers: { 
              Accept: 'application/json', 
              'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            },
          } 
        );    
        const json = await response.json();
      
     
        if(response.status==200){ 
        if(localStorage.getItem("GetUser")!=JSON.stringify(json)){
          localStorage.setItem("GetUser",JSON.stringify(json))
        }
        setMyUsers(JSON.stringify(json))
        setChecker(mychecker+=0.009*0.23+0.5)  
        setChecker(mychecker+=0.008*0.23+0.5)  
        }
        return json.movies; 
      } catch (error) {
   
  
      }     
    }

    
    
    const handleToggle = () => {

      setIsToggled(!isToggled);

      
      if(!isToggled){


        


      }
      else{



      }
      
  };






    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const handleClick = (itemId: number) => {
      setCheckedItems(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId]
      }));
    };


    const handleReset = (indices: number[]) => {
      setCheckedItems(prevState => {
        // Filter out the items at specified indices
        const newState = Object.fromEntries(
          Object.entries(prevState).filter(([key]) => !indices.includes(parseInt(key)))
        );
        return newState;
      });
    };

    let [selectedItem, setSelectedItem] = useState(null);
    const handleItemClick = (index:any) => {
      setSelectedItem(index);
    };
    
  return (
    <main  className="min-h-screen" 
    style={{
      padding:10,
    }}
    >
<table
style={{
  width:'100%',
  tableLayout:'fixed'
}}
>
  <tbody>
    <tr>
    <td
    style={{
      width:230
    }}
      >
      
    <table>
      <tbody>
        <tr>
          <td
          style={{
            paddingRight:10
          }}
          >
         {myfullscreen && (
        <Image
      
        onClick={()=>{
         if(isfullscreen===false){
          document.documentElement.requestFullscreen();
          setIsFullscreen(true)
          setMyFullscreen(localStorage.getItem("APIfile")+"/assets/"+"exit.png") 
         }else{
          document.exitFullscreen();
          setIsFullscreen(false)
          setMyFullscreen(localStorage.getItem("APIfile")+"/assets/"+"expand.png") 
         }
        }}
    alt="profile" 
    height="0"
    width="18"
    priority={true}
    style={{width:20, height: "auto" ,
    cursor:'pointer',
    filter:'grayscale(100%)',
  
  }}
  src={myfullscreen}
  ></Image>
      )}

          </td>
          <td      style={{ 
        color:"#A3A3A3",
        fontWeight:'bold',
        fontSize:15,
      }}
      >
     {moduleName}
     </td>
        </tr>
      </tbody>
    </table>
      </td>
      <td
       style={{
        width:'auto',
        flex:1,
        display:'flex',
        justifyContent:'end',
      }}
      >

</td>

    </tr>
  </tbody>
</table>
<div
style={{height:15}}
></div>
<table
style={{
  width:'100%',
  tableLayout:'fixed'
}}
>
  <tbody>
    <tr
    style={{
      borderTop:'1px solid #B7B7B7',
     
    }}
    >
      
      <td
      style={{
        verticalAlign:'top',
        borderRight:'1px solid #B7B7B7',
        width:300
      }}
      >
        <table
        style={{
          display:'table',

        }}
        >
  <tbody>
    <tr>
      <td>
      <div
style={{
  height:15
}}></div>
      </td>
    </tr>
    <tr>
         <td
      style={{ 

        color:"#5C5C5C",
        fontWeight:'bold',
        fontSize:15,
        verticalAlign:'top',
      }}
      >
    Users
      </td>
    </tr>
    <tr>
    <td>

    <div className="csv-uploader-container">
      <input type="file" id="csvFile" accept=".csv" onChange={handleFileUpload} />
      <label htmlFor="csvFile" className="upload-button">Upload CSV</label>
      {fileUploaded && <p className="upload-success">Uploaded file: {fileName}</p>}
      <button 
        className="process-button"
        onClick={handleProcessClick}
        disabled={!fileUploaded}
      >
        Process CSV
      </button>
      <ToastContainer />
    </div>

</td>



         <td>
         <div
      style={{
        paddingRight:10,
        height:'1px',
        backgroundColor:'#B7B7B7'
      }}
>

</div>
      </td>
    </tr>
    <tr>
      <td>
        <div
        style={{height:5}}
        >
          
        </div>
      </td>
      
    </tr>
    <tr>
      <td>
      <TextField 
fullWidth
variant="standard"
InputProps={{disableUnderline:true,
startAdornment:(
<InputAdorment position="start">

{mysearch && (
  <Image
  alt="search" 
  height="20"
  width="20"
  priority={true}
  style={{width:20, height: 'auto' }}
src={mysearch}
></Image>
      )}
  </InputAdorment>
  ),
}}
style={
  { 
    backgroundColor:"#EFEFEF",
    height:40,
    fontSize:13,
    borderRadius:10,
    paddingLeft: 12,
    paddingTop:5,
    paddingRight: 8,
   
  }
  
}
onChange={(v)=>{
  
  }}
placeholder={"search"}
/> 
      </td>
    </tr><tr>
      <td>
        <div
        style={{
          height:5
        }}></div>
      </td>
    </tr>
    <tr>
      <td
      style={{
        width:'100%'
      }}

      >
      {
   JSON.parse(myusers).map((str: {
     [x: string]: ReactNode; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
},index: Key | null | undefined) => {
  
            return ( 
            <div
            className={index === selectedItem ? 'simple-button3':'simple-button30'}
            style={{
            }} 
            onClick={()=>{

           
              handleItemClick(index as null)

              setChecker1(mychecker1+=0.009*0.23+0.5)  
              setChecker1(mychecker1+=0.008*0.23+0.5) 
           
 
              localStorage.setItem('AssignID',str.id as any)




              
            
            }}
            key={index}
            >
              
              <table>
                <tbody>
                  <tr>
                    <td
                    >
                      <Image
  alt="profile" 
  height="0"
  width="50"
  priority={true}
  style={{width:55, height: "auto" ,
borderRadius:100
}}
src={str.picture as string}
></Image> 
                    </td>
                    <td>
                      <div
                      style={{width:5}}
                      >

                      </div>
                    </td>
                    <td>
                    <div
                    style={{
                      fontWeight:'normal'
                    }}
                    >{str.username}</div>
                    </td>
                  </tr>
                </tbody>
              </table>


            </div>
            );
          })
          
          }
      </td>
      <td>
        <div
        
        style={{width:10}}>
          
        </div>
      </td>
    </tr>
  </tbody>
</table>
      </td>
      <td
      style={{
        width:10
      }}
      >
      </td>

      <td
      style={{
        flex:6,
        verticalAlign:"top",
 

      }}
      >
        

        <table style={{
          width:'100%'
        }}>
         <tbody>
    <tr>
      <td>
      <div
style={{
  height:11
}}></div>
      </td>
    </tr>
   

    <tr>
    <td>
      
      <table
      style={{
        width:'100%',
        tableLayout:'fixed'
      }}>
        <tbody>
              <tr>
         <td
      style={{ 
        
        color:"#5C5C5C",
        fontWeight:'bold',
        fontSize:15,
        verticalAlign:'top',
       
      }}
      >
      Platform
                                                                          
      </td>
      <td
      style={{ 
        
        textAlign:'right'

      }}
      >
       <label style={{
      
      justifyContent:'flex-end'
    }}
     className="switch">
            <input type="checkbox" checked={isToggled} onChange={handleToggle} />
            <span className="slider round"></span>
           
        </label>
                                                                          
      </td>

    </tr>
          
        </tbody>
      </table>

    </td>

    </tr>
 
 
      
    
    <tr>
         <td>
         <div
      style={{
        width: "100%",
      
        height:'1px',
        backgroundColor:'#B7B7B7',
        
      }}
>

</div>
     
      </td>
    </tr>


    <tr>

    <td
    
    >

{ 
            <LinkPlatform id = {0}
            globalPlatform={globalPlatform} setGlobalPlatform={setGlobalPlatform}

            isToggled = {isToggled}
           identifier = {'first'} 


           checker={mychecker}/>
           
           }

          

      
    </td>

    
   
  </tr>
          </tbody>
        </table>
      </td>

    
      
      
      <td
      style={{width:10}}
      >
     </td>
        
        <td
         style={{
          borderLeft:'1px solid #B7B7B7',
          verticalAlign:'top',
          flex:6,
  
        }}>

          <table
            style={{
              width:'100%',
              
            }}>
              <tbody>
                <tr>
                  <td style={{
          paddingLeft:15,
            }}>
                <div
              style={{
  
                borderBottom:'1px solid #B7B7B7',
                height:43,
                alignItems:'end', 
                display:'flex',
                
           }} 
          >
            
          
    <table
    style={{
      width:'100%',
    }}
    >
      <tbody>
        <tr
       style={{
        display:'flex',
        alignItems:'end',
       }}
        >
          <td
          style={{
            flex:9,
          }}
          >
          <div
          style={{
            color:"#5C5C5C",
            fontWeight:'bold',
            fontSize:15,
          }}
          >
  Assign Platform
    </div>
          </td>
        
        </tr>
    
      </tbody>
    </table> 
    </div>   
                  </td>
                </tr>
              </tbody>

          </table>
          
          <table
    style={{
      width:'100%',
    }}
    >

            <tbody>
            <tr>
                  <td style={{
          paddingLeft:15,
            }}>
            

            {


        <AssignPlatform id = {myassignid}
        globalPlatform={globalPlatform} setGlobalPlatform={setGlobalPlatform}
        
        identifier={'first'}
        checker={mychecker1}
        />


        }

      </td>





              
              </tr>
            </tbody>
          </table>

          
        </td>
    </tr>
  </tbody>
</table>




    </main>
      ); 
  }
