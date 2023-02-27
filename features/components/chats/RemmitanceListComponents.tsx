import { useRouter } from "next/router"
import { BACK_END } from "../../../clients/localStorage"
import { message } from "../../../types/async-prisma-types"
import { MiladiToShamsi } from "../../../utils/miladi_be_shamsi"

export const RemmitanceListComponent = (props : { messageId: string | number,  detaile : string ,src : string  , username : string , chatid : number , useravatar : string ,lastdate :Date})=>{
  const router = useRouter()
  const {id} = router.query
  const GY = Number(props.lastdate.toString().slice(0,4))
  const GM = Number(props.lastdate.toString().slice(5,7))
  const GD = Number(props.lastdate.toString().slice(8,10))

  // console.log(props.lastdate.toString() , {GY, GM,GD})

  return (
      <div onClick={()=>router.push(`/chat/${props.chatid}`)} className={` hover:bg-beh-gray-light/10 cursor-pointer     hover:rounded-lg w-[90%] mx-auto h-24  border-b-2 border-beh-gray-dark flex flex-row `}>
  
          <div className="flex justify-center items-center w-[80px]  h-full px-1">
            
                
                  
                <>
                  <div className="w-[70px] h-[70px]  bg-beh-gray"> 
                    <img className="w-[70px] h-[70px]  " src={BACK_END+props.src} />
          
                  </div>
                </>
                
              
          </div>
  
  
  
          <div className="flex justify-end items-center text-left w-full h-full px-2 ">
            <div className="w-full">
              <h1 className="font-[500] text-center text-lg px-1">
                {props.username} 
              </h1>
  
              <h2 className="text-center">
                {/* {props.messageList.at(0)?.text?.slice(0,14)  ? `${props.messageList.at(0)?.text?.slice(0,14)}...`: 'پیامی موجود نیست'} */}
                {MiladiToShamsi(GY,GM ,GD)}
              </h2>
              
              <h3 className="text-center">
                {props.detaile}
              </h3>
            </div>
          </div>
  
          <div className="flex justify-center items-center  h-full p-1">
            <div className="w-[70px] h-[70px] rounded-full bg-beh-gray"> 
              <img className="w-[70px] h-[70px] rounded-full " src={props.useravatar} />
            </div>
          </div>
  
          
      </div>
    )
}
  