import { NextPage } from "next";
import ErrorComponent from "../components/alerts/error";
import SuccesComponent from "../components/alerts/succes";
import WarnComponent from "../components/alerts/warn";
import FreeRequestComponent from "../components/FreeRequestComponent";
import Navbar_v2 from "../components/Navbar_v2";

const Page : NextPage = ()  => {
  return (
    <>
      <WarnComponent/>
      <SuccesComponent/>
      <ErrorComponent/>
      <Navbar_v2 />
      <br />
      <br />
      <br />
      <div dir="rtl" className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
          <FreeRequestComponent />
          <FreeRequestComponent />
          <FreeRequestComponent />
          <FreeRequestComponent />
      </div>
    </>
  )
}  

export default Page