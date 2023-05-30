import React from 'react'
import ProdutsTabComponent from '../../../components/Tabs/products_tab'
import { NextSeo } from 'next-seo'

function ProductsTab() {
  return (
    <>
      <NextSeo
        title="مدیریت محصولات"
      />
    <main dir="rtl" className="flex justify-center  ">
      <div className="w-full lg:max-w-7xl  z-[7] ">
        <div  className='p-2 md:p-5'>
            {/* ALL_REQUEST_PART */}
            <ProdutsTabComponent/>
        </div>
      </div>
    </main>
    </>
  )
}

export default ProductsTab