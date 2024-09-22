import axios from 'axios';
import { useEffect, useState } from 'react';
import { byteToGigaByte } from './helpers';
import Nav from './components/Nav';

function MovieLibrary() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/movies');
        console.log(response);
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <Nav />

      <div className='mx-12 mb-16'>
        <ul className="flex flex-wrap gap-8 justify-center">
          {movies.map((m) => (
            <li key={m.id} className="bg-slate-300 w-64 rounded-md">
              <img
                src={m.posterURL}
                alt={`${m.title} poster`}
                className="aspect-auto cursor-pointer"
                onClick={() => handlePlayMovie(m)}
              />
              <div className="p-2">
                <h3 className="font-semibold text-2xl">{m.title}</h3>
                <h4 className="font-medium text-lg">{byteToGigaByte(m.fileSize).toFixed(2)} GB</h4>
              </div>
            </li>
          ))}
        </ul>

        {selectedMovie && (
          <div>
            <h2>Now Playing: {selectedMovie.title}</h2>
            <video
              key={selectedMovie.id}
              controls
              width="720"
              height="480"
              src={`http://192.168.0.196:8080/movie/${selectedMovie.id}`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieLibrary;
