export interface IShowProps {
  id: number;
  poster_path: string;
  name: string;
  overview: string;
  backdrop_path: string;
}

export interface IMovieProps {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}
