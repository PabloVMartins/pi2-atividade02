const express = require("express");
const routes = express.Router()

const JogoController = require("./controllers/JogoController");
const DisponibilidadeController = require("./controllers/DisponibilidadeController");
const UsuarioController = require("./controllers/UsuarioController");
const EstatisticaController = require("./controllers/EstatisticaController");
const login = require("./middleware/login")

routes.get("/jogos", JogoController.index)
      .post("/jogos", login, JogoController.store)
      .put("/jogos/:id", login, JogoController.update)
      .delete("/jogos/:id", login, JogoController.destroy)
      .get("/jogos/destaques", JogoController.destaques)
      .put("/jogos/destaques/destacar/:id", JogoController.destacar);

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login);

routes.get("/disponibilidade", DisponibilidadeController.index)
      .post("/disponibilidade", DisponibilidadeController.create)
      .put("/disponibilidade/:jogo_id", DisponibilidadeController.update)
      .delete("/disponibilidade/:jogo_id", DisponibilidadeController.destroy);

routes.get("/estatistica", EstatisticaController.index);

module.exports = routes;