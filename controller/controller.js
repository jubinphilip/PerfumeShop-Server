import { addUser,loginUser,getPerfumeData,addProduct,getOrders, deleteOrder, manageOrder,addBooking} from "../repo/repo.js";

export async function adduserController(req,res)
{
    try
    {
    addUser(req.body,res)
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function loginUserController(req,res)
{
    try
    {
        loginUser(req,res)
    }
    catch(error)
    {
        res.status(500).json({message:"Internal Server Error"})
    }

}

export async function getPerfumeDataController(req,res)
{
    try
    {
        getPerfumeData(req,res)
    }
    catch(error)
    {
        console.log(error)
    }
}

export async function addProductController(req,res) 
{
    try
    {
        addProduct(req,res)
    }   catch(error)
    {
        console.log(error)
    }
}

export async function getOrdersController(req,res) {
    try
    {
        getOrders(req,res)
    }catch(error)
    {
        console.log(error)
    }
}
export async function deleteOrderController(req,res) {
    try
    {
        deleteOrder(req,res)
    }catch(error)
    {
        console.log(error)
    }
    
}
export async function manageCountController(req,res) {
    try
    {
       manageOrder(req,res)
    }catch(error)
    {
        console.log(error)
    }
}

export async function addBookingController(req,res) 
{
    try
    {
        addBooking(req,res)
    }
    catch(error)
    {
        console.log(error)
    }
}