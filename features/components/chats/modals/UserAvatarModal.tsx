import { ChatDetailesModels } from "../../../../types/chat-datailes"

export const UserAvatarModel = (props : {avatar : string , models : ChatDetailesModels , setModels : React.Dispatch<React.SetStateAction<ChatDetailesModels>>})=>{
    return (
      <div onClick={()=>props.setModels({...props.models,userAvatarOpen : false})} className='fixed top-0 right-0 w-[100vw] h-screen backdrop-blur-sm bg-beh-gray/50 z-50 ' >
      <div className="flex h-screen w-full   justify-center items-center">
          <img src={props.avatar} className='w-[300px] cursor-pointer h-[300px]' />
      </div>
    </div>
    )
  }