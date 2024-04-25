const User = require("../models/UseModel");

module.exports.addToLikedMovie = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return res.json({ msg: "Movie Already there in movie list" });
      }
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.json({ msg: "Movie added successfully" });
    }
  } catch (error) {
    return res.json({ msg: "Error Occured" });
  }
};
module.exports.getLikedMovie = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ msg: "Success", movies: user.likedMovies });
    } else {
      return res.json({ msg: "user with given email not found" });
    }
  } catch (error) {
    res.json({ msg: "error ocuured in fetching" });
  }
};
module.exports.remove = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ mag: "Movie Not found" });
      } else {
        likedMovies.splice(movieIndex, 1);
      }
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );
      return res.json({ msg: "deleted successfully", movies: likedMovies });
    }
  } catch (error) {
    res.json({ msg: "error ocuured in deleting" });
  }
};
