
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('user').del(), 
    //knex('user').del(), 

    // Inserts seed entries
    knex('user').insert({id: 1, username: 'asd',firstname:"Lolka 1",lastname:"Lokovich 1",email:"ll@ll1",hashedPassword:"$2a$10$YFDp/ncOzifJoiBmjoplYOj4l3dyoF3zm6x0kD2WNg7iy6H8CCpLu",authenticationToken:"lolka1token"}),//pass : asd
    knex('user').insert({id: 2, username: 'asdlol',firstname:"Lolka 2",lastname:"Lokovich 2",email:"ll@ll2",hashedPassword:"$2a$10$YFDp/ncOzifJoiBmjoplYOj4l3dyoF3zm6x0kD2WNg7iy6H8CCpLu",authenticationToken:"lolka2token"})//pass : asd
  );
};
