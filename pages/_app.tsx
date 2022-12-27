import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {store} from '../lib/store'
import { AuthContext, authContextDefaults } from '../contexts/Auth'
import React, { Fragment, useEffect, useState } from 'react'
import { socket } from '../clients/io'
import {  AuthorizedApiRequest } from '../clients/axios'
import { useAppSelector } from '../hooks/redux'
import { useDispatch } from 'react-redux'
import { changeModelShown } from '../lib/features/model.slice'
import ReduxWrapper from '../contexts/ReduxWrapper'




function MyApp({ Component, pageProps }: AppProps) {
  const [id,setId] = useState<number | undefined>()

  const fetchData = () => {
    AuthorizedApiRequest
        .get('/profile/my-data')
        .then((res) => {
            setId(res.data?.id);
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
  <div className='bg-gray-100 min-h-screen'>
    <Provider store={store}>
      <ReduxWrapper>
          <AuthContext.Provider value={authContextDefaults} >
            <Component {...pageProps} />
          </AuthContext.Provider>      
      </ReduxWrapper>
    </Provider>
  </div>
  </>
}

export default MyApp
