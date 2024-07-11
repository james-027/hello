'use client';
import "./style.css"
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from 'react';
import Image from 'next/image'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion,AnimatePresence } from "framer-motion";
import DashboardLink from "../Dashboard/link";

interface ContainerProps { 
  id: string; 
  show:boolean;
  setGlobalString: React.Dispatch<React.SetStateAction<string>>;
}  
export default function Container({id,show, setGlobalString}: ContainerProps) { 
let [myplatform, setMyPlatform] = useState("[]");
let [opendashboard,setMyDashboard] = useState("[]");
let [myarrow,setMyArrow] = useState('');
let [myformcount,setMyFormCount] = useState(1)
  useEffect(() => {  
    platform()
    if(typeof window!== 'undefined'){ 
      setMyArrow(localStorage.getItem("APIfile")+"/assets/"+"arrow.png");
    }
document.body.style.background = "white";
  }, []); 

  async function platform(){  
    var platforms = "[]"
    try {  
      const response = await fetch(localStorage.getItem("APIspecialplatform")+""+id+"/", {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
        } 
      );  
      const json = await response.json();
  
      if(response.status==200){  

      var y = []
      for(var i=0;i<json.length;i++){
        y.push(false) 
      } 
      if(localStorage.getItem("platform"+""+id)!=json){ 
        platforms = JSON.stringify(json)
        localStorage.setItem("platform"+""+id,JSON.stringify(json))
      }else{ 
        platforms = localStorage.getItem("platform"+""+id) as any;
      }
      setMyDashboard(JSON.stringify(y));
      }
    } catch (error) {
 

    }
    setMyPlatform(platforms)
  }
  async function PostForm(){ 
    toast.dark("Creating...")
    try {  
      const response = await fetch(localStorage.getItem("APIspecialform") as string, {
          method: 'POST',
          headers: { 
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
        } 
      );    
      const json = await response.json();
      if(response.status==200){ 
      if(localStorage.getItem("GetForm")!=JSON.stringify(json)){
        localStorage.setItem("GetForm",JSON.stringify(json))
        localStorage.setItem('FormID', json[0]['id']);
        localStorage.setItem('Formname', json[0]['title']);
        localStorage.setItem('PageID',"0")
        setGlobalString("CREATE FORM")
      }else{ 
        setGlobalString("CREATE FORM")
        localStorage.setItem('PageID',"0")
      }
      }
    } catch (error) {}     
  }



  return (
    <div>
      {
   JSON.parse(myplatform).map((str: {
     [x: string]: ReactNode; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
},index: Key | null | undefined) => {


            return ( 
            <div
            key={index}
            >
<table
className={str.count!=0 ? "":"dashboard"}
>
  <tbody
  >
    <tr
    
    style={{
      cursor:'pointer'
    }}
                onClick={async ()=>{
                  localStorage.setItem('AssignID',"")

                  if(JSON.parse(opendashboard)[index as number]===false){
                    var y = JSON.parse(opendashboard)
                    y[index as number]=true
                      setMyDashboard(JSON.stringify(y))
                     }else if(JSON.parse(opendashboard)[index as number]===true){
                      var y = JSON.parse(opendashboard)
                      y[index as number]=false
                      setMyDashboard(JSON.stringify(y))
                     }else{
                       var y = JSON.parse(opendashboard)
                       y[index as number]=true
                       setMyDashboard(JSON.stringify(y)) 
                     }  
                     
                 if(str.count===0){
                  localStorage.setItem('ModuleName', str.description as string);
                  if(str.description==="CREATE FORM"){
                    if(myformcount===1){
                      PostForm()
                      setMyFormCount(0)
                    } 
                  }else{
                    setMyFormCount(1)
                    setGlobalString(str.description as any)
                  }
                 }
                }}
    >
      <td

      style={{
        paddingBottom:10,
        height:35,width:35}}
      >
      <Image
            draggable={false}
  alt="profile" 
  height="0"
  width="0"
  priority={true}
  style={{
    filter:'grayscale(100%)',
    width:'auto', height: "auto" }}
src={str.icon as string}
></Image>
      </td>
      <td
      style={{
        width:10
      }}
      ></td>
      <td
      hidden={!show}
      
      style={{ 
        color:"#A3A3A3",
        fontWeight:'bold',
        fontSize:14,
        width:180,
        height:35}}
      >

      {str.label}
 
      </td>
      <td
      hidden={!show}
      style={{
        paddingBottom:10,
        height:25,width:25}}
      >
        <>
<motion.div 
 animate={{ rotate: JSON.parse(opendashboard)[index as number] ? 180 : 0 }}
 
 >
{myarrow && ( 
     <Image
     hidden={str.count!=0?false:true}
     alt="arrow" 
     height="0"
     width="30"
     priority={true}
     style={{
       filter:'grayscale(100%)',
       width:35, height: "auto" }}
   src={myarrow as string}
   ></Image>
)}


</motion.div>
</>

      </td>
    </tr>
  </tbody>
</table>
<table
      hidden={!show}
>
  <tbody>
  <tr>
      <td
      style={{
        paddingLeft:35
      }}>
      <AnimatePresence>
          {
         JSON.parse(opendashboard)[index as number] && (
            <motion.div
          initial={{opacity:0,height:0}}
          animate={{opacity:1,height:'auto'}}
          exit={{opacity:0,height:0}}
            >
                  {
  <DashboardLink id={str.id as any} show={show} setGlobalString={ setGlobalString}></DashboardLink>
          
          }
           
    
            </motion.div>
          )}
        </AnimatePresence>
      </td>
    </tr>
  </tbody>
</table>

            </div>
            );
          })
        }
    </div>
      ); 
  }
