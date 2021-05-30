const knex = require('../database/dbConfig')

module.exports = {

  async index(req, res) {

    try {
      const est = await knex("jogos").count({ jogos: '*' })
                                     .min({ menor: 'preco' })
                                     .max({ maior: 'preco' })
                                     .avg({ media: 'preco' })
      res.status(200).json({ jogos: est[0].jogos,
                             menor: est[0].menor,
                             maior: est[0].maior,
                             media: Number(est[0].media).toFixed(2)})
    } catch {
      res.status(400).json({ msg: error.message })
      }    
	}
}