interface IGenre {
  id: number;
  name: string;
}

interface IVideo {
  id: string;
  key: string;
  name: string;
}

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
  backdrop_path: string;
  genres: IGenre[];
  vote_count: number;
  runtime: number;
  videos: IVideo[];
  tagline: string;
  overview: string;
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
  login: string;
}

export interface ICastProps {
  id: string;
  name: string;
  character: string;
  profile_path?: string;
}
