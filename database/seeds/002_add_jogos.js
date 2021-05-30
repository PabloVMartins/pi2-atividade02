
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('jogos').del()
    .then(function () {
      // Inserts seed entries
      return knex('jogos').insert([
        { titulo: "Final Fantasy XV", genero_id: 1, distribuidora_id: 1, ano: 2016, preco: 100, foto: "https://upload.wikimedia.org/wikipedia/pt/d/d3/Final_Fantasy_XV_capa.png" },
        { titulo: "Valheim", genero_id: 2, distribuidora_id: 2, ano: 2021, preco: 40, foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqVEgQIczMaWTk9CNDjQPGt400EJFrnoinfQ&usqp=CAU" },
        { titulo: "Destiny 2", genero_id: 5, distribuidora_id: 3, ano: 2017, preco: 100, foto: "https://static-cdn.jtvnw.net/ttv-boxart/Destiny%202.jpg" }
      ]);
    }
  );
};
