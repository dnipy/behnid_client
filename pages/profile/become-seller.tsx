import { NextPage } from "next";
import { ErrorComponent } from "../../components/error";
import { WarnComponent } from "../../components/warn";
import {useAuthorizedAxios} from "../../hooks/useAxios";
import StepWizard from "react-step-wizard";
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { ApiRequest, AuthorizedApiRequest } from "../../clients/axios";
import Router from "next/router";
import ProfileCard from "../../components/ProfileCard";
import { AuthContext } from "../../contexts/Auth";


const Page : NextPage = ()  => {
  // const {isUser} = useContext(AuthContext)
    
  // if (isUser()) {
  //         Router.replace('/')
  // }
  return (
    <>
        <div className="">
             <FirstStep  />
        </div>
    </>
  )
}  




//title  desc price send_area min_order max_order city customer_price prudocer_price pack_type delivery time weight image

function FirstStep(props : any) {

  return (
    <div>

        <div  className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg my-16">
                <h3 className="text-2xl font-bold text-center">فروشنده شو</h3>
                {/* <form > */}

                    <div dir="rtl" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-y-10">
                        <ProfileCard title="حقیقی"  describe=" برای فرد حقیقی  " link="/profile/natural-person"/>
                        <ProfileCard title="حقوقی"  describe="برای شرکت و تولیدی" link="/profile/legal-person"/>
                    </div>
                    </div>
                    
                {/* </form> */}
            </div>
        </div>

    </div>
  )
}







export default Page