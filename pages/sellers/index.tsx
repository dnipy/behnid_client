import { NextPage } from "next";
import { useRouter } from "next/router";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import { LoadingComponent } from "../../components/loading";
import Navbar from "../../components/Navbar";
import { WarnComponent } from "../../components/warn";
import useAxios from "../../hooks/useAxios";

const Page : NextPage = ()  => {
  const router = useRouter()
  const {error,loading,response} = useAxios(`/sellers/all?start=0&length=10`)
  console.log({response})

  return (
    <>
    <Navbar />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">


      {loading ? <LoadingComponent/> : null}
      {error ? <ErrorComponent  details={'500'} /> : null}
      {/* {response?.err ? <ErrorComponent  details={response?.err} /> : null } */}

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