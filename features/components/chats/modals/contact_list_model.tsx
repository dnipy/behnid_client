import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { BiDownArrowAlt, BiPhone, BiUser } from "react-icons/bi"
import { FiUsers } from "react-icons/fi"
import { AuthorizedApiRequest } from "../../../../clients/axios"
import ErrorComponent from "../../../../components/alerts/error"
import { WholeCountry } from "../../../../static/_index"
import { I_add_products } from "../../../../types/add-products"
import { Contacts, User } from "../../../../types/async-prisma-types"


// type ContactListResponse = {
//     contacts : Contacts[];
//     founded_users : (User & {
//         profile: {
//             name: string;
//             family: string;
//         };
//     })[]
// }

type ContactListResponse = {
    users : (User & {
        profile: {
            name: string;
            family: string;
        };
    })[]
}

export const ContactPickerModel = (props : { fildes : any , setFileds :React.Dispatch<React.SetStateAction<any>>  })=>{

    const [response, setResponse] = useState< ContactListResponse  | null >(null);
    const [loading, setloading] = useState(true);
    const [error,setError] = useState('')
    const [fields,setFields] = useState({phone : '' , name : ''})
    const [createUserOpen , setCreateUserOpen] = useState(false)
    const router = useRouter()
    const { setFileds } = props


    useEffect(()=>{
        AuthorizedApiRequest
        .get(`/chats/my-contacts`)
        .then((res) => {
          if (res.data.err) {
            setError(res.data.err)
          }
          else {
            setResponse(res.data as ContactListResponse);
            console.log(res.data)
          }
        })
        .catch((err) => {
          // setError(err);
          console.log({err})
        })
        .finally(() => {
          setloading(false);
        });
      
    },[createUserOpen])





    return (
    <>
        {error ? <ErrorComponent message={error} handle={setError} /> : null}
        {createUserOpen && <CreateNewUserModel createUserOpen={createUserOpen} setCreateUserOpen={setCreateUserOpen} />}
        <div className='fixed w-full lg:max-w-7xl mx-auto h-screen backdrop-blur-md bg-white/30 z-40 ' >
    
            {/* CENTER_DATA_PART */}
            <div className='fixed flex w-full lg:max-w-7xl ml-5 md:mx-auto   h-[90vh] justify-center items-center'>
                <div dir='rtl' className='w-[300px]  md:w-[600px]  min-w-[325px]  mx-auto  h-[80vh] border-4 border-beh-gray  bg-white rounded-3xl overflow-y-auto  scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray  '>
                    <div>
                        <div className="flex justify-between h-[60px] my-2 gap-5 items-center">

                            <div>
                                <h1 className="pr-7 text-xl font-bold text-beh-text-gray">
                                    مخاطبین
                                </h1>
                            </div>

                            <div>
                                <h1 onClick={()=>setFileds(false)} className="pl-7 text-xl cursor-pointer font-bold text-beh-orange">
                                    انصراف
                                </h1>
                            </div>

                        </div>

                        {/* <div className="my-4 w-[83%] shadow-lg mx-auto h-[50px] flex justify-center items-center">
                            <div  onClick={()=>setCreateUserOpen(true)} className="w-full h-full gap-x-2 cursor-pointer bg-beh-gray flex justify-center items-center">
                                <div className="text-[#FFC499]">
                                    <FiUsers className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-[#FFC499]">افزودن مخاطب</h1>
                                </div>
                            </div>
                        </div> */}
                        
                        <div className="my-2  h-[65px] flex justify-center items-center w-full">
                            <label className="relative block w-10/12">
                                <input type="text" className='h-[60px] w-full bg-beh-gray-light rounded-sm px-10 placeholder:text-beh-gray-dark placeholder:text-lg ' placeholder='جست و جو در مخاطب ها' dir='rtl'/>
                                <span className="absolute inset-y-0 right-3 flex items-center pl-3" >
                                    <svg className="h-5 w-5 fill-beh-gray-dark" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30"
                                        height="30" viewBox="0 0 30 30">
                                        <path
                                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                                        </path>
                                    </svg>
                                </span>
                            </label>
                        </div>
                        <div className="h-[25px] border-b-2 border-beh-gray-light w-full"></div>


                        {/* CITY_SELECT_PART */}
                        <div dir="ltr" className="w-full my-1 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray h-[50vh] ">
                            {/* { response?.founded_users && response.founded_users.map(elm=>( */}

                            { response?.users && response?.users?.map(elm=>(

                                <>
                                    <div key={elm.id} dir="rtl" onClick={()=>router.push(`/chat/new-chat?id=${elm.id}`)}  className=" cursor-pointer w-[90%] hover:bg-beh-orange hover:text-white hover:fill-white text-beh-gray duration-100 mx-auto rounded-md h-14 hover:h-16 my-2 bg-beh-gray-light flex justify-between items-center px-5  gap-5">
                                        <div>
                                            <h1 className="text-lg ">
                                            {elm.profile?.name && elm.profile.name} &nbsp; {elm.profile?.family && elm.profile.family}
                                            </h1>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <h1 className="text-sm ">
                                                {elm.phone.slice(0,4)}-{elm.phone.slice(4,7)}-{elm.phone.slice(7,11)}
                                            </h1>
                                            <BiPhone className="w-6 h-6" />
                                        </div>
                                    </div>
                   

                                </>
                            ))}
                        </div>

                        

                        {/* BUTTON_PART */}
                        {/* <div className="flex justify-around h-[60px] my-2 gap-5 items-center">

                            <div className="w-1/2 py-3 mr-3 rounded-md bg-beh-orange flex justify-center items-center ">
                                <h1 className="text-xl font-bold text-white">
                                    انصراف
                                </h1>
                            </div>
                            <div className="w-1/2 py-3 ml-3 rounded-md bg-beh-green-super-light flex justify-center items-center ">
                                <h1 className="text-xl font-bold text-white">
                                    تایید
                                </h1>                            
                            </div>

                        </div> */}
                    

                    
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}




const CreateNewUserModel = (props : { createUserOpen : boolean , setCreateUserOpen : Dispatch<SetStateAction<boolean>> , })=>{
    const [loading, setloading] = useState(true);
    const [error,setError] = useState('')
    const [fields,setFields] = useState({phone : '' , name : ''})

    const SendHandle = ()=>{
        setloading(true)
        const fbody = {
          contactName : fields.name,
          contactNumber : fields.phone
        }
        AuthorizedApiRequest
          .post('/chats/add-contact ',fbody)
            .then((resp)=>{
              if (resp.data.msg) {
                  props.setCreateUserOpen(false)
              }
              if (resp.data.err) {
                  setError(resp.data?.err)
                  props.setCreateUserOpen(false)
              }
            })
            .catch((err)=>{
              console.log(err)
            })
            .finally(()=>{
             setloading(false)
             props.setCreateUserOpen(false)
            })
      }
    return (
        <div className='fixed w-full lg:max-w-7xl mx-auto h-screen backdrop-blur-md bg-white/30 z-[45] ' >
    
        {/* CENTER_DATA_PART */}
        <div className='fixed flex w-full lg:max-w-7xl mx-auto   h-[90vh] justify-center items-center'>
            <div dir='rtl' className='w-[340px]  md:w-[550px]  min-w-[370px]  ml-5 md:mx-auto h-[40vh] border-4 border-white rounded-3xl  bg-beh-gray   '>
                <div>
                    <div className="flex justify-between h-[60px] my-2 gap-5 items-center">

                        <div>
                            <h1 className="pr-7 text-xl font-bold text-beh-text-gray">
                                {/* شهر انتخاب شده */}
                                مخاطبین
                            </h1>
                        </div>

                        <div>
                            <h1 onClick={()=>props.setCreateUserOpen(false)} className="pl-7 text-xl cursor-pointer font-bold text-beh-orange">
                                انصراف
                            </h1>
                        </div>

                    </div>

                    <div className="my-4 w-[83%] shadow-lg mx-auto h-[50px] flex justify-center items-center">
                        <input value={fields.name} onChange={(e)=>setFields({...fields,name : e.target.value})} type='text' placeholder="محمد انگشبه"  className="w-full h-full gap-x-2 rounded-xl text-center text-2xl bg-white flex justify-center items-center" />
                    </div>

                    <div className="my-4 w-[83%] shadow-lg mx-auto h-[50px] flex justify-center items-center">
                        <input value={fields.phone} onChange={(e)=>setFields({...fields,phone : e.target.value})} type='number' placeholder="0903-509-5691"  className="w-full h-full gap-x-2 rounded-xl text-center text-2xl bg-white flex justify-center items-center" />
                    </div> 

                    

                    {/* BUTTON_PART */}
                    <div className="flex justify-around h-[60px] my-2 gap-5 items-center">


                        <div onClick={fields.phone.length == 11 && fields.name.length > 1 ? SendHandle : undefined} className={`w-1/2 py-3 mr-3 rounded-md   ${fields.phone.length == 11 && fields.name.length > 1 ? 'bg-beh-green-super-light cursor-pointer' : ' bg-[#3aac91] cursor-not-allowed'}  flex justify-center items-center `}>
                            <h1 className="text-xl font-bold text-white">
                                تایید
                            </h1>                            
                        </div>


                        <div onClick={()=>props.setCreateUserOpen(false)} className="w-1/2 py-3 ml-3 cursor-pointer rounded-md bg-beh-red flex justify-center items-center ">
                            <h1 className="text-xl font-bold text-white">
                                انصراف
                            </h1>
                        </div>
                    </div>
                

                
                </div>
            </div>
        </div>
    </div>
    )
}