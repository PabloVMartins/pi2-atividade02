
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('distribuidoras').del()
    .then(function () {
      // Inserts seed entries
      return knex('distribuidoras').insert([
        {name: 'Square Enix'},
        {name: 'Coffe Stain Studios'},
        {name: 'Bungie'},
        {name: 'Rockstar'}
      ]);
    });
};
