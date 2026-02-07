import { CategoryParams } from "../interfaces/categoryDTO";
import { Request, Response, Router } from "express";
import AuthMiddleware from "../middleware/authMiddleware";
import CategoryController from "../controllers/categoryController";

const router = Router();
const controller = new CategoryController();
const auth = new AuthMiddleware();

router.post("/novaCategoria", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Categoria']
	// #swagger.summary = 'Cria uma categoria'
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
                        $ref: '#/components/schemas/category'
                    }
                }
            }
        }
   */

	controller.createCategory(req, res);
});

router.get("/listarCategorias", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Categoria']
	// #swagger.summary = 'Lista todas as categoria do usuario'
	/* #swagger.security = [{
        "bearerAuth": []
    }]
   */
	controller.listUserCategory(req, res);
});

router.get("/listarCategoriaPorId/:cate_id", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Categoria']
	// #swagger.summary = 'Busca uma categoria por id'
	/* #swagger.security = [{
        "bearerAuth": []
    }]
   */

	controller.findById(req as unknown as Request<CategoryParams>, res);
});

router.put("/alterarCategoria", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Categoria']
	// #swagger.summary = 'Altera uma categoria'
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
                        $ref: '#/components/schemas/categoryUpdate'
                    }
                }
            }
        }
   */
	controller.updateCategory(req, res);
});

router.delete("/deletarCategoria/:cate_id", auth.validadeAuth, (req, res) => {
	// #swagger.tags = ['Categoria']
	// #swagger.summary = 'Deleta uma categoria'
	/* #swagger.security = [{
        "bearerAuth": []
    }]
   */

	controller.deleteCategory(req as unknown as Request<CategoryParams>, res);
});

export default router;
