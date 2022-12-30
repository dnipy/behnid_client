import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AuthorizedApiRequest } from '../../clients/axios';

function RecivedRequests() {

  const router = useRouter()
  const {id} = router.query;

 
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(()=>{
      const data = localStorage.getItem('user-session')
      if (!data) router.replace('/')
  },[])

  useEffect(()=>{
    if (!id) {
      return 
    }
    console.log({id})
    AuthorizedApiRequest
    .get(`/products/mine-single?id=${id}`)
    .then((res) => {
      console.log(res.data)
      if (res.data.err) {
        setError('ارور')
      }
      else {
        setResponse(res.data);
        console.log(res.data)
      }
    })
    .catch((err) => {
      setError(err);
    })
    .finally(() => {
      setloading(false);
    });
  
  },[id])


  return (
    <div>RecivedRequests</div>
  )
}

export default RecivedRequests