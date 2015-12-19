
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('userprojctbridge').del(), 

    // Inserts seed entries
    knex('UserProjectbridge').insert({id:1,id_user:1,id_project:1,id_role:1}),
    knex('userprojectbridge').insert({id:2,id_user:1,id_project:2,id_role:1}),
    knex('userprojectbridge').insert({id:3,id_user:1,id_project:3,id_role:1}),
    knex('userprojectbridge').insert({id:4,id_user:2,id_project:1,id_role:1}),
    knex('userprojectbridge').insert({id:5,id_user:2,id_project:2,id_role:1})
  );
};
