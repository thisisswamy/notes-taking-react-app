export const endpoints ={
    user:{
        register:'/users/register',
        view:'/users/{id}',
        usersList:'/users',
        byEmail:"/users/userBy/{email}",
        profile:"/users/profile"

    },
    notes:{
        save:'/notes',
        update:'/notes',
        delete:'/notes/{id}',
        view:'/notes/{id}',
        notesList:'/notes/user/{id}'
    },
    auth:{
        authenticate:'/auth/authenticate'

    },

    baseURL:()=>'http://localhost:8989/notes-service/api'
}