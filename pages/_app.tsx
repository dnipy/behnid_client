import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {store} from '../lib/store'
import { AuthContext, authContextDefaults } from '../contexts/Auth'
import React, { useEffect, useState } from 'react'
import { socket } from '../clients/io'
import {  AuthorizedApiRequest } from '../clients/axios'
import { useAppSelector } from '../hooks/redux'
import { useDispatch } from 'react-redux'
import { changeModelShown } from '../lib/features/model.slice'
import ReduxWrapper from '../contexts/ReduxWrapper'
import Head from 'next/head'
import { SetupProfileComponent } from '../features/components/setup-profile-model'



function MyApp({ Component, pageProps }: AppProps) {
  const [id,setId] = useState<number | undefined>()
  const [setupDone,setSetupDone] = useState<boolean | null>(null)

  // console.log({envURL : process.env.BACK_END})
  const fetchData = () => {
    AuthorizedApiRequest
        .get('/profile/my-data')
        .then((res) => {
            setId(res.data?.data?.id);
            console.log({my_data  : res.data})
            if (res.data?.data?.phone  && !res.data?.password_seted){
                setSetupDone(false)
            }
          })
        .then(
          ()=>{
            console.log(id)
            setTimeout(()=>{
              if (id){
                socket.connect().emit("new-user-add",id)
                localStorage.setItem('user-id',JSON.stringify(id))
              }
            },1000)
          }
        )
        .catch((err) => {
            console.log(err);
            
        })
    };

      useEffect(() => {
          fetchData();
      }, [id]);

  return <>
  <Head>
    <title>
      behnid | بهنید
    </title>
  </Head>
  <div className='bg-beh-bg min-h-screen'>
    <Provider store={store}>
      <ReduxWrapper>
          <AuthContext.Provider value={authContextDefaults} >
            {setupDone == false ? <SetupProfileComponent handleClose={setSetupDone} /> : null}
            <Component {...pageProps} />
          </AuthContext.Provider>      
      </ReduxWrapper>
    </Provider>
  </div>
  </>
}



export default MyApp
