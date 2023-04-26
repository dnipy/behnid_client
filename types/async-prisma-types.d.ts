
/**
 * Model User
 * 
 */
export type User = {
  id: number
  email: string | null
  phone: string
  name: string | null
  password: string
  Role: userRole
  avatar: string | null
  date: Date
  cityID: number | null
  cityName: string | null
  bio: string | null
  status: boolean
  isShown: boolean
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
  sellerStatus: SellerStatus
  verified: boolean
  shopIntro: string
  company_1: string | null
  company_2: string | null
  company_3: string | null
  company_4: string | null
  person_1: string | null
  person_2: string | null
  person_3: string | null
  person_4: string | null
  sellerType: sellerType
  site_header: string | null
  shopName: string | null
  phone_num_shown: boolean
  shopURLname: string | null
  userPhone: string
  site_avatar: string | null
  working_record: number
  site_optional_1: string | null
  site_optional_2: string | null
  site_optional_3: string | null
  responseTime: string | null
}

/**
 * Model Ticket
 * 
 */
export type Ticket = {
  id: number
  userID: number
  status: TicketStatus
  responseBy: number | null
  title: string
}

/**
 * Model Ticketmessage
 * 
 */
export type Ticketmessage = {
  id: number
  ticketID: number
  userID: number | null
  adminID: number | null
  date: Date
  text: string | null
  hasSeen: boolean
  image: string | null
  voice: string | null
  pdf: string | null
  file_orginal_name: string | null
  file_size: string | null
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
  instaAcc: string | null
  profilePic: string | null
  workNumber: string | null
}

/**
 * Model Contacts
 * 
 */
export type Contacts = {
  id: number
  contactName: string | null
  contactNumber: string | null
  user_Phone: string | null
}

/**
 * Model Product
 * 
 */
export type Product = {
  id: number
  likes: number
  image: string | null
  title: string
  describe: string
  price: number
  addDate: Date
  minOrder: number
  customerPrice: number
  producerPrice: number
  weight: string
  deliveryTime: string
  authorID: number
  packType: packType
  seenTime: number
  force: boolean
  freeDelivery: boolean
  cityName: string | null
  isShown: boolean
  productStatus: ProductStatus
  rejectReason: string
  categorieID: number | null
  cityID: number | null
  unitID: number | null
  unitName: string | null
  image_2: string | null
  image_3: string | null
  quantity: number
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
  authorID: number
  authorName: string | null
  imgSrc: string | null
  seenTime: number
  date: Date
  productID: number | null
  text: string
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
  subCatId: number
  subCatName: string
}

/**
 * Model RequestOnProducts
 * 
 */
export type RequestOnProducts = {
  id: number
  productID: number | null
  quantity: number
  AuthorID: number
  date: Date
  message: string | null
}

/**
 * Model FreeRequests
 * 
 */
export type FreeRequests = {
  id: number
  date: Date
  name: string
  describe: string
  authorID: number
  imgsrc: string | null
  cityId: number | null
  quantity: number
  seenTime: number
  isShown: boolean
  packType: packType
  force: boolean
  rejectReason: string
  status: RequestStatus
  unitID: number | null
  unitName: string | null
  request_expire_date: string | null
  request_start_date: string | null
}

/**
 * Model Blog
 * 
 */
export type Blog = {
  id: number
  date: Date
  describe: string
  likes: number
  title: string
  imgsrc: string | null
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
  avatar: string
  describe: string
  name: string
}

/**
 * Model MessageToGroup
 * 
 */
export type MessageToGroup = {
  id: number
  chatID: number
  senderId: number
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
  messageType: ChatType
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
  password: string
  Role: superUserRole
  avatar: string | null
  address: string | null
}

/**
 * Model SpamProducts
 * 
 */
export type SpamProducts = {
  id: number
  author_phone: string | null
  date: Date
  productId: number
  spamType: SpamType
}

/**
 * Model SpamMessages
 * 
 */
export type SpamMessages = {
  id: number
  author_phone: string | null
  date: Date
  messageId: number
  spamType: SpamType
}

/**
 * Model SpamRequests
 * 
 */
export type SpamRequests = {
  id: number
  author_phone: string | null
  date: Date
  FreeRequestId: number
  spamType: SpamType
}

/**
 * Model SpamUsers
 * 
 */
export type SpamUsers = {
  id: number
  author_phone: string | null
  date: Date
  userId: number
  spamType: SpamType
}

/**
 * Model SpamSellers
 * 
 */
export type SpamSellers = {
  id: number
  author_phone: string | null
  date: Date
  sellerId: number
  spamType: SpamType
}

/**
 * Model SpamCommentsOnBlog
 * 
 */
export type SpamCommentsOnBlog = {
  id: number
  author_phone: string | null
  date: Date
  CommentId: number
  spamType: SpamType
}

/**
 * Model SpamCommentsOnProducts
 * 
 */
export type SpamCommentsOnProducts = {
  id: number
  author_phone: string | null
  date: Date
  CommentId: number
  spamType: SpamType
}

/**
 * Model SpamCommentsOnSellers
 * 
 */
export type SpamCommentsOnSellers = {
  id: number
  author_phone: string | null
  date: Date
  CommentId: number
  spamType: SpamType
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


export const SpamType: {
  violence: 'violence',
  unethical: 'unethical',
  Phishing: 'Phishing',
  inviteLink: 'inviteLink',
  Nuisance: 'Nuisance',
  racism: 'racism'
};

export type SpamType = (typeof SpamType)[keyof typeof SpamType]


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

