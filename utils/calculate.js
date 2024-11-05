import { BookingModel } from "../model/model.js"
export default async function calCulateAmount(data,id)

{
    let pricedetails={
        total:0,
        discount:0,
        payable:0
    }

    const length=data.length
    for(let i=0;i<length;i++)
        {
            const bookingdata=await BookingModel.find({userid:id})
             if(bookingdata.length>5)
            {
                console.log(data[i].itemid.price)
                data[i].itemid.price= data[i].itemid.price-(data[i].itemid.price/100)*5
                console.log("Price reduced")
                console.log(data[i].itemid.price)
            } 
        }
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
            }
            else
            {
                pricedetailspf1.payable=Number(data[i].price)
            }
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
                }
                else
                {
                    const discount=(data[i].itemid.price*data[i].count)/10
                    const price=data[i].price-discount
                    pricedetailspf5.payable=price
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
    }
    if(data.length==6)
        {
            pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*15
            pricedetails.payable=pricedetails.total-pricedetails.discount
        }
    if(pricedetails.total>500)
    {
        pricedetails.discount=pricedetails.discount+(pricedetails.total / 100)*5
        pricedetails.payable=pricedetails.total-pricedetails.discount
    }
    if(sprays.includes('PF1' && 'PF3'))
    {
        pricedetails.discount=pricedetails.discount+10
        pricedetails.payable=pricedetails.total-pricedetails.discount
    }
    if(sprays.includes('PF4' && 'PF6'))
        {

            pricedetails.discount=(pricedetails.total / 100)*25
            pricedetails.payable=pricedetails.total-pricedetails.discount
        }
    return pricedetails
}



