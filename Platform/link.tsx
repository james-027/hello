'use client';
import "./style.css"
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode,SetStateAction, ReactPortal, useEffect, useState} from 'react';
import Image from 'next/image'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion,AnimatePresence } from "framer-motion";
import DashboardLink from "../Dashboard/link";
import LinkPlatform from '../Platform/link';
import AssignPlatform from '../Platform/assign';
import Platform from '../Platform/page';
import { tr } from "date-fns/locale";
interface ContainerProps { 
 checker: any;
  identifier:any;
  id:any
  globalPlatform:any, 
  setGlobalPlatform: React.Dispatch<React.SetStateAction<string>>;
  isToggled:boolean;
}  


export default function Container({id,checker,identifier,globalPlatform,setGlobalPlatform,isToggled}: ContainerProps) { 
let [myplatform, setMyPlatform] = useState("[]");

const [myPlatformID, setmyPlatformID] = useState<string | null>(null);
let [opendashboard,setMyDashboard] = useState("[]");
let [myAssign,setAssign] = useState("[]");
let [myspace,setMySpace] = useState(0);
let [mychecker,setChecker] = useState(checker) 
let [mychecker1,setChecker1] = useState(0)
let [myarrow,setMyArrow] = useState('');
let [openplatform,setMyOpenPlatform] = useState("[]")
let [myformcount,setMyFormCount] = useState(1)
let [mydroparrow,setMyDropArrow] = useState("");
  useEffect(() => {  

    setChecker(mychecker+=0.009*0.42+0.2)  

 


    if(identifier === 'first'){
        GetPlatform();
    }

    else{
        floatingPlatform()
        setMySpace(35)
    }
   



  
    if(typeof window!== 'undefined'){ 
      let storePlatformID = localStorage.getItem('LinkPlatformID');
      setMyDropArrow(localStorage.getItem("APIfile")+"/assets/"+"droparrow.png") 
      setMyArrow(localStorage.getItem("APIfile")+"/assets/"+"arrow.png");

    if(storePlatformID){
      setmyPlatformID(storePlatformID)
    }else{
      

    }

    }
document.body.style.background = "white";
  }, [checker,isToggled]); 




  async function GetPlatform() {

    
    var platforms = []
    try {  
      const response = await fetch(localStorage.getItem("APIfloatingplatform") as any, {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
        } 
      );  


      const json = await response.json();


      if(response.status==200){  

        platforms = json

        var y = []
        for(var i=0;i<json.length;i++){
          y.push(false) 
        } 
    
        setMyOpenPlatform(JSON.stringify(y));

      }
    } catch (error) {
 

    }

    setMyPlatform(JSON.stringify(platforms))
 
  }


  async function floatingPlatform(){  


    var platforms = []
    try {  
      const response = await fetch(localStorage.getItem("APIfloatingplatform")+""+id+"/", {
          method: 'GET',
          headers: {
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
        } 
      );  
      const json = await response.json();

      if(response.status==200){  
 
        platforms = json

        
        var y = []
        for(var i=0;i<json.length;i++){
          y.push(false) 
        } 
    
      setMyOpenPlatform(JSON.stringify(y));

    

      }
    } catch (error) {

      
 

    }

 setMyPlatform(JSON.stringify(platforms))
  }


  
  
  async function PostAllPlatform(id:any){

    
    try { 
      const response = await fetch(localStorage.getItem("APIpostallplatform")+""+localStorage.getItem('AssignID'), {
          method: 'POST',
          headers: { 
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            platform_id:id
          }),
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
  async function PostPlatform(id:any){


    try {  
      const response = await fetch(localStorage.getItem("APIassignplatform")+""+localStorage.getItem('AssignID'), {
          method: 'POST',
          headers: { 
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            platform_id:id
          }),
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

      
  async function PatchForm(id:any){
    try { 
      const response = await fetch(localStorage.getItem("APIgetlinkplatform")+""+ myPlatformID,{
          method: 'PATCH',
          headers: { 
            Accept: 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            platform_id:id
          }),
        } 
      );    
      const json = await response.json();

      console.log(json);
      if(response.status==200){ 
        setChecker(mychecker+=0.009*0.42+0.2) 
        setGlobalPlatform(globalPlatform+=0.009*0.42+0.2) 

      } else if(response.status===404){
        toast.error(json['Message'])
      }
    } catch (error) {
    } 
    }


      
  
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (event: any, item: SetStateAction<null>) => {
    setDraggedItem(item);
  };



  const handleDragOver = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  };

  const handleDrop = (event: { preventDefault: () => void; }) =>  {
    event.preventDefault();
    


  }; 
  let [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (index:any) => {
    setSelectedItem(index);
  };



  return (

  
    <div>
       
      {
   JSON.parse(myplatform).map((str: {
     [x: string]: ReactNode; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
},index: Key | null | undefined) => {


            return ( 
                <div 
                style={{ 
                  paddingLeft:myspace,
                }}
                  key={index}
                  >
      
                 
           <table
                    style={{
                      width:'100%',
                    }}
                    >
                      <tbody
                  
                      >
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
                          <button
      
                     className="simple-button11"
      
                     >
              
              <table
            style={{
              width:"100%",
              
            }}
          >
            <tbody>
              <tr

              draggable
   
              onDragEnd={()=>{  
                

            
              }}
   
              onDragStart={(event) => { 
           
             }
   
           
              }
              style={{display:'flex',
    
              }}
              >
              <td
                style={{
   
                 flex:9,
                 width:'100%',
                 cursor:'default'
               }}
                >
            <table
         style={{
           width:'100%',
         }}
         >
           <tbody
           >
             <tr
             >
               <td>
               <table
               style={{
                 width:'100%',
               }}
               >
   <tbody>
   <tr
   style={{
     display:'flex',
     cursor:'pointer',
     
   }}
   
   draggable
   onDragStart={(event) => handleDragStart(event,str.id as any)}

   onClick={()=>{






              
  if(!isToggled){
    setChecker1(mychecker1+=0.009*0.42+0.2) 
      console.log('false',str.id)
      PostPlatform(str.id)
  }
  else{
    setChecker1(mychecker1+=0.009*0.42+0.2) 
    console.log('true',str.id)
    PostAllPlatform(str.id)

  }


  if(myPlatformID){
    PatchForm(str.id);
  }else{
    
  }




 
     
   }} 
   >
          <td
          style={{
           display:'flex',
           justifyContent:'center',
           alignItems:'center',
           
           
          }}
          > 
       <table>
         <tbody>
           <tr >
             <td
            
               
             >
             <Image  
             
        alt="profile"  
        height="0"
        width="15"
        priority={true}
        style={{width:20, height: "auto" ,cursor:'pointer',filter:'grayscale(100%)'
      }}
      src={str.icon as string}
      ></Image> 
             </td>
           </tr> 
         </tbody>
       </table>
          </td>
          <td
          >
                            <div
                            style={{width:5}}
                            >
      
                            </div>
                          </td> 
                          <td
                               style={{
                                 flex:1,
                                 display:'flex',
                                 justifyContent:'center',
                                 alignItems:'center',
                                }}
                          >
                          <div
                          style={{
                           width:'100%',
              color:"#5C5C5C",
              fontWeight:'bold',
              fontSize:15,
              textAlign:'left'
                          }}
                          >  

                          {str.label}
                        </div>
                          </td>
                        
        </tr>
   </tbody>
      </table>
               </td>
             </tr>
           </tbody>
         </table>
                </td>
                <td
                style={{
                  display:'flex',
                  justifyContent:'end',
                }}
                > 
      <table
      
      >
     <tbody>
       <tr>
      
         <td
         style={{
          paddingLeft:10,
         }}
         >
         <> 
   <motion.div 
    animate={{ rotate: JSON.parse(openplatform)[index as number] ? 180 : 0 }}>
   {mydroparrow && (
         <Image
         draggable={false}
         onClick={async ()=>{
           if(JSON.parse(openplatform)[index as number]===false){
          var y = JSON.parse(openplatform)
          console.log(y)
          y[index as number]=true
            setMyOpenPlatform(JSON.stringify(y))
           }else if(JSON.parse(openplatform)[index as number]===true){
            var y = JSON.parse(openplatform)
            y[index as number]=false
              setMyOpenPlatform(JSON.stringify(y))
           }else{
             var y = JSON.parse(openplatform)
             y[index as number]=true
             setMyOpenPlatform(JSON.stringify(y)) 
           }
         
             }}
         alt="search"
         height="10"
         width="10"
         priority={true}
         style={{
           filter:'grayscale(100%)',
           width:10, height: 10, 
         cursor:'pointer'
         }}
       src={mydroparrow}
       ></Image>
         )}
   </motion.div>
   </>
   
         </td>

         <td><div
         style={{
           width:10
         }}
         ></div></td>
       </tr>
     </tbody>
   </table>
                </td>
              </tr>
            
            </tbody>
          </table>
                     </button>
                          </td>
                       
                        </tr>
                      </tbody>
                    </table>
       
         <AnimatePresence> 
                {JSON.parse(openplatform)[index as number]  && (
                  <motion.div
                initial={{opacity:0,height:0}}
                animate={{opacity:1,height:'auto'}}
                exit={{opacity:0,height:0}}

                
                  >
              { 
                       <LinkPlatform id = {str.id}
                       globalPlatform={globalPlatform} setGlobalPlatform={setGlobalPlatform}
                      isToggled
                  
                       identifier = {'second'} 
            
                       checker={checker

                       }/>
              }
         

                  </motion.div>
                )}
              </AnimatePresence>
       
       
       
       
       
       
       
                     
                  </div>
            );
          })
        }


    </div>
    


        


    
    

    
      ); 
  }
