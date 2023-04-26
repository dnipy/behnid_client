import { NextPage } from "next";
import Footer from "../components/footer";
import { FiveOO } from "../components/mid-pages/Five";
import Navbar from "../components/Navbar";
import { NextSeo } from "next-seo";

 
const Page : NextPage = ()  => {
  return (
    <>
      <NextSeo
        title={`خطا در ارتباط`}
      />
      <FiveOO />
    </>
  )
}  

export default Page