export interface MovieData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ApiResponse {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}
