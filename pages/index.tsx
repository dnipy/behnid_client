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
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth";

const Page : NextPage = ()  => {
  const {isUser} = useContext(AuthContext)

  return (
    <>
      <Navbar_v2/>
      <main dir="rtl" className="flex justify-center ">
        <div className="w-full lg:max-w-7xl  min-h-screen  ">
          <TopImage/>
          <KnowUs/>
          <IndexProducts/>
          {
          isUser() ? <IndexStoryBar/> : null
          }
          <IndexEvents/>
        </div>
      </main>
      <Footer/>
    </>
  )
}  

export default Page 