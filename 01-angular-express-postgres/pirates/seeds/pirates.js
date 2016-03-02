exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('pirates').del(),

    knex('pirates').insert({
      name: 'Anne Bonney',
      poison: 'Rum',
      accessory: 'hot temper',
      image_url: 'http://2.bp.blogspot.com/-WSKMEi_MH5U/U-AdUnMNuvI/AAAAAAAABI8/fv0BXLICx8c/s1600/Anne_Bonny_color.jpg'
    }),
    knex('pirates').insert({
      name: 'Captain Jack Sparrow',
      poison: 'Whiskey',
      accessory: 'intoxication',
      image_url: 'http://jamaicanechoes.com/wp-content/uploads/2012/09/johnny-depp_capt-jack-sparrow1.jpg'
    }),
    knex('pirates').insert({
      name: 'Blackbeard',
      poison: 'Rum',
      accessory: 'peg leg',
      image_url: 'http://www.qaronline.org/portals/3/images/Black%20Beard-Kachik.jpg'
     })
  );
};
