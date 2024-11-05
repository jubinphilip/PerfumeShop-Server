import { perfumeModel } from "../model/model.js";

//Function for Seeding Perfume data to database

const data=[
    {
        name:'Cool Water',
        image:'pf-1.svg',
        price:'40',
        code:'PF1',
        offers:['Buy ONe get One Free','add ck to getflat 10 off']
    },
    {
        name:'Lataffa',
        image:'sp-2.svg',
        price:'80',
        code:'PF2',
        offers:['Buy 3 for 5 off on each']
    },
    {
        name:'CK',
        image:'sp-3.svg',
        price:'50',
        code:'PF3'
    },
    {
        name:'Armani Code',
        image:'sp-4.svg',
        price:'120',
        code:'PF4',
        offers:['7 days left get 15% off']
    },
    {
        name:'Gucci Bloom',
        image:'sp-5.svg',
        price:'100',
        code:'PF5',
        offers:['buy 2 and get 10% off','buy 4 and get 15% off']
    },
    {
        name:'Chanel No.5',
        image:'sp-6.svg',
        price:'150',
        code:'PF6',
        offers:['Add Armani code for getting 25% off']

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
            price:data[i].price,
            code:data[i].code,
            offers:data[i].offers
        })
    
    }
    console.log("Perfume data seeded")
}