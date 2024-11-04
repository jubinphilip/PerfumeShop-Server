import { Router } from "express";
import { adduserController,loginUserController,getPerfumeDataController,addProductController,getOrdersController,deleteOrderController,manageCountController} from "../controller/controller.js";
const router=Router()
router.route('/register').post(adduserController)
router.route('/login').post(loginUserController)
router.route('/getdata').get(getPerfumeDataController)
router.route('/addtocart').post(addProductController)
router.route('/getorders/:id').get(getOrdersController)
router.route('/deleteOrder/:id').post(deleteOrderController)
router.route('/manageCount').post(manageCountController)
export default router