import React, { useState } from 'react'
import { BiGhost, BiLink, BiLowVision, BiMessageRoundedError, BiSend, BiUserMinus } from 'react-icons/bi'
import { MdClose, MdCommentBank, MdMail } from 'react-icons/md'
import { AuthorizedApiRequest } from '../../../clients/axios'
import { SpamNameById } from '../../../utils/SpamNameById'
import { useRouter } from 'next/router'

function SpamSeller(props : {id : number , openState : boolean , setOpenState : React.Dispatch<React.SetStateAction<boolean>>}) {
  const [selectedItem,setSelectedItem] = useState<number | undefined>(undefined)
  const [loading,setloading] = React.useState(false)
  const [error,setError] = React.useState('')
  const [succes,setSucces] = React.useState('')
  const router = useRouter()

  const onClose = ()=> {
    setSelectedItem(undefined)
    props.setOpenState(false)
  }

  const handleSend = async()=>{
    setloading(true)
    setError('')
    const body = {
      id : Number(props.id),
      spamType : SpamNameById(selectedItem!)
    }

  AuthorizedApiRequest
  .post('/spams/seller',body)
  .then((res) => {
      console.log({res})
      if (res.data.err) {
          setError(res.data.err)
      }
      else {
        setSucces(res.data?.msg)
        props.setOpenState(false)
      }
  })
  .catch((err) => {
      console.log(err)
  })
  .finally(() => {
      setloading(false);
  });
  }
  return (
    <div className="relative">
    <div className={`z-[25]  h-full w-full fixed ${'basis-5/6 lg:basis-2/3'} fixed top-0 right-0 w-[100vw] h-screen backdrop-blur-sm bg-beh-gray/50 z-50`}>
        <div className="flex h-[79vh] mt-[4.5rem]  justify-center items-center">                         
            <div className={`w-[330px] ${'h-[600px]'}  flex flex-col items-center justify-center bg-beh-gray rounded-3xl `}>
                <div className='h-[95%] w-full'>
                    {/* top */}
                    <h1 className="text-center text-2xl  font-bold text-white/80 mb-4">گزارش فروشگاه</h1>



                    {/* select Area */}
                    <div className=' mx-auto w-[90%] mt-[25px] h-[440px]'>
                        <div onClick={()=>setSelectedItem(1)} className={` cursor-pointer hover:text-beh-green-light w-full h-[70px] ${selectedItem == 1 ? 'text-beh-green-light' : 'text-white'} border-b-4 border-b-beh-gray-dark   text-lg bor   font-bold flex items-center`}>
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BiGhost className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    خشونت
                                  </h1>
                              </div>
                        </div>


                        <div onClick={()=>setSelectedItem(2)}  className={` cursor-pointer hover:text-beh-green-light w-full h-[70px] ${selectedItem == 2 ? 'text-beh-green-light' : 'text-white'} border-b-4 border-b-beh-gray-dark   text-lg bor   font-bold flex items-center`}>
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BiLowVision className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    غیر اخلاقی
                                  </h1>
                              </div>
                        </div>

                        <div onClick={()=>setSelectedItem(3)} className={` cursor-pointer hover:text-beh-green-light w-full h-[70px] ${selectedItem == 3 ? 'text-beh-green-light' : 'text-white'} border-b-4 border-b-beh-gray-dark   text-lg bor   font-bold flex items-center`}>
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <MdMail className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    تبلیغ
                                  </h1>
                              </div>
                        </div>

                        <div onClick={()=>setSelectedItem(4)} className={` cursor-pointer hover:text-beh-green-light w-full h-[70px] ${selectedItem == 4 ? 'text-beh-green-light' : 'text-white'} border-b-4 border-b-beh-gray-dark   text-lg    font-bold flex items-center`} >
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BiLink className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    لینک دعوت
                                  </h1>
                              </div>
                        </div>


                        <div onClick={()=>setSelectedItem(5)} className={` cursor-pointer hover:text-beh-green-light w-full h-[70px] ${selectedItem == 5 ? 'text-beh-green-light' : 'text-white'} border-b-4 border-b-beh-gray-dark   text-lg    font-bold flex items-center`}>
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BiMessageRoundedError className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                    مزاحمت
                                  </h1>
                              </div>
                        </div>


                        <div onClick={()=>setSelectedItem(6)}  className={` cursor-pointer hover:text-beh-green-light w-full h-[70px] ${selectedItem == 6 ? 'text-beh-green-light' : 'text-white'}    text-lg    font-bold flex items-center`}>
                              <div className="h-full w-1/3 flex justify-center items-center">
                                <div className="w-10 h-10 text-beh-green-light">
                                  <BiUserMinus className="w-10 h-10 " />
                                </div>
                              </div>

                              <div className="h-full w-2/3 flex items-center">
                                  <h1 className="px-1 ">
                                      نژاد پرستی
                                  </h1>
                              </div>
                        </div>
                    </div>


                    {/* buttons */}
                    <div className="w-full p-2 h-[80px] gap-x-2  flex justify-around items-center">
                              <div onClick={selectedItem ? ()=>{} : undefined}  className={`w-[50%]  h-[50px] rounded-xl ${ selectedItem ? 'bg-beh-green-light cursor-pointer' : 'bg-beh-green-super-light/25 cursor-not-allowed '  }   flex justify-center items-center`}>
                                  <h1 className='text-white text-xl'>تایید</h1>
                              </div>
                              <div onClick={onClose}  className={`w-[50%] h-[50px] rounded-xl ${ 'bg-beh-orange cursor-pointer'  }   flex justify-center items-center`}>
                                <h1 className='text-white text-xl'>انصراف</h1>
                              </div>
                          </div>
                </div>


            </div>
        </div>
    </div>
</div>
  )
}

export default SpamSeller