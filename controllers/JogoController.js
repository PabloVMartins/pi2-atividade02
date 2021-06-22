const knex = require("../database/dbConfig");

module.exports = {

  // index: listagem
  // store/create: inclusão
  // update: alteração
  // show: retornar 1 registro
  // destroy: exclusão

  async index(req, res) {

    const jogos = await knex
      .select("j.id", "j.titulo", "g.name as genero", "d.name as distribuidora", "j.ano", "j.preco", "j.foto", "j.destaque")
      .from("jogos as j")
      .leftJoin("generos as g", "j.genero_id", "g.id")
      .leftJoin("distribuidoras as d", "j.distribuidora_id", "d.id")
      .orderBy("j.id", "desc");

    res.status(200).json(jogos);
  },

  async store(req, res) {

    const { titulo, genero_id, distribuidora_id, ano, preco, foto } = req.body;

    if (!titulo || !genero_id || !distribuidora_id || !ano || !preco || !foto) {
      res.status(400).json({ msg: "Faltou algo" });
      return;
    }

    try {
      const novo = await knex("jogos").insert({ titulo, genero_id, distribuidora_id, ano, preco, foto });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async update(req, res) {

    const { id } = req.params;
    const { titulo, genero_id, distribuidora_id, ano, preco } = req.body;

    const novo = await knex("jogos").where({ id })

    if (!novo[0]) {
      res.status(400).json({ msg: "Jogo não encontrado." })
      return;
    }

    try {
      await knex("jogos").update({ titulo, genero_id, distribuidora_id, ano, preco }).where({ id })
      res.status(200).json("Jogo atualizado com sucesso.")
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },

  async destroy(req, res) {

    const { id } = req.params

    const novo = await knex("jogos").where({ id })

    if (!novo[0]) {
      res.status(400).json({ msg: "Jogo não encontrado." })
      return;
    }

    try {
      await knex("jogos").del().where({ id })
      return res.status(200).json("Jogo excluído com sucesso.")
    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },

  async destaques(req, res) {

    try {
      const novo = await knex("jogos").where("destaque", "=", true)

      if (novo.length >= 1) {
        res.status(200).json(novo)
        return;
      }
      else {
        res.status(400).json("Não há jogos em destaque.")
      }

    } catch (error) {
      res.status(400).json({ msg: error.message })
    }
  },

  async destacar(req, res) {

    const { id } = req.params
    const novo = await knex("jogos").where({ id })

    if (!novo[0]) {
      res.status(400).json({ msg: "Jogo não encontrado." })
      return;
    }

    try {
      if (novo[0].destaque) {
        await knex("jogos").where({ id }).update({ destaque: false })
        res.status(200).json("Jogo removido dos destaques.")
      }
      else {
        await knex("jogos").where({ id }).update({ destaque: true })
        res.status(200).json("Jogo adicionado aos destaques.")
      }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
  }
};