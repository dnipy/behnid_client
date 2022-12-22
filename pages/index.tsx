import { NextPage } from "next";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import {  useAppSelector } from "../hooks/redux";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import useAxios from "../hooks/useAxios";
import AddComment from "../components/addComment";
import { City } from "../components/province";


const Page : NextPage = ()  => {
  const {error,loading,response} = useAxios('/blog/all?start=1&length=10')


  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = (data:any) => console.log(data);
  return (
    <>
      <Navbar/>
      {/* <form style={{marginTop : '500px'}} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true, maxLength: 20 })} />
        {errors?.firstName ? 'ارور' : null}
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        {errors?.lastName ? 'ارور' : null}
        <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" />
    </form> */}
    <main className="flex justify-center ">
      <div className="w-1/1 md:w-2/3 p-3 h-screen  ">
    
        <h1 className="text-3xl font-bold ">
          page content
        </h1>
            <City/>
        </div>
    </main>
    <Footer/>
    </>
  )
}  

export default Page