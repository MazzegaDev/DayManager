import { Router } from "express";
import AuthController from "../controllers/authController";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();
const controller = new AuthController();
const auth = new AuthMiddleware();

router.post("/login", (req, res) => {
   // #swagger.tags = ['Login']
   // #swagger.summary = 'Se autentifica no sistema'

   /*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/login'
                    }
                }
            }
        }
   */
   controller.login(req, res);
});

router.get("/usuarioLogado", auth.validadeAuth, (req, res) => {
   // #swagger.tags = ['Login']
   // #swagger.summary = 'Retorna o usuario logado no sistema'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
   */
   controller.returnCurrentUser(req, res);
});
