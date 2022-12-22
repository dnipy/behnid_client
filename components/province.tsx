import React, { useEffect } from 'react'
import { ApiRequest } from '../clients/axios'



function Province() {
    const [province,setProvince] = React.useState<string>('تهران')

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        console.log(province)
        setProvince(e.target.value)
        console.log(province)
    }
  return (
    <div className="inline-block relative w-64">
        <select value={province} onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <option>اصفهان</option>
            <option>تهران</option>
            <option>کرج</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
  )
}




function City() {
    const [City,setCity] = React.useState<string>('تهران')
    const [cities,setCities]= React.useState([])
    const [loading,setloading] = React.useState(true)


    useEffect(()=>{
        ApiRequest
            .get('/categories/all-city')
            .then((res) => {
                console.log(res)
                setCities(res.data);
                console.log(City)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setloading(false);
            });
  },[])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        setCity(e.target.value)
    }
  return (
    <div className="inline-block relative w-64">
        <select value={City} onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                                {cities.map((elm : any)=>(
                                                    <option value={elm.name} key={elm.id} >{elm.name}</option>
                                                ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
    </div>
  )
}

export {City}