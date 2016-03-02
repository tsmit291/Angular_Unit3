
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pirates', function (t){
    t.increments();
    t.string('name');
    t.string('poison');
    t.string('accessory');
    t.text('image_url');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pirates');
};
