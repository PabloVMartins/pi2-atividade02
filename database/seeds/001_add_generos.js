
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('generos').del()
    .then(function () {
      // Inserts seed entries
      return knex('generos').insert([
        {name: 'RPG'},
        {name: 'Sobrevivência'},
        {name: 'Aventura'},
        {name: 'Ação'},
        {name: 'FPS'}
      ]);
    });
};
