export default function calCulateAmount(data)
{
    const length=data.length
    let pf1=0
    let pricepf1=0
    let finalpricepf1=0
    let pf2=0
    let pricepf2=0
    let finalpricepf2=0
    let pf3=0;
    let pf4=0;
    let pf5=0;
    let pricepf5=0;
    let finalpricepf5=0;
    let pf6=0;
    for(let i=0;i<length;i++)
    {
       if(data[i].itemid._id=='672884a34967dc32c96d53b5')
       {
            pf1=data[i].count
            pricepf1=data[i].itemid.price
       }
       if(data[i].itemid._id=='672884a34967dc32c96d53b8')
        {
             pf2=data[i].count
             pricepf2=data[i].itemid.price
        }
        if(data[i].itemid._id=='672884a34967dc32c96d53b5')
        {
            if(data[i].itemid._id=='672884a34967dc32c96d53ba')
            {
                pricepf3-=10
            }
        }
        if(data[i].itemid._id=='672884a34967dc32c96d53be')
        {
            pf5=data[i].count
            pricepf5=data[i].itemid.price
        }
    }
    if(pf1==2)
    {
     finalpricepf1=Number(pricepf1)*pf1/2
        console.log(finalpricepf1)
    }
    else
    {
        finalpricepf1=Number(pricepf1)*pf1
    }
    if(pf2>=3)
    {
        finalpricepf2=(Number(pricepf2)*pf2)-75
        console.log(finalpricepf2)
    }
    else
    {
        finalpricepf2=Number(pricepf2)*pf2
    }
    if(pf5==2)
    {
        finalpricepf5=(Number(pricepf5)*2)-Number(pricepf5)/10
    }
    if(pf5>=4)
        {
            finalpricepf5=(Number(pricepf5)*pf5)-Number(pricepf5)/20
        }
    
    console.log("David Off",pf1)
    console.log("Lataffa",pf2)

 const pricedetails={
        finalpricepf1:finalpricepf1,
        finalpricepf2:finalpricepf2,
        finalpricepf5:finalpricepf5?finalpricepf5:null 
    }
    return pricedetails
}