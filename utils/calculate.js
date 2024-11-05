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
    }

    return pricedetails
}



