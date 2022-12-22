import { NextPage } from "next";
import Blog from "../../components/blog";
import { ErrorComponent } from "../../components/error";
import Footer from "../../components/footer";
import {LoadingComponent} from "../../components/loading";
import Navbar from "../../components/Navbar";
import { Building } from "../../components/mid-pages/Building";
import useAxios from "../../hooks/useAxios";

const Page : NextPage = ()  => {

  const {error,loading,response} = useAxios('/blog/all?start=1&length=9')

  return (
    <>
    <Navbar />
    <main className="flex justify-center">
      <div className="w-1/1 md:w-2/3 p-3">
      {loading ? <LoadingComponent /> : null}


      {error ? <ErrorComponent  details={'500'} /> : null}
      {response?.err ? <ErrorComponent  details={response?.err} /> : null }

      <div className="flex-wrap gap-4 sm:flex">
        {response && (response as Array<any>).map(elm=>(
            <Blog  id={elm.id} key={elm.id} title={elm.title} describe={elm.describe} likes={elm.likes} image={''} />
        ))}
      </div>

      </div>
    </main>
    <Footer/>
  </>
  )
}  

export default Building