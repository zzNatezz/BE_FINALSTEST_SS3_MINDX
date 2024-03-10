import { movieModel } from "../model/movideModel.js";

const searchController = {
  search: async (req, res) => {
    const query = req.params.query.toLowerCase();
    try {
      const movies = await movieModel.find();
      movies.filter((movie) => movie.name.toLowerCase().includes(query));
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export { searchController };
