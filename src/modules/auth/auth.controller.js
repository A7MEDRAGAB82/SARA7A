import { Router } from "express";
import { signUp  , login , getUserById , updateLoginData , deleteUser , updatePassword , forgotPassword} from "./auth.service.js";
import { NotFoundException, SuccessResponse } from "../../common/utils/response/index.js";
import { verifyToken , asyncWrapper} from "../../middlewares/index.js"

const router = Router();

router.post("/sign-up", asyncWrapper(async (req, res) => {
  
  let addedUser = await signUp(req.body);
  return SuccessResponse({
    res,
    message: "user added successfully",
    status: 201,
    data: addedUser,
  });
}));

router.post("/login", asyncWrapper(async (req, res) => {
  let loginUser = await login(req.body);
  return SuccessResponse({
    res,
    message: "user login successfully",
    status: 200,
    data: loginUser,
  });
}));

router.get("/get-user-by-id", verifyToken  , asyncWrapper(async (req,res)=>{
  let userData = await getUserById(req.user.id)
  return SuccessResponse({ 
            res, 
            message: "User profile fetched successfully", 
            data: userData 
        });
})
)

router.patch("/update-login-data" , verifyToken , asyncWrapper(async (req ,res)=>{
  let updateUser = await updateLoginData(req.user.id , req.body)
  return SuccessResponse({
    res,
    message:"user data updated successfully",
    data:updateUser
  })
}))

router.delete("/delete-user", verifyToken , asyncWrapper(async (req,res)=>{
  let deletedUser = await deleteUser(req.user.id)
  return SuccessResponse({
    res,
    message:"user deleted successfully",
  })
}))

router.patch("/update-password" , verifyToken , asyncWrapper(async (req, res)=>{
  let {oldPassword  , newPassword} = req.body
  let updatedUser = await updatePassword(req.user.id , oldPassword , newPassword)
  return SuccessResponse({
    res,
    message:"password updated successfully",
    data:updatedUser
  })
  

}))

router.post("/forgot-password", asyncWrapper(async (req, res) => {
    const { email } = req.body;

    const result = await forgotPassword(email);

    return SuccessResponse({
        res,
        message: result.message,
        status: 200
    });
}));




export default router;
