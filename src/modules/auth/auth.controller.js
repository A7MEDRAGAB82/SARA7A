import { Router } from "express";
import { signUp  , login , getUserById , updateLoginData} from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/index.js";
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


export default router;
