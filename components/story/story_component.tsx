import { BACK_END } from "../../clients/localStorage"

export const StroyComponent = (props : {avatar : string | null ,username : string | null })=>{
    return (
        <div className='mx-[10px] md:mx-[20px] lg:mx-[35px]'>
        <div >
            <div className=' z-[6]  h-[100px] w-[100px] rounded-full bg-gradient-to-bl from-linar-purple via-linar-orange to-linar-blue flex justify-center items-center'>
            {
                    props.avatar 
                    ?
                    <img className='w-[90px] h-[90px] rounded-full' width={90} height={90} src={`${BACK_END}${props.avatar}`} />
                    :
                    <div className='h-[90px] w-[90px] bg-beh-gray rounded-full'></div>
                }   
            </div>
        </div>
        <div className='text-center'>
            <h1>
                {
                    props.username ? props.username : 'کاربر بدون نام'
                }
            </h1>
        </div>
    </div>
    )
}