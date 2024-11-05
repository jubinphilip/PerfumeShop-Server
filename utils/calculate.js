export default function calCulateAmount(data)
{
    let pricedetails={
        total:0,
        discount:0,
        payable:0
    }
    console.log("Calculate function",data)
    const length=data.length
    for(let i=0;i<length;i++)
    {
        pricedetails.total=(data[i].count*data[i].itemid.price)+pricedetails.total
        if(data[i].itemid.code=='PF1')
        {
            if(data[i].count>1)
            {
              if(data[i].count % 2==0)
              {
                const price=data[i].price/2
                console.log("dprice",price)
                pricedetails.payable=price
              }
              else
              {
                const price=(data[i].price-data[i].itemid.price)/2
                const newPrice=Number(price)+Number(data[i].itemid.price)
                pricedetails.payable=newPrice
                console.log(newPrice)
              }
              pricedetails.discount=pricedetails.total-pricedetails.payable
              console.log("Discount",pricedetails.discount)
            }
            else
            {
                pricedetails.payable=data[i].price
            }
        }
        else if(data[i].itemid.code=='PF2')
        {
            if(data[i].count>3)
                {
                    const price=75*data[i].count
                    console.log(price)
                    pricedetails.payable=price
                }
                else
                {
                    pricedetails.payable=data[i].price

                }
                pricedetails.discount=pricedetails.total-pricedetails.payable
        }
        else if(data[i].itemid.code=='PF5')
        {
            if(data[i].count>=2)
            {
                if(data[i].count>4)
                {
                    const discount=((data[i].itemid.price*data[i].count)/100)*20
                    const price=data[i].price-discount
                    pricedetails.payable=price
                }
                else
                {
                    const discount=(data[i].itemid.price*data[i].count)/10
                    const price=data[i].price-discount
                    pricedetails.payable=price
                }
            }
            pricedetails.discount=pricedetails.total-pricedetails.payable
        }
    }

    return pricedetails
}



