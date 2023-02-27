import { Chats, message, User } from "./async-prisma-types";

export type ChatDetailes = Chats & {
    userOne: User & {
        profile: {
            name: string;
            family: string;
        };
    };
    userTwo: User & {
        profile: {
            name: string;
            family: string;
        };
    };
    message: message[];
}
  
  
  
export interface ChatDetailesFields {
    textInput : string ;
    imageInput : File | null;
    imageText : string;
    remmitanceText : string;
    remittance : File | null;
    pdf : File | null ;
    replyedTo : number | null;
    sendLoading : boolean
}
  
export interface ChatDetailesModels {
      modalSelectorOpen : boolean;
      FileSelectOpen: boolean;
      imageSendOpen: boolean;
      pdfSendOpen: boolean;
      locationSendOpen: boolean;
      remittanceSendOpen: boolean;
      userProfileOpen : boolean;
      userAvatarOpen : boolean;
      ShowImage : boolean;
      ShowImageSrc : string;

      showUpdateMessage : boolean;
      messageId : number | null
      
      fullPic : boolean ,
      fullPicSrc : string
}


export type sendHandle = {
    imageSend : () => void;
    remmitanceSend : () => void;
    pdfSend : () => void;
}


export type RecivedRemmitances = (message & {
    sender: {
        avatar: string;
        profile: {
            name: string;
            family: string;
        };
    };
  })[]
  