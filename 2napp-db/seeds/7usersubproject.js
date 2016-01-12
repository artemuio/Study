
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('usersubprojectbridge').del(), 

    // Inserts seed entries
    knex('usersubprojectbridge').insert({id: 1, id_user: 1 , id_subproject:1,id_role:1}),
    knex('usersubprojectbridge').insert({id: 2, id_user: 1 , id_subproject:2,id_role:1}),
    knex('usersubprojectbridge').insert({id: 3, id_user: 1 , id_subproject:3,id_role:1}),
  );
};
