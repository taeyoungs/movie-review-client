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

export interface ISearchProps {
  id: number;
  poster_path?: string;
  profile_path?: string;
  media_type?: string;
  title?: string;
  name?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

export interface IUserProps {
  avatar: string;
}
