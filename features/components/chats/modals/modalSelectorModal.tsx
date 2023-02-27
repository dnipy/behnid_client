import { useRef } from "react"
import { BiDollar, BiImage, BiLike, BiLocationPlus, BiPhotoAlbum, BiSend, BiUserVoice, BiVoicemail, BiVolume, BiVolumeFull, BiVolumeLow } from "react-icons/bi"
import { MdClose, MdPictureAsPdf } from "react-icons/md"
import { ChatDetailesFields, ChatDetailesModels, sendHandle } from "../../../../types/chat-datailes"



export const ModelSelector = (props : { shouldBeOpened : boolean , sendHandle : sendHandle  , fields : ChatDetailesFields , setFields : React.Dispatch<React.SetStateAction<ChatDetailesFields>> , model : ChatDetailesModels , setModels: React.Dispatch<React.SetStateAction<ChatDetailesModels>> })=>{
    const { model , setModels } = props
    const { fields , setFields } = props
    const { imageSend , pdfSend , remmitanceSend } = props.sendHandle

    const inputFileImage = useRef<HTMLInputElement | null>(null) 
    const inputFileRemittance = useRef<HTMLInputElement | null>(null) 
    const inputFilePdf = useRef<HTMLInputElement | null>(null) 


  
    // IMAGE_SEND FUNCs
    const onButtonClickImage = () => {
      inputFileImage?.current?.click();
    };
  
    const onImageChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
      if ( e.target.files &&  e.target?.files?.length > 0) {
        console.log(e.target.files)
        setFields({...fields , imageInput :  e.target.files[0]})
      }
    }
    

    const onModelCloseImage =()=>{
        setModels({...props.model , imageSendOpen : false})
        setFields({...fields , imageInput : null ,imageText : ''})
    }

    const sendImage = ()=>{
        imageSend()
    }

    // REMITTANCE_SEND FUNCs
    const onButtonClickRemmitance = () => {
        inputFileRemittance?.current?.click();
    };
    
    const onRemmitanceChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        if ( e.target.files &&  e.target?.files?.length > 0) {
          console.log(e.target.files)
          setFields({...fields , remittance :  e.target.files[0]})
        }
    }
      
  
    const onModelCloseRemmitance =()=>{
          setModels({...props.model , remittanceSendOpen : false})
          setFields({...fields , remittance : null , imageText : ''})
    }
  
    const SendRemittance = ()=>{
          remmitanceSend()
    }


    // PDF_SEND FUNCs
        const onButtonClickPdf = () => {
        inputFilePdf?.current?.click();
    };
    
    const onPdfChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        if ( e.target.files &&  e.target?.files?.length > 0) {
          console.log(e.target.files)
          setFields({...fields , pdf :  e.target.files[0]})
        }
    }
      
  
    const onModelClosePdf =()=>{
          setModels({...props.model , pdfSendOpen : false})
          setFields({...fields , pdf : null })
    }
  
    const SendPdf = ()=>{
          pdfSend()
    }

    return (
        <>

        {model.imageSendOpen &&

            <div className="relative">
                <div className={`z-[25]  h-[90vh] md:h-[80vh] w-full absolute ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto   backdrop-blur-sm bg-white/20 z-40  rounded-3xl`}>
                    <div className="flex h-[79vh]  justify-center items-center">                         
                        <div className="w-[330px] h-[500px] flex flex-col items-center justify-center bg-beh-gray-dark rounded-3xl ">
                            
                            <div className="relative">
                                <div onClick={onModelCloseImage} className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer rounded-full -top-[60px]  -right-[152px] flex justify-center items-center ">
                                    <MdClose className="w-6 h-6 fill-white" />
                                </div>
                            </div>
                            <h1 className="text-center text-lg text-white mb-2">تصویر</h1>

                            
                            {fields.imageInput ? <img src={URL.createObjectURL(fields.imageInput)} className='w-[320px]  h-[320px] rounded-xl' /> : <div onClick={onButtonClickImage} className="w-[320px] cursor-pointer h-[320px] flex justify-center items-center rounded-xl bg-white">   
                                <BiImage className="w-28 h-28 fill-beh-gray" />
                                <input type='file' onChange={onImageChange} accept="image/png, image/gif, image/jpeg"  id='file' ref={inputFileImage} style={{display: 'none'}}/>
                            </div> }

                            <div className="w-full p-2 h-[100px]  mt-10 flex justify-around items-center">
                                <div onClick={sendImage} className={`w-[15%] h-[70px] rounded-xl ${fields.imageInput ? 'bg-beh-orange cursor-pointer' : 'bg-beh-orange/70 cursor-not-allowed' }   flex justify-center items-center`}>
                                    <BiSend className="w-7 h-7 fill-white" />
                                </div>
                                <input value={fields.imageText} onChange={(e)=>setFields({...fields , imageText : e.target.value })} placeholder="کپشن این تصویر..." className="w-[80%] px-2 text-xl h-[70px] rounded-xl" type="text" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        }

        {
            model.remittanceSendOpen && 
            <div className="relative">
                <div className={`z-[25]  h-[90vh] md:h-[80vh] w-full absolute ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto   backdrop-blur-sm bg-white/20 z-40  rounded-3xl`}>
                    <div className="flex h-[79vh]  justify-center items-center">                         
                        <div className="w-[330px] h-[500px] flex flex-col items-center justify-center bg-beh-gray-dark rounded-3xl ">
                            
                            <div className="relative">
                                <div onClick={onModelCloseRemmitance} className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer rounded-full -top-[60px]  -right-[152px] flex justify-center items-center ">
                                    <MdClose className="w-6 h-6 fill-white" />
                                </div>
                            </div>
                            <h1 className="text-center text-lg text-white mb-2">حواله</h1>

                            {fields.remittance ? <img src={URL.createObjectURL(fields.remittance)} className='w-[320px]  h-[320px] rounded-xl' /> : <div onClick={onButtonClickRemmitance} className="w-[320px] cursor-pointer h-[320px] flex justify-center items-center rounded-xl bg-white">   
                                <BiImage className="w-28 h-28 fill-beh-gray" />
                                <input type='file' onChange={onRemmitanceChange} accept="image/png, image/gif, image/jpeg"  id='file' ref={inputFileRemittance} style={{display: 'none'}}/>
                            </div> }

                            <div className="w-full p-2 h-[100px]  mt-10 flex justify-around items-center">
                                <div onClick={fields.remittance && fields.remmitanceText.length > 1 ? SendRemittance : undefined} className={`w-[15%] h-[70px] rounded-xl ${fields.remittance && fields.remmitanceText.length > 0 ? 'bg-beh-orange cursor-pointer' : 'bg-beh-orange/70 cursor-not-allowed' }  flex justify-center items-center`}>
                                    <BiSend className="w-7 h-7 fill-white" />
                                </div>
                                <input value={fields.remmitanceText} onChange={(e)=>setFields({...fields , remmitanceText : e.target.value})} placeholder="نام این حواله (اجباری)" className="w-[80%] px-2 text-xl h-[70px] rounded-xl" type="text" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        }

        {
            model.pdfSendOpen && 
            <div className="relative">
                <div className={`z-[25]  h-[90vh] md:h-[80vh] w-full absolute ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto   backdrop-blur-sm bg-white/20 z-40  rounded-3xl`}>
                    <div className="flex h-[79vh]  justify-center items-center">                         
                        <div className="w-[330px] h-[300px] flex flex-col items-center justify-center bg-beh-gray-dark rounded-3xl ">
                            
                            <div className="relative">
                                <div onClick={onModelClosePdf} className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer rounded-full -top-[75px]  -right-[152px] flex justify-center items-center ">
                                    <MdClose className="w-6 h-6 fill-white" />
                                </div>
                            </div>
                            <h1 className="text-center text-lg text-white ">PDF</h1>


                            {fields.pdf ? 
                            <div  onClick={onButtonClickPdf} className="w-[90%] mx-auto p-2 h-[60px] rounded-xl border-2 text-white border-white cursor-pointer hover:bg-beh-gray-light hover:text-black  mt-10 flex justify-center items-center">
                                <h1 className=" text-xl text-center">
                                    {fields.pdf.name}
                                </h1>
                                <input type='file' onChange={onPdfChange} accept="application/pdf"  id='file' ref={inputFilePdf} style={{display: 'none'}}/>
                            </div>
                            : 
                            <div  onClick={onButtonClickPdf} className="w-[90%] mx-auto p-2 h-[60px] rounded-xl border-2 text-white border-white cursor-pointer hover:bg-beh-gray-light hover:text-black  mt-10 flex justify-center items-center">
                            <h1 className=" text-xl text-center">
                                انتخاب
                            </h1>
                            <input type='file' onChange={onPdfChange} accept="application/pdf"  id='file' ref={inputFilePdf} style={{display: 'none'}}/>
                            </div>
                            }   


                            <div onClick={SendPdf} className={`w-[90%] mx-auto p-2 h-[60px] rounded-xl  ${fields.pdf ? 'bg-beh-orange cursor-pointer' : 'bg-beh-orange/70 cursor-not-allowed' }   mt-10 flex justify-center items-center`}>
                                <h1 className="text-white text-xl text-center">
                                    ارسال
                                </h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        }
        <div className="relative ">
            <div className={`z-[20]  h-[90vh] md:h-[80vh] w-full absolute ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto   backdrop-blur-sm bg-white/20 z-40  rounded-3xl`}>
                <div className="flex h-[79vh]  justify-center items-center">
                    
                    <div className="w-[320px] h-[150px] flex flex-col items-center justify-center bg-beh-gray-dark rounded-3xl ">
                        <div className="relative">
                            <div onClick={()=>props.setModels({...props.model , modalSelectorOpen : false})} className="absolute w-8 h-8 bg-beh-orange shadow-xl cursor-pointer rounded-full -top-10  -right-40 flex justify-center items-center ">
                                <MdClose className="w-6 h-6 fill-white" />
                            </div>
                        </div>
                            <div className="w-[90%] h-[90px]  my-auto flex justify-around items-center">
                                <div onClick={()=>setModels({...model , imageSendOpen : true})} className="cursor-pointer  hover:bg-beh-text-gray  w-[70px] h-[70px] rounded-full bg-beh-gray flex justify-center items-center">
                                    <div>
                                        <BiPhotoAlbum className="w-10 h-10 fill-white" />
                                    </div>
                                </div>
                                <div onClick={()=>setModels({...model , remittanceSendOpen : true})} className="cursor-pointer  hover:bg-beh-text-gray  w-[70px] h-[70px] rounded-full bg-beh-gray flex justify-center items-center">
                                    <div>
                                        <BiDollar className="w-10 h-10 fill-white" />
                                    </div>
                                </div>
                                <div onClick={()=>setModels({...model , pdfSendOpen : true})} className="cursor-pointer  hover:bg-beh-text-gray  w-[70px] h-[70px] rounded-full bg-beh-gray flex justify-center items-center">
                                    <div>
                                        <MdPictureAsPdf className="w-10 h-10 fill-white" />
                                    </div>
                                </div>                          
                            </div>
                            {/* <div className="w-[90%] h-[90px]  my-auto flex justify-around items-center">
                                <div className="w-[70px] h-[70px] rounded-full bg-beh-gray flex justify-center items-center">
                                    <div>
                                        <BiLocationPlus className="w-10 h-10 fill-white" />
                                    </div>
                                </div>
                                <div className="w-[70px] h-[70px] rounded-full bg-beh-gray flex justify-center items-center">
                                    <div>
                                        <BiVolumeFull className="w-10 h-10 fill-white" />
                                    </div>
                                </div>
                                <div className="w-[70px] h-[70px] rounded-full bg-beh-gray flex justify-center items-center">
                                    <div>
                                        <BiLike className="w-10 h-10 fill-white" />
                                    </div>
                                </div>
                            </div> */}
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}