/**
 * Model User
 * 
 */
 export type User = {
    date: Date
    id: number
    email: string | null
    phone: string
    name: string | null
    password: string
    bio: string | null
    status: boolean
    Role: userRole
    avatar: string | null
    isShown: boolean
    cityID: number | null
    cityName: string | null
    xp_score: number
  }
  
  /**
   * Model Connections
   * 
   */
  export type Connections = {
    AuthorId: number
  }
  
  /**
   * Model Notifications
   * 
   */
  export type Notifications = {
    id: number
    AuthorId: number
    message: string
    date: Date
    seen: boolean
  }
  
  /**
   * Model sellerProfile
   * 
   */
  export type sellerProfile = {
    id: number
    userID: number
    userPhone: string
    shopName: string | null
    shopURLname: string | null
    shopIntro: string
    working_record: number
    sellerStatus: SellerStatus
    verified: boolean
    sellerType: sellerType
    person_1: string | null
    person_2: string | null
    person_3: string | null
    person_4: string | null
    company_1: string | null
    company_2: string | null
    company_3: string | null
    company_4: string | null
    site_header: string | null
    site_avatar: string | null
    site_optional_1: string | null
    site_optional_2: string | null
    site_optional_3: string | null
    responseTime: string | null
    phone_num_shown: boolean
  }
  
  /**
   * Model Ticket
   * 
   */
  export type Ticket = {
    id: number
    userID: number
    title: string
    message: string
    status: TicketStatus
    response: string
    responseBy: number | null
  }
  
  /**
   * Model Profile
   * 
   */
  export type Profile = {
    id: number
    userID: number
    name: string | null
    family: string | null
    address: string | null
    profilePic: string | null
    instaAcc: string | null
    workNumber: string | null
  }
  
  /**
   * Model Contacts
   * 
   */
  export type Contacts = {
    id: number
    user_Phone: string | null
    contactName: string | null
    contactNumber: string | null
  }
  
  /**
   * Model Product
   * 
   */
  export type Product = {
    id: number
    likes: number
    image: string | null
    image_2: string | null
    image_3: string | null
    title: string
    describe: string
    price: number
    addDate: Date
    packType: packType
    minOrder: number
    customerPrice: number
    producerPrice: number
    weight: string
    deliveryTime: string
    authorID: number
    cityName: string | null
    seenTime: number
    categorieID: number | null
    cityID: number | null
    unitID: number | null
    unitName: string | null
    quantity: number
    productStatus: ProductStatus
    freeDelivery: boolean
    force: boolean
    isShown: boolean
    rejectReason: string
  }
  
  /**
   * Model picture
   * 
   */
  export type picture = {
    id: number
    date: Date
    src: string
  }
  
  /**
   * Model stories
   * 
   */
  export type stories = {
    id: number
    date: Date
    authorID: number
    authorName: string
    seenTime: number
    imgSrc: string
    productID: number | null
  }
  
  /**
   * Model commentsForProducts
   * 
   */
  export type commentsForProducts = {
    id: number
    productID: number | null
    AuthorID: number | null
    message: string
    date: Date
  }
  
  /**
   * Model commentsForSellers
   * 
   */
  export type commentsForSellers = {
    id: number
    AuthorID: number | null
    message: string
    sellerID: number
    response: string | null
    date: Date
  }
  
  /**
   * Model ratesForSellers
   * 
   */
  export type ratesForSellers = {
    id: number
    AuthorID: number
    rates: Rates
    sellerID: number
    date: Date
  }
  
  /**
   * Model commentsForProductsComments
   * 
   */
  export type commentsForProductsComments = {
    id: number
    AuthorID: number | null
    commentID: number | null
    message: string
    date: Date
  }
  
  /**
   * Model City
   * 
   */
  export type City = {
    id: number
    name: string
    provienceId: number
    slug: string | null
  }
  
  /**
   * Model Provience
   * 
   */
  export type Provience = {
    id: number
    name: string
    slug: string | null
  }
  
  /**
   * Model MainCategory
   * 
   */
  export type MainCategory = {
    id: number
    name: string
  }
  
  /**
   * Model SubCategory
   * 
   */
  export type SubCategory = {
    id: number
    name: string
    mainCatName: string
    mainCatId: number
  }
  
  /**
   * Model Category
   * 
   */
  export type Category = {
    id: number
    name: string
    subCatName: string
    subCatId: number
  }
  
  /**
   * Model RequestOnProducts
   * 
   */
  export type RequestOnProducts = {
    id: number
    productID: number | null
    quantity: number
    message: string | null
    AuthorID: number
    date: Date
  }
  
  /**
   * Model FreeRequests
   * 
   */
  export type FreeRequests = {
    id: number
    name: string
    describe: string
    quantity: number
    packType: packType
    date: Date
    request_start_date: string | null
    request_expire_date: string | null
    imgsrc: string | null
    isShown: boolean
    seenTime: number
    cityId: number | null
    authorID: number
    status: RequestStatus
    force: boolean
    rejectReason: string
    unitID: number | null
    unitName: string | null
  }
  
  /**
   * Model Blog
   * 
   */
  export type Blog = {
    id: number
    title: string
    describe: string
    imgsrc: string | null
    date: Date
    likes: number
    seenTime: number
    authorId: number | null
  }
  
  /**
   * Model CategoryForBlog
   * 
   */
  export type CategoryForBlog = {
    id: number
    name: string
  }
  
  /**
   * Model commentsForBlog
   * 
   */
  export type commentsForBlog = {
    id: number
    blogID: number | null
    AuthorID: number | null
    message: string
    date: Date
  }
  
  /**
   * Model keywordForBlog
   * 
   */
  export type keywordForBlog = {
    id: number
    name: string
  }
  
  /**
   * Model keywordForFreeRequests
   * 
   */
  export type keywordForFreeRequests = {
    id: number
    name: string
    requestId: number
  }
  
  /**
   * Model keywordForProducts
   * 
   */
  export type keywordForProducts = {
    id: number
    name: string
    productId: number
  }
  
  /**
   * Model commentsForBlogComments
   * 
   */
  export type commentsForBlogComments = {
    id: number
    AuthorID: number | null
    commentID: number | null
    message: string
    date: Date
  }
  
  /**
   * Model passwdReg
   * 
   */
  export type passwdReg = {
    id: number
    phone: string
    verifyCode: string
  }
  
  /**
   * Model FAQ
   * 
   */
  export type FAQ = {
    id: number
    question: string
    answer: string
  }
  
  /**
   * Model OFF
   * 
   */
  export type OFF = {
    id: number
    off_percent: number
    off_count: number
  }
  
  /**
   * Model passwdReset
   * 
   */
  export type passwdReset = {
    id: number
    phone: string
    verifyCode: string
  }
  
  /**
   * Model Chats
   * 
   */
  export type Chats = {
    id: number
    userOneId: number
    userTwoId: number
  }
  
  /**
   * Model ChatGroup
   * 
   */
  export type ChatGroup = {
    id: number
    group_Author_id: number
    name: string
    describe: string
    avatar: string
  }
  
  /**
   * Model MessageToGroup
   * 
   */
  export type MessageToGroup = {
    id: number
    chatID: number
    senderId: number
    messageType: ChatType
    image: string | null
    voice: string | null
    pdf: string | null
    text: string | null
    replyedTo: number | null
    date: Date
    hasSeen: boolean
    liked: boolean
    productId: number | null
    requestId: number | null
  }
  
  /**
   * Model message
   * 
   */
   export type message = {
    id: number
    chatID: number
    date: Date
    text: string | null
    hasSeen: boolean
    recieverId: number
    senderId: number
    image: string | null
    voice: string | null
    liked: boolean
    pdf: string | null
    file_orginal_name: string | null
    file_size: string | null
    productId: number | null
    replyedTo: number | null
    requestId: number | null
    messageType: ChatType
  }
  
  /**
   * Model Unit
   * 
   */
  export type Unit = {
    id: number
    name: string
  }
  
  /**
   * Model SuperUser
   * //// SUPER_USER_PART
   */
  export type SuperUser = {
    id: number
    email: string | null
    phone: string
    name: string | null
    address: string | null
    password: string
    Role: superUserRole
    avatar: string | null
  }
  
  
  /**
   * Enums
   */
  
  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
  
  export const ChatType: {
    remittance: 'remittance',
    message: 'message'
  };
  
  export type ChatType = (typeof ChatType)[keyof typeof ChatType]
  
  
  export const ProductStatus: {
    pending: 'pending',
    rejected: 'rejected',
    accepted: 'accepted'
  };
  
  export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]
  
  
  export const Rates: {
    one: 'one',
    two: 'two',
    three: 'three',
    four: 'four',
    five: 'five',
    unset: 'unset'
  };
  
  export type Rates = (typeof Rates)[keyof typeof Rates]
  
  
  export const RequestStatus: {
    pending: 'pending',
    rejected: 'rejected',
    accepted: 'accepted'
  };
  
  export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]
  
  
  export const SellerStatus: {
    pending: 'pending',
    rejected: 'rejected',
    accepted: 'accepted',
    unAuthorized: 'unAuthorized'
  };
  
  export type SellerStatus = (typeof SellerStatus)[keyof typeof SellerStatus]
  
  
  export const TicketStatus: {
    pending: 'pending',
    seen: 'seen',
    done: 'done'
  };
  
  export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]
  
  
  export const packType: {
    vanet: 'vanet',
    camiun: 'camiun',
    kg: 'kg'
  };
  
  export type packType = (typeof packType)[keyof typeof packType]
  
  
  export const sellerType: {
    person: 'person',
    company: 'company'
  };
  
  export type sellerType = (typeof sellerType)[keyof typeof sellerType]
  
  
  export const superUserRole: {
    full_access: 'full_access',
    blog_admin: 'blog_admin',
    request_admin: 'request_admin',
    ticket_admin: 'ticket_admin',
    authorization: 'authorization'
  };
  
  export type superUserRole = (typeof superUserRole)[keyof typeof superUserRole]
  
  
  export const userRole: {
    Buyer: 'Buyer',
    Seller: 'Seller'
  };
  
  export type userRole = (typeof userRole)[keyof typeof userRole]
  