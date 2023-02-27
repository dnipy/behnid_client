import { Audio } from "react-loader-spinner"

export const ChatLoading = (props : { shouldBeOpened : boolean })=>{
    return (
      <div className={`h-[90vh] sm:mt-[12vh] shadow-xl mt-10 md:h-[80vh]  ${props.shouldBeOpened ? 'basis-5/6 lg:basis-2/3' : 'hidden lg:block  lg:basis-2/3'}   mx-auto  bg-white rounded-3xl`}>
        <div className="w-full h-full   ">
          <div className=' w-full h-full flex justify-center items-center'>
              <Audio color='#fb923c' />
          </div>
        </div>
      </div>
    )
}
  