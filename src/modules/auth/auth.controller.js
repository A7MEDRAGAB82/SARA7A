import { Router } from "express";
import { signUp  , login , getUserById} from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.responce.js";
const router = Router();

router.post("/sign-up", async (req, res) => {
  
  let addedUser = await signUp(req.body);
  return SuccessResponse({
    res,
    message: "user added successfully",
    status: 201,
    data: addedUser,
  });
});

router.post("/login", async (req, res) => {
  let loginUser = await login(req.body);
  return SuccessResponse({
    res,
    message: "user login successfully",
    status: 200,
    data: loginUser,
  });
});

router.get("/get-user-by-id", async (req,res)=>{
  let userData = await getUserById(req.headers)
  return SuccessResponse({ 
            res, 
            message: "User profile fetched successfully", 
            data: userData 
        });
})

export default router;
