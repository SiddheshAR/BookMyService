
type Offerings ={
    name:string,
    price:number
}

export type Service = {
    name:string,
    img:string,
    duration:string,
    price:number,
    description:string,
    offerings:Offerings[]
}
