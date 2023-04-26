import { Category, City, OFF, Product, Profile, User, keywordForProducts, sellerProfile } from "./async-prisma-types";

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


export type EditProductResponse =  (Product & ErrorReturned & {
    city: City | null;
    author: sellerProfile & {
        user: User & {
            profile: Profile | null;
        };
    };
    categorie: Category | null;
    keywords : keywordForProducts[],
    off : OFF[]
    sendArea: City[];
});

export type ErrorReturned = {
err? : string
msg? : string
error : any
}

export type fetchedImages = {
image_1 : string | null,
image_2 : string | null,
image_3 : string | null,
}

export type fetchMineProduct = (Product & {
    city: City | null;
    author: sellerProfile & {
        user: User & {
            profile: Profile | null;
        };
    };
})[]


export type ProductSelecetState = {
    isOpen : boolean 
    selected : Partial<(Product & {City : Partial<City>})> | null
}