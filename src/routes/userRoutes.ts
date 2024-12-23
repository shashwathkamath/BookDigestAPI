import { router } from "../../config/router";
import { createUser } from "../controllers/userController";

router.post('/users', createUser);

export default router;