
interface I_name_obj {
    name : string,
    id? : number
}


export interface I_add_products {
    title : string,
    describe : string,
    price : number | undefined,
    packType : string,
    minOrder : number | undefined ,
    customerPrice : number | undefined,
    producerPrice : number | undefined,
    weight : number | undefined,
    deliveryTime : string ,
    keyword_list : Array<I_name_obj>,
    cat_id : number,
    cat_name : string ,
    city_id : number,
    offPercent : number | undefined,
    offCount : number | undefined,
    freeDelivery : boolean,
    sendArea_list :  Array<I_name_obj> ,
    send_from :  number | undefined ,
    unit : number | undefined ,
    quantity : number | undefined ,
    add_story : boolean,
    showCityPicker : boolean,
    showMultiCityPicker : boolean,
    showCatPicker : boolean,
    selectedCityName : string  |  null ,
    selectedImage_1 : File | null,
    selectedImage_2 : File | null,
    selectedImage_3 : File | null,
}