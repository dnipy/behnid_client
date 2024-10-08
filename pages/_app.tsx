import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import {store} from '../lib/store'
import { AuthContext, authContextDefaults } from '../contexts/Auth'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { socket } from '../clients/io'
import {  AuthorizedApiRequest } from '../clients/axios'
import Script from 'next/script'
import ReduxWrapper from '../contexts/ReduxWrapper'
import Head from 'next/head'
import { SetupProfileComponent } from '../features/components/setup-profile-model'
import { SocketContext } from '../contexts/socket'
import { NextSeo } from 'next-seo'
import { regSw, subscribe } from '../utils/Notification'




function MyApp({ Component, pageProps }: AppProps) {
  const [id,setId] = useState<number | undefined>()
  const [setupDone,setSetupDone] = useState<boolean | null>(null)
  const [myAvatar , setMyAvatar] = useState< string | null>(null)
  const [isConnected, setIsConnected] = useState(socket.connected);
  


  // console.log({envURL : process.env.BACK_END})
  const fetchData = () => {
    AuthorizedApiRequest
        .get('/profile/my-data')
        .then((res) => {
            setMyAvatar(res.data?.data?.avatar as string | null)
            if (res.data?.data?.phone  && !res.data?.password_seted){
                setSetupDone(false)
            }
            if (res.data?.data?.id) {
              socket.connect().emit("new-user-add",res.data?.data?.id)
              setId(res.data?.data?.id);

            }
            setTimeout(() => {
              // console.log('fetched id ==> '+res.data?.data?.id)
              localStorage.setItem('user-id',JSON.stringify(res.data?.data?.id))
              // console.log({my_data  : res.data})  
            }, 500);
          })
        .catch((err) => {
            console.log(err);
            
        })
    };

      useEffect(() => {
          fetchData();
      }, [id]);


      useEffect(() => {
        if (!id) return
        else {
          

          socket.on('connect', () => {
            console.log('connect')
            socket.emit('new-user-add',id)
            setIsConnected(true);
          }) 
    
    
    
          socket.on('disconnect', () => {
            setIsConnected(false);
          });
    
          socket.on('get-users', (data) => {
            console.log({active_users : data})
          });
    
          return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('get-users');
          };
        }
        }, [id]);
    
        useEffect(() => {
            console.log({__app : isConnected , socket : socket.connected})
        }, [isConnected])
        

        // useEffect(() => {
        //   // if("serviceWorker" in navigator) {
        //   //   window.addEventListener("load", function () {
        //   //    navigator.serviceWorker.register("/workers/push-notif.js").then(
        //   //       function (registration) {
        //   //         console.log("Service Worker registration successful with scope: ", registration.scope);
        //   //       },
        //   //       function (err) {
        //   //         console.log("Service Worker registration failed: ", err);
        //   //       }
        //   //     );
        //   //   });
        //   // }

        //   async function registerAndSubscribe () {
        //     try {
        //       const serviceWorkerReg = await regSw()
        //       await subscribe(serviceWorkerReg);
        //     } catch (error) {
        //       console.log (error);
        //     }
        //   }
        //   registerAndSubscribe()

        // }, [])

  return <>
  <NextSeo
        title="بهنید "
        titleTemplate=" behnid | %s"
        defaultTitle="به نید"
        description="به نید با تجربه 16 ساله افتخار همکاری با شرکت های بزرگ در حوزه ی موادغذایی ،شوینده ،بهداشتی و نوشیدنی را دارد. همچنین افتخار ارتباط با بیش از 4000 کسب و کار ، خریدار و فروشنده عمده در کارنامه خود را دارد و با بهره گیری بیش از 20 نیروی متخصص در راه کسب سود بیشتر برای عمده فروشان تلاش می کند"
        canonical="https://www.behnid.com/"
  />

  <div className={`  bg-beh-bg min-h-screen font-yekan `}>
    <Provider store={store}>
      <ReduxWrapper>
          <AuthContext.Provider value={authContextDefaults} >
            <SocketContext.Provider value={isConnected} >
              {setupDone == false ? <SetupProfileComponent handleClose={setSetupDone} avatar={myAvatar} /> : null}
              {/* <SetupProfileComponent handleClose={setSetupDone} avatar={myAvatar} /> */}
              <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-TSB0519LXH" ></Script>
              <Script
                id='google-analytics'
                strategy='lazyOnload'
              >
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-TSB0519LXH');
                `}
              </Script>
              <Component {...pageProps} />
            </SocketContext.Provider>
          </AuthContext.Provider>      
      </ReduxWrapper>
    </Provider>
  </div>
  </>
}



export default MyApp