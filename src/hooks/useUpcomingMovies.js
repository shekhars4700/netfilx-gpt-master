import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
    // Fetch Data From TMDB API and UPDATE STORE--
    const dispatch = useDispatch();
    const upcomingMovie = useSelector((store) => store.movies.upcomingMovies);

    const getUpcomingMovies = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/upcoming?&page=1",
            API_OPTIONS
        );
        const json = await data.json();
        // Don't worry about 2 logs, It happen because of React.Strict (IT IS GOOD THING).
        // console.log(json.results);

        dispatch(addUpcomingMovies(json.results));
    };

    useEffect(() => {
        !upcomingMovie && getUpcomingMovies();
    }, []);
};

export default useUpcomingMovies;
