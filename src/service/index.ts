import type { Genre } from './interfaces/Genre.interface';
import type { Movie } from './interfaces/Movie.interface';
import type { Favorite } from './interfaces/Favorite.interface';
import type { MoviesResponse } from './interfaces/MovieResponse.interface';

import { getImageUrl } from './helpers/getImage';
import { movieService } from './api/movieService';

export type { Genre, Movie, MoviesResponse, Favorite };
export { getImageUrl, movieService };
