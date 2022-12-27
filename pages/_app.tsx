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
        



  // * redux
  const errorSelector = useAppSelector((state)=> state.error)
  const loadingSelector = useAppSelector((state)=> state.loading)
  const dispatch = useDispatch()


  
  return <>
  <div className='bg-gray-100 min-h-screen'>
    <Provider store={store}>
      <AuthContext.Provider value={authContextDefaults} >
        <Component {...pageProps} />
      </AuthContext.Provider>
    </Provider>
  </div>
  </>
}

export default MyApp
