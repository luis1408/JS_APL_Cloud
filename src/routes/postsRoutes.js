import express from "express";
import multer from "multer";
import  {listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost}  from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            // Especifica o diretório para armazenar as imagens enviadas
        cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
         // Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname);// Considere usar uma estratégia de geração de nomes únicos para produção
    }
})

// Cria uma instância do middleware Multer
//const upload = multer({ dest: "./uploads" , storage});
const upload = multer({ storage: storage });


const routes = (app) => {
    // Middleware para permitir que o servidor entenda requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota GET para buscar todos os posts
    app.get("/posts", listarPosts);
    // Rota POST para criar um post
    app.post("/posts", postarNovoPost);
    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem

    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;
