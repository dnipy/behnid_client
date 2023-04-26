import { NextPage } from "next";
import Footer from "../components/footer";
import { FourOFour } from "../components/mid-pages/Four_O_Four";
import Navbar from "../components/Navbar";
import { NextSeo } from "next-seo";

 
const Page : NextPage = ()  => {

  return (
    <>
      <NextSeo
        title={`یافت نشد`}
      />
    <FourOFour></FourOFour>
    </>
  )
}  

export default Page