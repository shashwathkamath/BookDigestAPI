import { router } from "../config/router";
import { createUser, getUserById, updateUser } from "../controllers/userController";

router.post('/users', createUser);
router.get('/getUserById', getUserById);
router.put('/updateUser', updateUser);

export default router;