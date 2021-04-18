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
  vote_count: number;
  runtime: number;
  tagline: string;
  overview: string;
}

export interface IDetailProps {
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
  title: string;
  media_type: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
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

export interface IPersonProps {
  id: number;
  name: string;
  known_for_department: string;
  profile_path?: string;
}

export interface IWriterProps {
  name: string;
  avatar: string;
}

export interface IReviewProps {
  id: number;
  content: string;
  writerId: number;
  movieTitle: string;
  movieId: string;
  rating: number;
  likeCount: number;
  isLike: false;
  writer: IWriterProps;
}

export interface IWorkProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  media_type?: string;
}
