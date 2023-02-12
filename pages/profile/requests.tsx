import React, { useState } from 'react'
import { DatePicker } from "jalali-react-datepicker";
import { ALlUnits } from '../../static/_index';
import { UnitNameById } from '../../utils/UnitNameById';
import { CategoryPickerModel } from '../../features/components/category_picker_any';
import { CityPickerModel } from '../../features/components/city-picker-any';
import SuccesComponent from '../../components/alerts/succes';
import ErrorComponent from '../../components/alerts/error';
import { AuthorizedApiRequest } from '../../clients/axios';
import { useRouter } from 'next/router';


function Requests() {
  const [error,setError] = useState('')
  const [succes,setSucces] = useState('')
  const [loading,setLoading] = useState(false)
  const [fields,setFields] = useState<any>({})
  const router = useRouter()

    const Submit = async()=>{
        setLoading(true)
        const fdata = {
            name : fields.title,
            describe : fields.describe,
            quantity : fields.quantity,
            unit : fields.unit,
            CityID : fields.city_id,
            catID : fields.cat_id,
            keywords : [],
            expire_date : fields.expire_date
        }

        AuthorizedApiRequest.post('/requests/FreeRequest',fdata)
            .then(res=>{
                if (res.data.msg){
                    setSucces('موفق')
                    setFields({})
                    router.push('/requests')
                }
                else {
                    setError("خطا در ارسال پارامتر . لطفا فیلد ها را تکمیل کنید")
                }
            }).catch(e=>{
                setError('خطا در ارتباط با سرور')
            }).finally(()=>{
                setLoading(false)
            })
    }

  return (
      <>
    {error ? <ErrorComponent handle={setError} message={error} /> : null}
    {succes ? <SuccesComponent handle={setSucces} message={succes} /> : null}
    {fields.showCityPicker ? <CityPickerModel fildes={fields} setFileds={setFields} /> : null}
    {fields.showCatPicker ? <CategoryPickerModel fildes={fields} setFileds={setFields} /> : null}
    <main dir="rtl" className="flex justify-center h-screen ">
        <div className="w-full lg:max-w-7xl  z-[7] ">
            <div  className='p-2 md:p-5'>
                <div className='w-full my-10 shadow-lg md:p-5 rounded-xl bg-beh-orange flex flex-wrap flex-row gap-3 '>
                    <div className='w-[90%] mx-auto  min-w-[330px] flex justify-center items-center md:w-1/4 '>
                        <div className='w-[90%] mx-auto'>
                                
                                <div className='my-5'>
                                    <h1 className='font-semibold py-2'>دسته بندی</h1>
                                    <input value={fields.cat_name} onClick={()=>setFields({...fields , showCatPicker : true})}  type="text"  placeholder="مواد غذایی > نوشیدنی > دلستر" className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-beh-gray placeholder:text-lg placeholder:font-semibold" />
                                </div>
                       
                                <div className='my-5'>
                                    <h1 className="text-black text-lg py-2 font-semibold">واحد</h1>
                                    <select placeholder="کیلوگرم" value={fields.unit} onChange={(e)=>setFields({...fields,unit :Number(e.target.value) })} className="w-full  text-center bg-beh-gray-light h-10  rounded-md text-beh-gray  placeholder:text-white placeholder:text-center placeholder:font-semibold" >
                                        {ALlUnits.map(elm=>(
                                            <option value={elm.id} key={elm.id}>{elm.name}</option>
                                            ))}
                                    </select>                               
                                 </div>

                                <div className="my-5">    
                                        <h1 className="text-black text-lg py-2  font-semibold "> تعداد ( { UnitNameById(fields.unit ? fields.unit : 1) } ) * </h1>
                                        <input type="number" placeholder="نامحدود" value={fields.quantity} onChange={(e)=>setFields({...fields,quantity : Number(e.target.value) })} className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-gray-light placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                                </div>
                        </div>
                    </div>

                    <div className='w-[90%] mx-auto  min-w-[330px] flex justify-center items-center md:w-1/4'>
                        <div className='w-[90%] mx-auto'>

                        <div className="my-5">    
                            <h1 className="text-black text-lg py-2  font-semibold ">محل تحویل</h1>
                            <input type="number"  onClick={()=>setFields({...fields , showCityPicker : true})}  placeholder={fields.selectedCityName ? fields.selectedCityName : 'انتخاب شهر'} className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-gray-dark placeholder:text-white placeholder:text-lg placeholder:font-semibold" />
                        </div>

                        <div className="my-5">    
                            <h1 className="text-black text-lg py-2  font-semibold ">تیتراژ آگهی</h1>
                            <input type="text" value={fields.title} onChange={(e)=>setFields({...fields,title : e.target.value})} placeholder='ذرت مکزیکی' className="w-full text-center  h-12 rounded-md flex items-center justify-center bg-beh-gray-light text-beh-gray placeholder:text-beh-gray placeholder:text-lg placeholder:font-semibold" />
                        </div>

                        <div className="my-5">    
                            <h1 className="text-black text-lg py-2  font-semibold ">معتبر تا تاریخ</h1>
                            <DatePicker className="text-beh-gray w-full h-12 rounded-lg text-center text-lg font-semibold bg-beh-gray-light" onClickSubmitButton={(e)=>setFields({...fields , expire_date : e?.value?._i})} />
                        </div>
                        </div>
                    </div>

                    <div className='w-[90%] mx-auto  min-w-[330px] flex justify-center items-center lg:w-1/4'>
                        <div className='w-[90%] mx-auto'>
                            <div className="my-7">
                                <h1 className="text-black text-lg py-2  font-semibold "> توضیحات آگهی </h1>
                                <textarea value={fields.describe} onChange={(e)=>setFields({...fields, describe : e.target.value})}    placeholder="کمی توضیح برای درک بهتر خواسته"  className="w-full text-center overflow-x-auto h-[180px]  rounded-md flex items-center justify-center bg-beh-gray-light text-beh-gray placeholder:text-beh-gray placeholder:text-lg placeholder:font-semibold" />
                            </div>

                            <div className="my-7">
                                <div onClick={Submit} className=' cursor-pointer rounded-lg w-full h-14 bg-beh-green-light flex justify-center items-center text-white text-lg text-center font-bold'>
                                    <h1>
                                        تایید
                                    </h1>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default Requests