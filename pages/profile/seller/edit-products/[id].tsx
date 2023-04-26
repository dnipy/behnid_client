import { NextPage } from "next";
import { useRouter } from "next/router";
import React, {useEffect, useState } from 'react'
import { AuthorizedApiRequest, AuthorizedApiRequestImage } from "../../../../clients/axios";
import ErrorComponent from "../../../../components/alerts/error";
import SuccesComponent from "../../../../components/alerts/succes";
import { CategoryPickerModel } from "../../../../features/components/category_picker";
import { CityPickerModel } from "../../../../features/components/city-picker";
import { MultiCityPickerModel } from "../../../../features/components/MultiCityPicker";
import { LastComponent } from "../../../../features/pages/add-products/final-step";
import { StepFiveComponent } from "../../../../features/pages/add-products/step-five";
import { StepFourComponent } from "../../../../features/pages/add-products/step-four";
import { StepOneComponent } from "../../../../features/pages/add-products/step-one";
import { StepThreeComponent } from "../../../../features/pages/add-products/step-three";
import { StepTwoComponent } from "../../../../features/pages/add-products/step-two";
import { EditProductResponse, I_add_products, fetchedImages } from "../../../../types/add-products";
import { LoadingComponent } from "../../../../components/loading";
import { NextSeo } from "next-seo";



const Page : NextPage = ()  => {
    const [loading,setloading] = React.useState(true)
    const [error,setError] = React.useState('')
    const [succes,setSucces] = React.useState('')
    const [step,setStep] = useState(1)
    const router = useRouter();
    const {id} = router.query
    const [fields,setFields] = useState<I_add_products>({
        title : '',
        describe : '',
        price : undefined,
        packType : '',
        minOrder : undefined,
        customerPrice : undefined,
        producerPrice : undefined,
        weight : undefined,
        deliveryTime : '',
        keyword_list : [],
        cat_id : 1,
        cat_name : '',
        city_id : 1,
        offPercent : undefined,
        offCount : undefined,
        freeDelivery : false,
        sendArea_list : [],
        unit : 1,
        add_story : false,
        quantity : undefined,
        send_from : undefined,
        showCityPicker : false,
        selectedCityName : '' ,
        showMultiCityPicker : false,
        showCatPicker : false,
        selectedImage_1 : null,
        selectedImage_2 : null,
        selectedImage_3 : null,
    })

    const [fetchedImages,setFetchedImages] = useState<fetchedImages>({
        image_1 : null,
        image_2 : null,
        image_3 : null,
    })

    useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.push('/')
    },[])

    useEffect(()=>{
        if(!id){
          return
        }
        setError('')
        setloading(true)
        AuthorizedApiRequest
        .get<EditProductResponse>(`/products/mine-single?id=${id}`)
        .then((res ) => {
    
          if (res.data?.err || res?.data?.error) {
            setError(res.data?.err ? res.data?.err : 'خطایی از سمت ما رخ داده است!')
            router.replace('/profile')
          }
          else {
              console.log(res.data)
              setFields({
                title : res.data?.title,
                describe : res.data?.describe ,
                price : res.data?.price,
                packType : res.data?.packType,
                minOrder : res?.data?.minOrder,
                customerPrice : res?.data?.customerPrice,
                producerPrice : res?.data?.producerPrice,
                weight : res?.data?.weight ? Number(res?.data?.weight) : undefined,
                deliveryTime : res?.data?.deliveryTime,
                keyword_list : res?.data?.keywords,
                cat_id : res?.data?.categorieID ? res?.data?.categorieID : 1,
                cat_name : res?.data?.categorie?.name ?  res.data?.categorie?.name : '',
                city_id : res.data?.city?.id ? res?.data?.city?.id : 1,
                offPercent : res?.data?.off.length > 0 ? res?.data?.off[0].off_percent : undefined,
                offCount : res?.data?.off.length > 0 ? res?.data?.off[0].off_count : undefined,
                freeDelivery : res?.data?.freeDelivery,
                sendArea_list : res?.data?.sendArea ,
                unit : res?.data?.unitID ? res?.data?.unitID : 1,
                add_story : false,
                quantity : res?.data?.quantity,
                send_from : res?.data?.city?.id ? res.data?.city.id : undefined,
                selectedCityName : res?.data?.city?.name ? res?.data?.city?.name : null ,
                
                showCityPicker : false,
                showMultiCityPicker : false,
                showCatPicker : false,
                selectedImage_1 : null,
                selectedImage_2 : null,
                selectedImage_3 : null,
            })
            setFetchedImages({
                image_1 : res?.data?.image,
                image_2 : res?.data?.image_2,
                image_3 : res?.data?.image_3,
            })
            //   setFields(res.data)
          }
        })
        .catch((err) => {
          setError(err);
          // router.replace('/404')
        })
        .finally(() => {
          setloading(false);
        });
      
    },[id])


  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.push('/')
  },[])


  const sendImageHandle =async (id : number) => {
    setloading(true)
    const body = new FormData()

        
        
        fields.selectedImage_1 ? body.append('product_1',fields.selectedImage_1 as Blob) : null
        fields.selectedImage_2 ? body.append('product_2',fields.selectedImage_2 as Blob) : null 
        fields.selectedImage_2 ? body.append('product_3',fields.selectedImage_3 as Blob) : null 

    
        AuthorizedApiRequestImage 
        .post(`/media/photo/product?productID=${id}`,body)
        .then((res) => {
            console.log(res)
            if (res.data.err) {
                setError(res.data.err)
            }
            else {
                setSucces(String(res.data.msg));
                setTimeout(() => {
                    router.replace('/products')
                }, 1000);
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            setloading(false);
        });
  }
  

  const handleSend = async()=>{
      setloading(true)
      setError('')
      const body:any = fields
      body.id = id
      console.log(body)

    if (!body.cat_id  || !body.producerPrice || !body.price || !body.customerPrice || body.describe.length < 30 || !body.title ){
        setError("فیلد های دارای * اجباری هستند")
        return
    }

    body.sendArea_list = body.sendArea_list.map((elm : any)=>{
         return {id : elm.id}
    })


    AuthorizedApiRequest
    .post('/products/update',body)
    .then((res) => {
        console.log({res})
        if (res.data.err) {
            setError(res.data.err)
        }
        else {
            let product_id = res.data.id
            sendImageHandle(Number(product_id)).catch(()=>setError('محصول بدون تصویر اضافه شد'))
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
      <>
    <NextSeo
        title="ویرایش محصولات"
      />
    {error ? <ErrorComponent handle={setError} message={error} /> : null}
    {loading ? <LoadingComponent  /> : null}
    {succes ? <SuccesComponent handle={setSucces} message={succes} /> : null}
    {fields.showCityPicker ? <CityPickerModel fildes={fields} setFileds={setFields} /> : null}
    {fields.showMultiCityPicker ? <MultiCityPickerModel fildes={fields} setFileds={setFields} /> : null}
    {fields.showCatPicker ? <CategoryPickerModel fildes={fields} setFileds={setFields} /> : null}
    <div dir="rtl" className="bg-beh-bg w-full block h-full" >
        <div className="bg-beh-orange font-bold  top-0 text-white text-lg w-full h-[60px] px-10 pt-[11px]">
            <h1> { step != 6 ? 'ویرایش کردن محصول' : "پروفایل محصول" } </h1>
        </div>
        <div className=" py-[60px]  flex justify-center" >
            <div className="w-[370px] ">
                {step == 1 ? <StepOneComponent step={step} setStep={setStep} fildes={fields} setFileds={setFields } /> : null}
                {step == 2 ? <StepTwoComponent exists_images={fetchedImages} setFetchedImages={setFetchedImages}  step={step} setStep={setStep} fildes={fields} setFileds={setFields} /> : null}
                {step == 3 ? <StepThreeComponent step={step} setStep={setStep} fildes={fields} setFileds={setFields} /> : null}
                {step == 4 ? <StepFourComponent step={step} setStep={setStep} fildes={fields} setFileds={setFields} /> : null}
                {step == 5 ? <StepFiveComponent send={handleSend} step={step} setStep={setStep} fildes={fields} setFileds={setFields} /> : null}
                {step == 6 ? <LastComponent step={step} setStep={setStep} fildes={fields} setFileds={setFields} /> : null}
            </div>
        </div>

        {
            step == 6 
            ? 
                null
                : 
                <div className="block">

                <div className="h-[70px] w-full  flex justify-center">
                    <div className="w-[370px] flex justify-around items-center h-full">
                        <div>
                            <h1 className={`font-bold text-lg ${step < 5 ? 'text-black cursor-pointer' : 'text-beh-gray-light cursor-not-allowed'} `} onClick={step < 5 ? ()=>setStep(step+1) : undefined}>بعدی</h1>
                        </div>
                        <div >
                            <div dir="ltr" className="flex items-center justify-center gap-2">
                                <div className={`w-5 h-5 ${step == 1 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'} `}  onClick={step !=1 ? ()=>setStep(1) : undefined} ></div>
                                <div className={`w-5 h-5 ${step == 2 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'}`}  onClick={step !=2 ? ()=>setStep(2) : undefined} ></div>
                                <div className={`w-5 h-5 ${step == 3 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'}`}  onClick={step !=3 ? ()=>setStep(3) : undefined} ></div>
                                <div className={`w-5 h-5 ${step == 4 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'}`}  onClick={step !=4 ? ()=>setStep(4) : undefined} ></div>
                                <div className={`w-5 h-5 ${step == 5 ? 'bg-beh-orange' : 'bg-beh-gray cursor-pointer'}`}  onClick={step !=5 ? ()=>setStep(5) : undefined} ></div>

                            </div>
                        </div>
                        <div>
                            <h1 className={`font-bold text-lg ${step > 1 ? 'text-black cursor-pointer' : 'text-beh-gray-light cursor-not-allowed'} `} onClick={step > 1 ? ()=>setStep(step-1) : undefined}>قبلی</h1>
                        </div>
                    </div>
                </div>
                </div>
        }
    </div>
    </>
  )
}



export default Page

