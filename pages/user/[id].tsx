import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { userModelResponseType } from '../../types/users'
import { AuthorizedApiRequest } from '../../clients/axios'
import ErrorComponent from '../../components/alerts/error'
import WarnComponent from '../../components/alerts/warn'
import { BACK_END } from '../../clients/localStorage'
import { FiUsers } from 'react-icons/fi'
import { BsCreditCardFill } from 'react-icons/bs'
import FreeRequestComponent from '../../components/FreeRequestComponent'
import NoImg from '../../assets/NoImg.png'
import Navbar_v2 from '../../components/Navbar_v2'
import Footer from '../../components/footer'
import UserModal, { UserModalBoolean, UserModalMine } from '../../features/components/user-modal'
import { LoadingComponent } from '../../components/loading'

function SingleUser() {
        const [open,setOpen] = useState(true)
        const [userId , setUserId] = useState<number | null>(null)
        const router = useRouter();
        const {id} = router.query
        
        useEffect(()=>{
            if (!id) return
            else {
                setUserId(Number(id))
            }
        },[id])
        

      
        return (
            <>
                    {userId && <UserModalBoolean id={userId} models={open} setModels={setOpen}   />}
                    {!userId && <LoadingComponent />}
            </>
        )
      
}

export default SingleUser