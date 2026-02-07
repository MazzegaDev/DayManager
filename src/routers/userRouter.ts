import { Router, Request, Response } from "express";
import { UserEmailParams, UserParams } from "../interfaces/userDTO";
import UserController from "../controllers/userController";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();
const controller = new UserController();
const auth = new AuthMiddleware();

router.post("/novoUsuario", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Usuario']
	// #swagger.summary = 'Cadastra um novo usuario'
	/* #swagger.security = [{
        "bearerAuth": []
    }]
   */
	/*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/user'
                    }
                }
            }
        }
   */

	controller.createUser(req, res);
});

router.get("/listarUsuario", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Usuario']
	// #swagger.summary = 'Lista todos os usuarios'
	/* #swagger.security = [{
        "bearerAuth": []
    }]
   */
	controller.listUser(req, res);
});

router.get("/listarUsuarioPorId/:user_id", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Usuario']
	// #swagger.summary = 'Busca um usuario por id'
	/* #swagger.security = [{
        "bearerAuth": []
    }]
   */

	controller.findByid(req as unknown as Request<UserParams>, res);
});

router.get("/listarUsuarioPorEmail/:user_email", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Usuario']
	// #swagger.summary = 'Busca um usuario por email'
	/* #swagger.security = [{
        "bearerAuth": []
      }]
    */

	controller.findByEmail(req as unknown as Request<UserEmailParams>, res);
});

router.put("/alterarDadosUsuario", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Usuario']
	// #swagger.summary = 'Altera um usuario'
	/*
        #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/userUpdate'
                    }
                }
            }
        }
   */
	controller.updateUser(req, res);
});

router.delete("/deletarUsuario/:user_id", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Usuario']
	// #swagger.summary = 'Deleta um usuario'
	/* #swagger.security = [{
        "bearerAuth": []
      }]
    */

	controller.deleteUser(req as unknown as Request<UserParams>, res);
});

export default router;
