import swaggerAutogen from "swagger-autogen";

const doc = {
   info: {
      title: "API",
      description: "API REST",
   },
   servers: [
      {
         url: "http://localhost:5000",
      },
   ],
   components: {
      schemas: {
         task: {
            task_name: "academia",
            task_priority: "alta",
            cate_id: 1,
            task_day: "02/05/2025",
         },
         taskUpdate: {
            task_id: 1,
            task_name: "academia",
            task_priority: "alta",
            cate_id: 1,
            task_day: "02/05/2025",
         },
         user: {
            user_email: "gui@gmail.com",
            user_name: "Guilherme",
            user_pass: "senhaForte123",
         },
         userUpdate: {
            user_id: 1,
            user_email: "gui@gmail.com",
            user_name: "Guilherme",
            user_pass: "senhaForte123",
         },
         category: {
            cate_name: "Atividades fisicas"
         },
         categoryUpdate: {
            cate_id: 1,
            cate_name: "Atividades fisicas"
         }
      },
      securitySchemes: {
         bearerAuth: {
            type: "http",
            scheme: "bearer",
         },
      },
   },
};

const outputFile = "./src/swaggerOutput.json";
const endpointsFiles = ["./app.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
