import { router } from "../config/router";
import { createUser, getUserById } from "../controllers/userController";

router.post('/users', createUser);
router.get('/getUserById', getUserById);

export default router;