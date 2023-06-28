const GameViewModel = class {
    constructor(id, name, platforms, background_image, released, rating, genres, description) {
      this.id = id;
      this.name = name;
      this.platforms = platforms;
      this.background_image = background_image;
      this.released = released;
      this.rating = rating;
      this.genres = genres
      this.description = description
    }
  };
  
  module.exports = GameViewModel;
  
  



// class GameViewModel
// {
//    constructor(id, name, platforms, image, launch, ratings)
//    {
//        this.id = id;
//        this.name = name;
//        this.platforms = platforms;
//        this.image = image;
//        this.launch = launch;
//        this.ratings = ratings;
//    }
// }


// module.exports = GameViewModel;