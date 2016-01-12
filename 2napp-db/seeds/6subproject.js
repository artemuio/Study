
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('subproject').del(), 

    // Inserts seed entries
    knex('subproject').insert({id:1,subproject_name: 'firstsubtestproject',id_creator:1,id_project:1,about:"firstfirstfiirst"}),
    knex('subproject').insert({id:2,subproject_name: 'secondsubtestproject',id_creator:1,id_project:1,about:"secondsecond"}),
    knex('subproject').insert({id:3,subproject_name: 'thirdsubtestproject',id_creator:1,id_project:1,about:"thirdthirdthird"}),
  );
};
