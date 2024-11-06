import { Router } from "express";
import { adduserController,loginUserController,getPerfumeDataController,addProductController,getOrdersController,deleteOrderController,manageCountController,addBookingController} from "../controller/controller.js";
import { verifyToken } from "../utils/verifytoken.js";
const router=Router()
router.route('/register').post(adduserController)
router.route('/login').post(loginUserController)
router.route('/getdata').get(getPerfumeDataController)
router.route('/addtocart').post(verifyToken(),addProductController)
router.route('/getorders/:id').get(verifyToken(),getOrdersController)
router.route('/deleteOrder/:id').post(verifyToken(),deleteOrderController)
router.route('/manageCount').post(manageCountController)
router.route('/addbooking').post(verifyToken(),addBookingController)
export default router