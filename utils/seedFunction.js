import { perfumeModel } from "../model/model.js";

//Function for Seeding Perfume data to database

const data=[
    {
        name:'Cool Water',
        image:'pf-1.svg',
        price:'40'
    },
    {
        name:'Lataffa',
        image:'sp-2.svg',
        price:'80'
    },
    {
        name:'CK',
        image:'sp-3.svg',
        price:'50'
    },
    {
        name:'Armani Code',
        image:'sp-4.svg',
        price:'120'
    },
    {
        name:'Gucci Bloom',
        image:'sp-5.svg',
        price:'100'
    },
    {
        name:'Chanel No.5',
        image:'sp-6.svg',
        price:'150'
    },
]

export async function seedData()
{
    const length=data.length
    for(let i=0;i<length;i++)
    {
        await perfumeModel.create({
            name:data[i].name,
            image:data[i].image,
            price:data[i].price
        })
    }
    console.log("Perfume data seeded")
}