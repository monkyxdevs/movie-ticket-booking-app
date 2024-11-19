import axios from "axios";
import { useEffect, useState } from "react";


interface Movie {
    movieImg: string;
    movieName: string;
    movieCategory: string;
}
export const HomePage = () => {
    const [movies,setMovies] = useState<Movie[]>([]);

    const getMovies = () => {
        axios.get("http://localhost:3000/api/m1/movie/").then((res)=>{
            if (Array.isArray(res.data)) {
                setMovies(res.data)
            }else{
                setMovies([]);
            }
        }).catch((err)=>{
            console.error("Error Fetching Movies.",err);
        })
    }
    useEffect(()=>{
        getMovies();
    },[])
    return(
        <div >
            <div className="flex justify-center mt-10">
                <div className="flex flex-row gap-72">
                    <div>
                        sdsd
                    </div>
                    <h1 className="flex items-center text-5xl font-extrabold dark:text-white">Movie Ticket
                        <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">PRO</span>
                    </h1>
                    <div>
                        djhjhjh
                    </div>
                </div>
            </div>
            <div className="py-5 text-center">
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-6 xl:px-80 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            </div>
            
            <form className="max-w-xl mx-auto">   
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Movies,Events,Sports and Activities" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className="flex p-10 justify-center p-20 border border-black">
                <div className="grid grid-cols-4 gap-5 p-10 border border-red-600">
                    {movies.length > 0 ? (
                    movies.map((movie,index)=>(
                        <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src={movie.movieImg} alt="Movie-Img" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{movie.movieName}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{movie.movieCategory}</p>
                                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                     Read more
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )) 
                    ):(
                        <div>
                            <h1>Loading....</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}