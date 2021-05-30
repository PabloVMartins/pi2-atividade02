const knex = require("../database/dbConfig");
const { destroy } = require("./JogoController");

module.exports = {

	// index: listagem
	// store/create: inclusão
	// update: alteração
	// show: retornar 1 registro
	// destroy: exclusão

	async index(req, res) {

		const disp = await knex
			.select("d.id", "j.titulo as jogo", "d.disponivel")
			.from("disponibilidade as d")
			.join("jogos as j", "d.jogo_id", "j.id")
			.orderBy("d.id");

		res.status(200).json(disp);
	},

	async create(req, res) {

		const { jogo_id } = req.body

		if (!jogo_id) {
			res.status(400).json({ msg: "Faltou algo" });
			return;
		}

		try {
			const novo = await knex("disponibilidade").insert({ jogo_id });
			res.status(201).json(novo[0]);
		} catch (error) {
			res.status(400).json({ msg: error.message });
		}
	},

	async update(req, res) {

		const { jogo_id } = req.params
		const novo = await knex("disponibilidade").where({ jogo_id })

		if(!novo[0]) {
			res.status(400).json({ msg: "Jogo não encontrado." })
      return;
		}

		try {
      if (novo[0].disponivel) {
        await knex("disponibilidade").where({ jogo_id }).update({ disponivel: false })
        res.status(200).json("Jogo adicionado aos indisponiveis.")
      }
      else {
        await knex("disponibilidade").where({ jogo_id }).update({ disponivel: true })
        res.status(200).json("Jogo adicionado aos disponiveis.")
      }
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

	},

	async destroy(req, res) {

		const { jogo_id } = req.params
		const novo = await knex("disponibilidade").where({ jogo_id })

		if(!novo[0]) {
			res.status(400).json({ msg: "Jogo não encontrado." })
      return;
		}

		try {
			await knex("disponibilidade").del().where({ jogo_id })
			res.status(200).json(novo[0])
		} catch (error) {
			res.status(400).json({ msg: error.message })
		}
	}
}