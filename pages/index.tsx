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

  return (
    <>
      <Navbar/>
      <main className="flex justify-center ">
        <div className="w-1/1 md:w-2/3 p-3 h-screen  ">
      
          <h1 className="text-3xl font-bold ">
            page content
          </h1>

        </div>
      </main>
      <Footer/>
    </>
  )
}  

export default Page