import type { Genre } from './interfaces/Genre.interface';
import type { Movie } from './interfaces/Movie.interface';
import type { Filters } from './interfaces/Filters.interface';
import type { MoviesResponse } from './interfaces/MovieResponse.interface';
import type { Period } from './interfaces/Period.type';

import { getImageUrl } from './helpers/getImage';
import { movieService } from './api/movieService';

export type { Genre, Movie, MoviesResponse, Filters, Period };
export { getImageUrl, movieService };
