import { Router } from "express";
import { signUp  , login} from "./auth.service.js";
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

export default router;
