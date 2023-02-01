import { NextPage } from "next";
import { useEffect, useState } from "react";
import { AuthorizedApiRequest } from "../../clients/axios";
import ProfileCard from "../../components/ProfileCard";
import Router, { useRouter } from "next/router";
import { Model } from "../../components/Model";
import { LoadingComponent } from "../../components/loading";
import { MiladiToShamsi } from "../../utils/miladi_be_shamsi";
import { BACK_END } from "../../clients/localStorage";
import Navbar_v2 from "../../components/Navbar_v2";
import ErrorComponent from "../../components/alerts/error";


const Page : NextPage = ()  => {
  const router = useRouter()
  const {FirstTime} = router.query;

  useEffect(()=>{
      if (FirstTime) {
          //   alert('first time')
          window.location.replace('/profile')
      }
  },[])

    useEffect(()=>{
        if (!FirstTime && window.localStorage.getItem('password-reseted') == 'yes') {
          window.localStorage.removeItem('password-reseted')
          window.location.replace('/profile/change-password')
        }
    },[])

  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  const [model, setModel] = useState(false);
  const [modelText,setModelText] = useState('')




    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])





  const fetchData = () => {
      AuthorizedApiRequest
          .get('/profile/my-data')
          .then((res) => {
              if (res.data.err || typeof(res.data?.msg) == 'object') {
                res.data?.err ? setError(res.data?.err) : setError('ارور در هنگام لود دیتا')  
                // console.log(res.data.err)
              }
              else {
                  console.log(res.data)
                  setResponse(res.data);
              }
          })
          .catch((err) => {
              setError(err);
              router.replace('/500')
          })
          .finally(() => {
              setTimeout(() => {
                  setloading(false);
              }, 1000)
            });
  };

  useEffect(() => {
      fetchData();
  }, []);



  const deleteTicket = (id : number)=>{
      AuthorizedApiRequest.post('/tickets/delete',{id})
      .then((res)=>{
        console.log(res.data)
        router.reload()
      }).catch(()=>{
          console.log('err at delete ticket')
      })
  }



//   console.log(response)
  return (
    <>
      <Navbar_v2/>
      { 
        typeof response == 'object' ? 
        <>
        {error ? <ErrorComponent handle={setError} message={error} />  : null}
        {loading ? <LoadingComponent/>  : null}

                <main>
                    <div dir="rtl" className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
                        
                    </div>
                </main>
            </>
        :
        null
      }
    </>
  )
}  

export default Page