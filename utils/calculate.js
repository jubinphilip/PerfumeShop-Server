import moment from "moment"
import { BookingModel, userModel } from "../model/model.js"
export default async function calCulateAmount(data,id)

{
    let pricedetails={
        total:0,
        discount:0,
        payable:0,
        messages:[]
    }

  let loyaltyflag=false
  let cardWideflag=false
let item=0
let amount=0
  let anniversaryflag=false

    const length=data.length
    for(let i=0;i<length;i++)
        {
            const bookingdata=await BookingModel.find({userid:id})
             if(bookingdata.length>=5)
            {
                console.log(data[i].itemid.price)
                const item=data[i].itemid.price
                data[i].itemid.price= data[i].itemid.price-(data[i].itemid.price/100)*5
                amount=item-data[i].itemid.price
                amount=amount*data[i].count
                console.log(amount)
                console.log("Price reduced")
                pricedetails.messages.push('5 bookings offer applied')
                console.log(data[i].itemid.price)
                loyaltyflag=true
            } 
        }

    const startdate='01-11-2024'
    const enddate='31-11-2024'

    const userinfo=await userModel.findById({_id:id})
        console.log("createdat",userinfo.createdAt)
        const created=moment(userinfo.createdAt).format('DD-MM-YY')
        const date=new Date()
        const joiningdate=moment(date).format('DD-MM-YY')
        console.log(created,joiningdate)

    let sprays=[]
 
    for(let i=0;i<length;i++)
    {
        sprays[i]=data[i].itemid.code
        if(data[i].itemid.code=='PF1')
        {
            const pricedetailspf1={
                total:0,
                discount:0,
                payable:0
            }
            pricedetailspf1.total=(data[i].count*data[i].itemid.price)+pricedetailspf1.total
            if(data[i].count>1)
            {
              if(data[i].count % 2==0)
              {
                const price=data[i].price/2
                console.log("dprice",price)
                pricedetailspf1.payable=price
              }
              else
              {
                const price=(data[i].price-data[i].itemid.price)/2
                const newPrice=Number(price)+Number(data[i].itemid.price)
                pricedetailspf1.payable=newPrice
                console.log(newPrice)
              }
              pricedetailspf1.discount=pricedetailspf1.total-pricedetailspf1.payable
              console.log("Discount",pricedetailspf1.discount)
              pricedetails.messages.push('50% offer applied')
            }
            else
            {
                pricedetailspf1.payable=Number(data[i].price)
            }

            console.log(pricedetailspf1)
            //pricedetails.total=pricedetails.total+ pricedetailspf1.total
            pricedetails.payable=pricedetails.payable+pricedetailspf1.payable
            pricedetails.discount=pricedetails.discount+pricedetailspf1.discount
        }
       if(data[i].itemid.code=='PF2')
        {
            const pricedetailspf2={
                total:0,
                discount:0,
                payable:0
            }
            pricedetailspf2.total=(data[i].count*data[i].itemid.price)+pricedetailspf2.total
            if(data[i].count>=3)
                {
                    const price=75*data[i].count
                    console.log(price)
                    pricedetailspf2.payable=price
                    pricedetails.messages.push('buy 3 and get 5 off offer applied')
                }
                else
                {
                    pricedetailspf2.payable=data[i].price

                }
                pricedetailspf2.discount=pricedetailspf2.total-pricedetailspf2.payable


               // pricedetails.total=pricedetails.total+pricedetailspf2.total
                pricedetails.payable=pricedetails.payable+Number(pricedetailspf2.payable)
                pricedetails.discount=pricedetails.discount+pricedetailspf2.discount
        }
        if(data[i].itemid.code=='PF4')
        {
            const pricedetailspf4={
                total:0,
                discount:0,
                payable:0
            }
            const date=new Date()
            const joiningdate=moment(date).format('DD-MM-YY')
            if(joiningdate>=startdate && joiningdate <=enddate)
            {
                 pricedetailspf4.total=data[i].price
                 pricedetailspf4.discount=data[i].price/100*15
                 pricedetailspf4.payable=pricedetailspf4.total-pricedetailspf4.discount
                 console.log(pricedetailspf4)
                 pricedetails.messages.push("Special offer for this date applied")
            }

            pricedetails.payable=pricedetails.payable+Number(pricedetailspf4.payable)
            pricedetails.discount=pricedetails.discount+pricedetailspf4.discount
        }   
        if(data[i].itemid.code=='PF5')
        {
            const pricedetailspf5={
                total:0,
                discount:0,
                payable:0
            }
            pricedetailspf5.total=(data[i].count*data[i].itemid.price)+pricedetailspf5.total
            if(data[i].count>=2)
            {
                if(data[i].count>4)
                {
                    const discount=((data[i].itemid.price*data[i].count)/100)*20
                    const price=data[i].price-discount
                    pricedetailspf5.payable=price
                    pricedetails.messages.push("Offers four buying 4 combos applied")
                }
                else
                {
                    const discount=(data[i].itemid.price*data[i].count)/10
                    const price=data[i].price-discount
                    pricedetailspf5.payable=price
                    pricedetails.messages.push("Offers four buying 2 combos applied")
                }
            }
            else
            {
                pricedetailspf5.payable=Number(data[i].price)
            }
            pricedetailspf5.discount=pricedetailspf5.total-pricedetailspf5.payable
           // pricedetails.total=pricedetails.total+pricedetailspf5.total
            pricedetails.payable=pricedetails.payable+Number(pricedetailspf5.payable)
            pricedetails.discount=pricedetails.discount+pricedetailspf5.discount

        }
        pricedetails.total=pricedetails.total+Number(data[i].price)
    }
    if(data.length==5)
    {
        pricedetails.discount=(pricedetails.total / 100)*10
        pricedetails.payable=pricedetails.total-pricedetails.discount
        pricedetails.messages.push('you are buying 5 products and offer applied')
    }
    if(data.length==6)
        {
            pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*15
            pricedetails.payable=pricedetails.total-pricedetails.discount
            pricedetails.messages.push('you are buying 6 products and offer applied')
        }
    if(pricedetails.total>500)
    {
        pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*5
        pricedetails.payable=pricedetails.total-pricedetails.discount
        cardWideflag=true
        pricedetails.messages.push('you are buying  products 500 rupees and offer applied')
    }
    if (sprays.includes('PF1') && sprays.includes('PF3'))
    {
        pricedetails.discount=pricedetails.discount+10
        pricedetails.payable=pricedetails.total-pricedetails.discount
        pricedetails.messages.push('Combo offers for  perfumes 1 and 3 applied')
    }
    if (sprays.includes('PF4') && sprays.includes('PF6'))
        {
            pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*25
            pricedetails.payable=pricedetails.total-pricedetails.discount
            pricedetails.messages.push('Combo offers for perfumes 4 and 6  applied')
        }

    if(loyaltyflag ==true & cardWideflag==true)
    {
        pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*2
        pricedetails.payable=pricedetails.total-pricedetails.discount
        pricedetails.messages.push(' offers for 5 orders applies')
    }   
    if(created==joiningdate)
    {
        pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*20
        pricedetails.payable=pricedetails.total-pricedetails.discount
        pricedetails.messages.push('Anniversary offers applied')
    }

    console.log(pricedetails.messages)
    if(amount>0)
    {
        pricedetails.discount=pricedetails.discount+amount
        pricedetails.payable=pricedetails.payable-amount
    }
    return pricedetails
}



