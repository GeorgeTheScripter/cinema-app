import type { Actor } from './Actor.interface';
import type { Genre } from './Genre.interface';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres: Genre[];
  credits: {
    cast: Actor[];
  };
}
