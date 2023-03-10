export interface Auth {
    accessToken:string,
    user:{
        id:number,
        name:string,
        admin:boolean
        gender:string,
        birthday:string,
        email:string, 
        password:string,
    }
}

export interface AuthRegister{
    name:string,
    gender:string,
    birthday:string,
    email:string, 
    password:string
}

export interface AuthLogin{
    email:string, 
    password:string
}

export interface UserPut{
    name:string,
    gender:string,
    birthday:string,
    email:string, 
    password:string
}

export interface UserPartecipanti{
    user:{
        id:number,
        name:string,
        admin:boolean
        gender:string,
        birthday:string,
        email:string, 
        password:string,
    }
}

