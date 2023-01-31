import { NextPage } from "next";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import {  useAppSelector } from "../hooks/redux";
import { useForm } from "react-hook-form";
import Footer from "../components/footer";
import StoryBar from "../components/storyBar";
import Image from "next/image";
import TopImage from "../components/index-page/TopImage";
import icon from '../assets/icon.png'
import KnowUs from "../components/index-page/KnowUs";
import IndexProducts from "../components/index-page/IndexProducts";
import IndexStoryBar from "../components/index-page/StoryBar";
import IndexEvents from "../components/index-page/IndexEvents";
import Navbar_v2 from "../components/Navbar_v2";

const Page : NextPage = ()  => {

  return (
    <>
      <Navbar_v2/>
      <main dir="rtl" className="flex justify-center ">
        <div className="w-full lg:max-w-7xl  min-h-screen  ">
          <TopImage/>
          <KnowUs/>
          <IndexProducts/>
          <IndexStoryBar/>
          <IndexEvents/>
        </div>
      </main>
      <Footer/>
    </>
  )
}  

export default Page 