import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux";
import Footer from "../components/footer";
import TopImage from "../components/index-page/TopImage";
import KnowUs from "../components/index-page/KnowUs";
import IndexProducts from "../components/index-page/IndexProducts";
import IndexStoryBar from "../components/index-page/StoryBar";
import IndexEvents from "../components/index-page/IndexEvents";
import Navbar_v2 from "../components/Navbar_v2";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Auth";
import { useRouter } from "next/router";
import NoImg from '../assets/NoImg.png'
import { BsEye } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const Page : NextPage = ()  => {
  // const {isUser} = useContext(AuthContext)
  const router = useRouter()
  useEffect(()=>{
    const data = localStorage.getItem('user-session')
    if (data) router.replace('/chat')
},[])
  return (
    <>
      <Navbar_v2/>
      <main dir="rtl" className="flex justify-center ">
        <div className="w-full lg:max-w-7xl  min-h-screen  ">
        
          


                    
          <TopImage/>
          <KnowUs/>
          {/* <IndexProducts/> */}
          {/* {
          isUser() ? <IndexStoryBar/> : null
          } */}
          {/* <IndexEvents/> */}
        </div>
      </main>
      <Footer/>
    </>
  )
}  

export default Page 