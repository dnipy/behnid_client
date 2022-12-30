import React from 'react'
import { BiUser } from 'react-icons/bi'
import { AiFillCustomerService, AiFillInstagram, AiFillPhone, AiFillSafetyCertificate } from 'react-icons/ai'
import useAxios from '../hooks/useAxios'

function Footer() {
    const {response} = useAxios('/blog/last-four')

  return (
    <div>
        <footer className="relative bg-blueGray-200 pt-8 pb-6">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap text-left lg:text-left">
      <div className="w-full lg:w-6/12 px-4 text-center">
        <h4 dir='rtl' className="text-3xl fonat-semibold text-blueGray-700">بهنید بازار ایمن در جیب شما</h4>
        <h5 className="text-lg mt-0 mb-2 text-gray-800">
          با ثبتنام در پلتفرم ایمن بهنید تمام معاملات سنگین خود را راحت کنید
        </h5>
        <div className="mt-6 lg:mb-0 mb-6">
          <button className="bg-orange-400  text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <AiFillCustomerService className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
          </button>

          <button className="bg-orange-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <AiFillPhone className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
          </button>

          <button className="bg-orange-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <AiFillInstagram className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
          </button>

          <button className="bg-orange-400 text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
            <AiFillSafetyCertificate className='ml-auto mr-auto w-5 h-5 text-gray-800'/>
          </button>
            
        </div>
      </div>
      <div className="w-full lg:w-6/12 px-4">
        <div className="flex flex-wrap items-top mb-6 text-center">
          <div className="w-full lg:w-4/12 px-4 ml-auto">
            <span className="block uppercase text-blueGray-500 text-xl font-semibold mb-4 pb-2 border-b border-b-orange-400">اخرین مطالب بلاگ</span>
            <ul  className="list-unstyled">
             
             {(response as Array<any>).map((elm : any)=>(
                        <li key={elm.id}>
                            <a dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" href={`/blog/${elm.id}`}>{elm.title}</a>
                        </li>
                             
             ))}

            </ul>
          </div>
          <div className="w-full lg:w-4/12 px-4 text-center">
            <span className="block uppercase text-blueGray-500 text-xl  font-semibold mb-4 pb-2 border-b border-b-orange-400 ">  صفحات استتیک</span>
            <ul className="list-unstyled">
              <li>
                <a dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">تماس با ما</a>
              </li>
              <li>
                <a dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">سوالات متداول</a>
              </li>
              <li>
                <a dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">ارتباط با ما</a>
              </li>
              <li>
                <a dir='rtl' className="text-gray-800 hover:text-orange-400 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">درگاه ایمن</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr className="my-6 border-blueGray-300"/>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2021</span> 
          <a href="https://linkedin.com/in/dnipy" className="text-blueGray-500 hover:text-blueGray-800"> by @dnipy</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer