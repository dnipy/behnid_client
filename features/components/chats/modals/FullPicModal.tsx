import { BACK_END } from "../../../../clients/localStorage"
import { ChatDetailesModels } from "../../../../types/chat-datailes"

export const FullPic = (props : {src : string , models : ChatDetailesModels , setModels : React.Dispatch<React.SetStateAction<ChatDetailesModels>>})=>{
    return (
      <div onClick={()=>props.setModels({...props.models,fullPic : false, fullPicSrc : ''})} className='fixed top-0 right-0 w-[100vw] h-screen backdrop-blur-sm bg-beh-gray/50 z-50 ' >
      <div className="flex h-screen w-full   justify-center items-center">
          <img src={BACK_END+props.src} className='w-[300px] cursor-pointer h-auto' />
      </div>
    </div>
    )
  }