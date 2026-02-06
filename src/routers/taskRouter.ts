import { Router, Request, Response, RequestHandler } from "express";
import TaskController from "../controllers/taskController";
import AuthMiddleware from "../middleware/authMiddleware";
import { CategoryParams } from "../interfaces/categoryDTO";
import { TaskParams } from "../interfaces/taskDTO";

const router = Router();
const controller = new TaskController();
const auth = new AuthMiddleware();

router.post("/novaTarefa", auth.validadeAuth, (req, res) => {
   // #swagger.tags = ['Tarefa']
   // #swagger.summary = 'Cadastra uma nova tarefa'
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
                        $ref: '#/components/schemas/task'
                    }
                }
            }
        }
   */

   controller.createTask(req, res);
});

router.get("/listarTarefas", auth.validadeAuth, (req, res) => {
   // #swagger.tags = ['Tarefa']
   // #swagger.summary = 'Lista as tarefas desse usuario'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
   */

   controller.listUserTasks(req, res);
});

router.get(
   "/listarTarefasPorCategoria/:cate_id",
   auth.validadeAuth,
   (req, res) => {
      // #swagger.tags = ['Tarefa']
      // #swagger.summary = 'Lista as tarefas por categoria desse usuario'
      /* #swagger.security = [{
        "bearerAuth": []
    }]
   */

      controller.listPerCategory(
         req as unknown as Request<CategoryParams>,
         res,
      );
   },
);

router.get("/listarTarefasPorId/:task_id", auth.validadeAuth, (req, res) => {
   // #swagger.tags = ['Tarefa']
   // #swagger.summary = 'Procura uma tarefa por id'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
   */

   controller.findTaskById(req as unknown as Request<TaskParams>, res);
});

router.put("/alterarTarefa", (req, res) => {
   // #swagger.tags = ['Tarefa']
   // #swagger.summary = 'Altera uma tarefa'
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
                        $ref: '#/components/schemas/taskUpdate'
                    }
                }
            }
        }
   */

   controller.updateTask(req, res);
});

router.delete("/deletarTarefa/:task_id", (req, res) => {
   // #swagger.tags = ['Tarefa']
   // #swagger.summary = 'Deleta uma tarefa'
   /* #swagger.security = [{
        "bearerAuth": []
    }]
   */

   controller.deleteTask(req as unknown as Request<TaskParams>, res);
});
