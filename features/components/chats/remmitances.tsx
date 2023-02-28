import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../../clients/axios';
import { BACK_END } from '../../../clients/localStorage';
import { RecivedRemmitances } from '../../../types/chat-datailes';
import { AllChatNoMessageFound } from './all-chats';
import { RemmitanceListComponent } from './RemmitanceListComponents';
import NoPerson from '../../../assets/NoPerson.png'
import { BiDollar } from 'react-icons/bi';

function Remmitances(props : {shouldBeOpened : boolean}) {
    const [response, setResponse] = useState<RecivedRemmitances | null>(null);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter()

    useEffect(()=>{
        const data = localStorage.getItem('user-session')
        if (!data) router.replace('/')
    },[])
  
  
    useEffect(()=>{
      AuthorizedApiRequest
      .get(`/chats/my-remmitences`)
      .then((res) => {
        if (res.data.err) {
          setError('ارور')
        }
        else {
          setResponse(res.data as RecivedRemmitances);
          console.log(res.data)
        }
      })
      .catch((err) => {
        setError('خطا هنگام لود دیتا');
        console.log({err})
      })
      .finally(() => {
        setloading(false);
      });
    
  },[])

  return (
    <div className={`h-[80vh] shadow-xl ${props.shouldBeOpened ? 'basis-5/6 lg:basis-1/3' : 'hidden lg:block lg:basis-1/3'} text-center mx-auto w-full bg-white rounded-3xl`} >
        {/* {loading && <h1 >{'در حال لود'}</h1>} */}
        {error}
        <div className={`h-[80vh] shadow-xl ${props.shouldBeOpened ? 'basis-5/6 lg:basis-1/3' : 'hidden lg:block lg:basis-1/3'} w-full  mx-auto bg-white rounded-3xl`} >
            <div className="w-full flex justify-center h-[6rem] items-center ">
                <div className="h-14 w-[90%] rounded-2xl bg-white flex">
                    <div className='w-full h-full bg-beh-gray text-beh-green-light flex justify-center items-center'>
                    <div>
                      <BiDollar className='w-5 h-5 fill-beh-green-super-light' />
                    </div>

                    <div className='text-beh-green-super-light' >
                      <h1>حواله ها</h1>
                    </div>
                    </div>
                </div>
            </div>
{/* 
            <div className="w-full flex justify-center h-12">
              
          

            </div> */}

            <div className="w-full flex flex-col items-center h-[55vh] mt-2 overflow-y-auto scrollbar-thumb-beh-orange scrollbar-thin scrollbar-track-beh-gray">
                { !loading && response
                ?
                  <>
                      {response.map(elm =>(
                          <RemmitanceListComponent pdf={elm.pdf ? elm.pdf : null} messageId={elm.id} detaile={`${elm.text!.slice(0,20)}...`} lastdate={elm.date} img={elm.image ? elm.image : null}  key={elm.id} username={`${elm.sender.profile.name!} ${elm.sender.profile.family!}`}  chatid={elm.chatID} useravatar={elm.sender.avatar ? `${BACK_END}${elm.sender.avatar}` : NoPerson.src}  />
                      ))}
                  </>
                  : 
                    <AllChatNoMessageFound />
                }
            </div>
            </div> 
    </div> 
  )
}

export default Remmitances

