
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('project').del(), 
    //'1', 'testproject', 'closed', '2', '1', 'asdasdasdasdasdasd', 'images/projava.png', '2015-12-18 23:59:15'

    // Inserts seed entries
    knex('project').insert({id:1,name: 'testprojcet',type:'closed',id_creator:1,id_theme:1,about:"asdasdasd"}),
    knex('project').insert({id:2,name: 'secondproject',type:'closed',id_creator:2,id_theme:2,about:"ssssssssss"}),
    knex('project').insert({id:3,name: 'thirdproject',type:'closed',id_creator:1,id_theme:3,about:"ttttttttt"})
  );
};
