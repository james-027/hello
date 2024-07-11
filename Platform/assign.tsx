'use client';
import "./style.css"
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from 'react';
import Image from 'next/image'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion,AnimatePresence } from "framer-motion";
import DashboardLink from "../Dashboard/link";
import AssignPlatformLink from '../Platform/assign';
import { tr } from "date-fns/locale";
interface ContainerProps { 
 checker: any;
  identifier:any;
  id:any;
  globalPlatform:any, 
  setGlobalPlatform: React.Dispatch<React.SetStateAction<string>>;

}  
export default function Container({id,checker,identifier,globalPlatform,setGlobalPlatform}: ContainerProps) { 
let [myplatform, setMyPlatform] = useState("[]");
let [myOpenAssign, setMyOpenAssignPlatform] = useState("[]");
let [myAssignPlatform, setMyAssignPlatform] = useState("[]");
let [myplatformID,setPlatformID] = useState("");
let [assign, setAssign] = useState("[]");
let [opendashboard,setMyDashboard] = useState("[]");
let [myspace,setMySpace] = useState(0);
let [myarrow,setMyArrow] = useState('');
let [openplatform,setMyOpenPlatform] = useState("[]")
let [myformcount,setMyFormCount] = useState(1)
let [mydroparrow,setMyDropArrow] = useState("");
let [mychecker,setChecker] = useState(checker)
  useEffect(() => {  

    
   

    if(identifier === 'first'){
        AssignPlatform()
    }
    else{
        GetLinkAssignPlatform()
        setMySpace(35)
    }
    
   

    if(typeof window!== 'undefined'){ 
        
      setMyDropArrow(localStorage.getItem("APIfile")+"/assets/"+"droparrow.png") 
      setMyArrow(localStorage.getItem("APIfile")+"/assets/"+"arrow.png");
    }
document.body.style.background = "white";
  }, [globalPlatform,checker]); 




  
  async function AssignPlatform() {

    var platforms = []
    try {  
      const response = await fetch(localStorage.getItem("APIassignplatform")+""+id+"/", {
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

    setMyAssignPlatform(JSON.stringify(platforms))
 
  }


  async function GetLinkAssignPlatform(){  


    var platforms = []
    try {  
      const response = await fetch(localStorage.getItem("APIgetlinkplatform")+""+id+"/", {
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
 
console.log(error)
    }

    setMyAssignPlatform(JSON.stringify(platforms))
  }






  return (

  
    <div>

   

 {
   JSON.parse(myAssignPlatform).map((str: {
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
                 cursor:'default',
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
   

   onClick={()=>{


   

  
   
   localStorage.setItem('LinkPlatformID',str.id as any)


    
     
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
           <tr>
             <td>
             <Image  
             draggable={false}
             onClick={()=>{

             
               
             }} 
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
              
                       <AssignPlatformLink id = {str.id}
                       globalPlatform={globalPlatform} setGlobalPlatform={setGlobalPlatform}

                  
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
