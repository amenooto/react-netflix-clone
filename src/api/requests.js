const requests = {
    fetchNowPlaying: `movie/now_playing`,
    fetchNetflixOriginals: `/discover/tv?with_networks=213`,
    fetchTrending: `/trending/all/week`,
    fetchTopReted: `/movie/top_rated`,
    fetchActionMovies: `/discover/movie?width_genres=28`,
    fetchComedyMovies: `/discover/movie?width_genres=35`,
    fetchHorrorMovies: `/discover/movie?width_genres=27`,
    fetchRomanceMovies: `/discover/movie?width_genres=10749`,
    fetchDocumentaries: `/discover/movie?width_genres=99`,
}

export default requests;
