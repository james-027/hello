'use client';
import "./style.css"
import {AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal,  useRef,useEffect, useState, ChangeEvent} from 'react';
import Image from 'next/image' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion,AnimatePresence } from "framer-motion";
import TextField from "@mui/material/TextField";
import InputAdorment from "@mui/material/InputAdornment";
import User from '../User/page';
import Form from '../Form/page'; 
import CreateForm from '../CreateForm/page'
import CreateReport from '../CreateReport/page'
import Platform from '../Platform/page'; 
import Assignment from '../Assignment/page';
import DashboardLink from "../Dashboard/link";
import Approval from "../Approval/page";
import Report from "../Report/page";  
import { useRouter } from 'next/navigation'
import csvParser from 'csv-parser';



import { 
  useGlobalString,GlobalStateProvider,
  useGlobalFocus,useGlobalChecker,
  useGlobalMobile,useGlobalOperation,
  useGlobalId,useGlobalOnce,
  useGlobalPost,
  useGlobalPlatform
} from '../globalStateContext'; 
export default function Container() {  
 const router = useRouter()
  const [myglobalstatus, setMyGlobalStatus] = useState(0);
  const [mytemporary, setMyTemporary] = useState("[]");
  const [mycontainer, setMyContainer] = useState(false);
  const [viewheart, setMyViewHeart] = useState(true);
  const [mystart, setMyStart] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
 


  

  async function RemoveNotification(){ 
 
    try { 
        const response = await fetch(localStorage.getItem("APInotificationremover") as string, {
            method: 'PATCH',
            headers: { 
              Accept: 'application/json', 
              'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            },
          }  
        );    
        const json = await response.json();
      } catch (error) {
    
  
      } 

    }
  async function GetNotification(){ 

    try { 
        const response = await fetch(localStorage.getItem("APInotificationform") as string, {
            method: 'GET',
            headers: { 
              Accept: 'application/json', 
              'Authorization': `Bearer ${localStorage.getItem("Token")}`,
            },
          }  
        );    
        const json = await response.json();
        if(response.status==200){  
          if(localStorage.getItem('GetNotification')!=JSON.stringify(json)){ 
            localStorage.setItem('GetNotification',JSON.stringify(json)) 
          }
        }else if(response.status==401){ 
          router.push("/Login")
        }  
      } catch (error) {

  
      } 

    }

    const startTimer = () => {  

      setSeconds(3)   
      const newTimerId = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(newTimerId);
            setMyContainer(false)   
            setHeight(0.00000001);  
            setWidth(0.000000001);    
            setMyViewHeart(false) 
            localStorage.setItem('allow',"on") 
            RemoveNotification()      
            return 0;
          }
          return prevSeconds - 1;
        });
  
      }, 1000);
    }; 
 
    async function GetTemporaryNotification(){   
    const eventSource = new EventSource(localStorage.getItem("APInotificationtemporary")+"?token="+localStorage.getItem('Token'));
    eventSource.onmessage = function(event) { 
     setMyTemporary(event.data)   
        if(JSON.parse(event.data).length!=0){
          if(localStorage.getItem('GetTemporaryNotification')!=event.data){ 
            setMyGlobalStatus(myglobalstatus+0.33*0.312323/0.3434+0.343) 
            setMyGlobalStatus(myglobalstatus+0.33*0.312323*0.3434/0.55+0.343)  
            const audio = new Audio(JSON.parse(event.data)[JSON.parse(event.data).length-1]['sound']);
            audio.play(); 
           localStorage.setItem('GetTemporaryNotification',event.data)
           if(JSON.parse(event.data).length>18){
            setHeight(50*JSON.parse(event.data).length+240);   
           }else  if(JSON.parse(event.data).length>14){
            setHeight(50*JSON.parse(event.data).length+200);  
           }else   if(JSON.parse(event.data).length>10){
            setHeight(50*JSON.parse(event.data).length+160);  
           }else if(JSON.parse(event.data).length>7){
            setHeight(50*JSON.parse(event.data).length+120);  
           }else{
            setHeight(50*JSON.parse(event.data).length+80);  
           } 
           if( localStorage.getItem('allow') ==='on'){   

            setWidth(420);       
            setMyViewHeart(false) 
            setMyContainer(true)     
            localStorage.setItem('allow',"off")  
            startTimer()  
           }else{ 

            setSeconds(4);   
           } 
          }
        }
    };
    
    eventSource.onerror = function(error) {

    }; 
    
  

 
   
      }
 
 
 


  const [seconds, setSeconds] = useState(5);
  const [setonce, setOnce] = useState('on');




  useEffect(() => { 
    if (typeof window !== 'undefined') {

      setScreenWidth(window.screen.availWidth); 
      setScreenHeight(50);
   //   setScreenHeight(window.screen.availHeight);
      
    }
  

    
    if(setonce==="on"){
      setOnce("off") 
      localStorage.setItem('allow',"on") 
    }

    const handleUserInteraction = () => {
   setTimeout(() => { 
      GetTemporaryNotification() 
    },1000);
      events.forEach(event => { 
        window.removeEventListener(event, handleUserInteraction);
      });
    };
 
    const events = ['mousedown', 'keypress', 'touchstart'];

    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction);
    });
 

  

    
    GetNotification()

  
    

 /*
if(screenWidth===0){
  setTimeout(() => { 
    setMyViewHeart(true)
    const div = divRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawGlowingHeart = (x: number, y: number, size: number) => {
      const halfSize = size / 2;
    
      ctx.save();
      ctx.shadowColor = 'red';
      ctx.shadowBlur = 30;
      ctx.strokeStyle = 'red'; 
      ctx.lineWidth = 2;
    
      ctx.beginPath();
    
      // Start at the bottom tip of the heart
      ctx.moveTo(x, y + halfSize);
    
      // Bottom left curve
      ctx.bezierCurveTo(x + size, y + halfSize / 2, x + size / 2, y - halfSize / 2, x, y - halfSize / 4);
    
      // Top left curve
      ctx.bezierCurveTo(x - size / 2, y - size, x - size, y - halfSize / 2, x, y + halfSize);
    
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    };
    

     const drawSquareGlowingHeart = (w: number, h: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      const heartSize = 45;
      const x = (canvas.width - heartSize) - 5;
      const y = (canvas.height - heartSize) - 7;
      drawGlowingHeart(x, y, heartSize); 
      drawGlowingHeart(x, y, heartSize); 
      drawGlowingHeart(x, y, heartSize); 
      drawGlowingHeart(x, y, heartSize); 
      drawGlowingHeart(x, y, heartSize); 
      drawGlowingHeart(x, y, heartSize); 
    };

    const moveRandomly = () => {
      if (!div) return;
      const newX = Math.random() * (window.screen.availWidth - canvas.width);
      const newY = Math.random() * (window.screen.availHeight - canvas.height-100);
      div.style.transition = 'transform 7s ease-in-out';
      div.style.transform = `translate(${newX}px, ${newY}px)`;
      setTimeout(() => { 
        moveRandomly(); 
      },7000);
      
    };

    drawSquareGlowingHeart(width, height); 
  //  moveRandomly();  
    setMyStart(false)
  },100);
} 
*/
/*
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext('2d');
if (!ctx) return;

const drawGlowingHeart = (x: number, y: number, size: number) => {
  const halfSize = size / 2;

  ctx.save();
  ctx.shadowColor = 'red';
  ctx.shadowBlur = 30; 
  ctx.strokeStyle = 'red'; 
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x, y + halfSize);
  ctx.bezierCurveTo(x + size, y + halfSize / 2, x + size / 2, y - halfSize / 2, x, y - halfSize / 4);
  ctx.bezierCurveTo(x - size / 2, y - size, x - size, y - halfSize / 2, x, y + halfSize);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
};


 const drawSquareGlowingHeart = (w: number, h: number) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  const heartSize = 45;
  const x = (canvas.width - heartSize) - 5;
  const y = (canvas.height - heartSize) - 7;
  drawGlowingHeart(x, y, heartSize); 
  drawGlowingHeart(x, y, heartSize); 
  drawGlowingHeart(x, y, heartSize); 
  drawGlowingHeart(x, y, heartSize); 
  drawGlowingHeart(x, y, heartSize); 
  drawGlowingHeart(x, y, heartSize); 
}; 
 
drawSquareGlowingHeart(width, height); 
*/
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      }); 
    };
  }, [width, height,router]); 
 

  return (
<GlobalStateProvider>
  
   <div style={{
    position:'absolute',
    display:"flex", justifyContent: 'end' }}>  
          {screenWidth!=0 && (
           <motion.div
           onAnimationComplete={()=>{
          if(seconds===0){
            setMyContainer(false)   
            setHeight(0);  
            setWidth(0);    
            setMyViewHeart(true) 
          }

          }}
             ref={divRef}
             style={{ 
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
               borderRadius: 15,
               zIndex: 1,
               backgroundColor: '#100606',
               position: 'absolute',
               x:mystart ?  screenWidth /1.014 :  null as any,
               y:mystart ?  screenHeight/4.4 : null as any
             }}  
             animate={{ width:width, height:height }}
             transition={{ /*type: "spring",*/ stiffness: 120 }}
             
           >
    
    {viewheart && (
    <AnimatePresence>
    {viewheart && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 3 }} // Adjust the duration to 3 seconds
      >
       <canvas
       ref={canvasRef}
       width={width}
       height={height}
     ></canvas>  
  
      </motion.div>
    )}
  </AnimatePresence>
  )}

    {mycontainer&& (
        <AnimatePresence>
        {mycontainer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >

       <div
       style={{
        display:'flex',
        flexDirection:'column',
paddingLeft:20,
paddingRight:20,
       }}
       >
       { 
   JSON.parse(mytemporary).map((str: {
     [x: string]: ReactNode; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; 
},index: Key | null | undefined) => {
 
            return (  
            <div
            style={{paddingTop:5,
              paddingBottom:5,

            }} 
            onClick={()=>{
            
            }}
            key={index}
            >
              
              <table>
                <tbody>
                  <tr
                  style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',

                  }}
                  >
                  <td
                  style={{
                  }}
                  >
               <Image
  alt="profile"  
  height="0"
  width="38"
  priority={true}
  style={{width:40, height: 40 ,
}}
src={str.icon as string} 
></Image>  
               </td>
               <td
               style={{

                flex:1
               }}
               ></td>
                  <td
                  style={{  
                    fontSize:15,
                    

                    color:'white',
                    fontWeight:'bold',
                  }}
                  >
           {str.title}
               </td>
                  </tr>
                </tbody>
              </table>


            </div>
            );
          })
          
          }
       </div>
      
          </motion.div>
        )}
      </AnimatePresence>

  )}

          
           </motion.div> 
      )}

      </div> 
<MyComponent
globalStatus={myglobalstatus} setGlobalStatus={setMyGlobalStatus as any}
/>
    </GlobalStateProvider>
      ); 
  }
  type ContainerProps = {
    globalStatus:any, 
    setGlobalStatus: React.Dispatch<React.SetStateAction<string>>;
  }; 
  const MyComponent = ({globalStatus,setGlobalStatus}: ContainerProps) => {
  let [widthwindow,setWidthWindow] = useState(0)
  let [myfullname,setMyFullname] = useState("");
  let [myusername,setMyUsername] = useState("");
  let [myformcount,setMyFormCount] = useState(1)
let [mysearch,setMySearch] = useState(''); 
let [myarrow,setMyArrow] = useState('');
let [myprofile,setMyProfile] = useState('');
let [mywebid,setMyWebId] = useState('');
var gotwebid = ""
const [csvData, setCsvData] = useState<any[]>([]);

  useEffect(() => {

    if(typeof window!== 'undefined'){ 
      gotwebid = localStorage.getItem('WebID') as string;
      setMySearch(localStorage.getItem("APIfile")+"/assets/"+"search.png");
      setMyArrow(localStorage.getItem("APIfile")+"/assets/"+"arrow.png");
      setMyProfile(localStorage.getItem('ProfilePic') as string);
      setMyFullname(localStorage.getItem("Fullname") as string);
     setMyUsername(localStorage.getItem("Username") as string);
    }
    setMyWebId(gotwebid)
setWidthWindow(window.screen.availWidth);
document.body.style.background = "white";
  }, []); 
  let [open, setOpen] = useState(true);
  let [showProfile, setProfile] = useState(false);
  const { globalString , setGlobalString } = useGlobalString()
  const { globalChecker , setGlobalChecker} = useGlobalChecker()
  const { globalFocus , setGlobalFocus} = useGlobalFocus()
  const { globalMobile , setGlobalMobile} = useGlobalMobile()
  const { globalOperation , setGlobalOperation} = useGlobalOperation()
  const { globalId , setGlobalId} = useGlobalId()
  const { globalOnce , setGlobalOnce} = useGlobalOnce()
  const { globalPost , setGlobalPost} = useGlobalPost()
  const { globalPlatform , setGlobalPlatform} = useGlobalPlatform()

 
    return (

      
      <main className="flex min-h-screen"
    style={{
    }}>

<table>
<tbody>
<tr>
  
<td
style={{
  backgroundColor:"#FDE8EA",
  height:10,
  verticalAlign:'top'
}}
>
<>
<motion.div 
onClick={()=>{
  setOpen(true);
}}
 onAnimationComplete={()=>{
  if(open==true){
    setProfile(true)
  }else{
    setProfile(false)
  }
}}
style={{
  backgroundColor:"#FDE8EA",

}}
  transition={{ type: "spring", stiffness: 100 }}
  animate={{ 
    width: open ? "300px" : "65px",
}}
  >
   <div
    style={{
      height:8
    }}>

    </div>
    <div
style={{
  flex:1,
  display:'flex',
  paddingLeft:4.3,
  justifyContent:"start",
}}
>

<table>
  <tbody>
    <tr>
<td>

{myprofile && (
  <Image
  draggable={false}
  alt="profile" 
  height="0"
  width="50"
  priority={true}
  style={{width:55, height: "auto" ,
  cursor:'default',
borderRadius:100
}}
src={myprofile}
></Image>
      )}

</td>
<td>
  
<div
hidden={!showProfile}
style={{
  cursor:'default',
  height:17,
  fontSize:15,
  paddingLeft:10,
  color:"#A3A3A3"
}}
>{myfullname}</div>
<div
hidden={!showProfile}
style={{
  cursor:'default',
  fontSize:15,
  paddingLeft:10,
  color:"#A3A3A3",
  fontWeight:"bold"
}}
>{myusername}</div>
  
</td>
    </tr>

  </tbody>
</table>
</div>  
<div
style={{
  height:8
}}
>
</div>
<div
style={{
  flex:1,
  display:'flex',
  paddingLeft:10,
  justifyContent:"start",
}}
>

<table>
  <tbody>
    <tr>

<td>
<>
<motion.div 
 animate={{ width: open ? "260px" : "40px" }}>


<TextField 
fullWidth
variant="standard"
InputProps={{disableUnderline:true,
startAdornment:(
<InputAdorment position="start">
<>
<motion.div 
 animate={{ width: open ? "20px" : "20px" }}>

{mysearch && (
  <Image
  draggable={false}
  alt="search"
  height="0"
  width="0"
  priority={true}
  style={{width:'auto', height: 'auto' }}
src={mysearch}
></Image>
      )}

</motion.div>
</>
  </InputAdorment>
  ),
}}
style={
  { 
    backgroundColor:open?"#EFDBDD":"#FDE8EA",
    height:40,
    fontSize:13,
    borderRadius:100,
    paddingLeft: 12,
    paddingTop:5,
    paddingRight: 8,
   
  }
  
}
onChange={(v)=>{
  
  }}
placeholder={open?"Search":""}
/> 


</motion.div>
</>
</td>

    </tr>

  </tbody>
</table>


</div> 


<div
style={{height:10}}
></div>
<div
style={{
  flex:1,
  display:'flex',
  paddingLeft:13,
  justifyContent:"start",
  
}}
>

<table>
  <tbody>
    <tr>
<td
 
>

  
  
{mywebid && (
   <DashboardLink id={mywebid as any} show={showProfile} setGlobalString={setGlobalString}></DashboardLink>
      )}
</td>
    </tr>
  </tbody>
</table>


</div>  
   </motion.div>
   </>
  </td>
 
  <td
  onClick={()=>{
    setOpen(false)
    setProfile(false) 
  }}
  >
    
    <>
<motion.div 
onClick={()=>{
  setOpen(true);
}}
 onAnimationComplete={()=>{
  if(open==true){
    setProfile(true)
  }else{
    setProfile(false)
  }
}}

  transition={{ type: "spring", stiffness: 100 }}
  animate={{ 
    width: open ? widthwindow-321:widthwindow-86,
    display:'flex',
    overflow:'hidden',
    flex:1,
}}
  >  
    {
      
    globalString === 'CREATE USER' ? (<User/>) 
    :globalString === 'PLATFORM PERMISSION' ? (<Platform 
      globalPlatform={globalPlatform} setGlobalPlatform={setGlobalPlatform}
    />)
    :globalString === 'PLOTTING' ?(<Report  setGlobalString={setGlobalString}/>)
    :globalString === 'FORM LIST' ?(<Form  setGlobalString={setGlobalString}/>)
    :globalString === 'FORM ASSIGNMENT' ?(<Assignment/>)
    :globalString === 'APPROVAL' ?(<Approval 
      globalChecker={globalChecker}setGlobalChecker={setGlobalChecker}
      globalPost={globalPost} setGlobalPost={setGlobalPost}
      globalStatus={globalStatus} setGlobalStatus={setGlobalStatus}/>)
    :globalString === 'CREATE FORM' ?(<CreateForm  
      globalPost={globalPost} setGlobalPost={setGlobalPost}
      globalOnce={globalOnce} setGlobalOnce={setGlobalOnce}
      globalId={globalId} setGlobalId={setGlobalId}
      globalOperation={globalOperation} setGlobalOperation={setGlobalOperation}
      globalMobile={globalMobile} setGlobalMobile={setGlobalMobile}
      globalFocus={globalFocus}setGlobalFocus={setGlobalFocus}
      globalChecker={globalChecker}setGlobalChecker={setGlobalChecker}
      />)
      :globalString === 'CREATE REPORT' ?(<CreateReport  
        globalPost={globalPost} setGlobalPost={setGlobalPost}
        globalOnce={globalOnce} setGlobalOnce={setGlobalOnce}
        globalId={globalId} setGlobalId={setGlobalId}
        globalOperation={globalOperation} setGlobalOperation={setGlobalOperation}
        globalMobile={globalMobile} setGlobalMobile={setGlobalMobile}
        globalFocus={globalFocus}setGlobalFocus={setGlobalFocus}
        globalChecker={globalChecker}setGlobalChecker={setGlobalChecker}
        />)
    :(<></>)
    
    }

  </motion.div>
  </>
  
  </td>

  
</tr>
</tbody>
</table>

<ToastContainer
toastStyle={{ backgroundColor: "#F5F5F5",color:"black" }}
 position="bottom-center"
 autoClose={4000}
 hideProgressBar={true}
 closeButton={false}
/>
    </main>
    );

   

  };