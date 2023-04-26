import NoImg from '../../assets/NoImg.png'


export function ProductTumbnail (props :{ city  : string | undefined , name : string , price : string | number , imgSrc : string | null , freeDelivery : boolean , width?:number , onClick?:()=>void }) {
    return (
        <div dir='rtl' onClick={props?.onClick ? props?.onClick : undefined}   className={`  ${props.width ? `w-[${props.width}] ` : 'w-[320px]'}  ${props.onClick ? 'cursor-pointer' : ''} mx-auto my-6  h-[100px] rounded-xl  bg-beh-orange shadow-xl    `}>
        <h1 className="text-white h-[20px] font-semibold text-center">{props?.name}</h1>
        <div className=" w-full  mt-[6px] rounded-xl h-[75px] flex flex-row bg-beh-gray">
            <div className="w-[15%] h-full">
               <div className="  w-full h-full">
                    <h1 className="rotate-90 text-beh-orange text-sm  py-6  ">
                         {props?.freeDelivery ? 'رایگان' : 'حمل با مشتری'}
                    </h1> 
               </div>
            </div>
            <div className="w-[85%] h-full bg-white rounded-xl flex flex-row">
                <div className=" w-full px-1   h-full">
                    <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                        <div className="h-full w-[40%]  text-xs  pt-1">
                            <h1>بارگیری</h1>
                        </div>
                        <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                            <h1>{props?.city ? props?.city : 'نامشخص'}</h1>
                        </div>
                    </div>

                    <div className="w-full flex justify-between h-[25px] my-2 bg-white">
                        <div className="h-full w-[40%] text-xs  pt-1 ">
                            <h1>قیمت</h1>
                        </div>
                        <div className="h-full w-[60%] flex justify-center items-center text-xs text-center text-white rounded-md bg-beh-orange">
                            <h1>{props?.price}</h1>
                        </div>
                    </div>
                </div>
                <img src={props?.imgSrc ? props.imgSrc : NoImg.src} className="w-[75px] h-[75px] border-4 rounded-xl border-beh-gray-light" alt="" />
            </div>
        </div>
    </div>
    )
}