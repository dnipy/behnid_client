export function packTypeCheck(packType : string):string {
    switch(packType){
        case 'vanet':
            return "وانت"
            
        case 'camiun':
            return "کامیون"
            
        case 'kg' : 
            return "کیلوگرم"

        default: 
            return "کیلوگرم "

    }
}