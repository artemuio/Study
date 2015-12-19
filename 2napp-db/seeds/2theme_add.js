
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('themes').del(), 
    // Inserts seed entries
    //
    knex('themes').insert({id:1,name: 'design'}),
    knex('themes').insert({id:2,name: 'travelings'}),
    knex('themes').insert({id:3,name: 'bussines'}),
    knex('themes').insert({id:4,name: 'startup'}),
    knex('themes').insert({id:5,name: 'learning'}),
    knex('themes').insert({id:6,name: 'activities'})
  );
};
