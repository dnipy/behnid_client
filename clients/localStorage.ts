if (typeof window !== 'undefined') {
    var usersession = localStorage.getItem('user-session')
}

if (typeof window !== 'undefined') {
    var user_id = localStorage.getItem('user-id')
}

if (typeof window !== 'undefined') {
    var BACK_END = process.env.NEXT_PUBLIC_BACK_END
}

export {usersession,user_id,BACK_END}