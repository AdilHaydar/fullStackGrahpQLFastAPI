import { useQuery, gql } from '@apollo/client';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GET_DATA = gql`
  query GetMovies {
    getMovies {
      id
      title
      shortDescription(words: 15)
      poster
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;


  return (
    <ProtectedRoute>

    <div className="row">
      <div className="col-md-3">
        <h1>GraphQL Data</h1>
        
        <div>Left Page</div>
      </div>
      <div className="text-center col-md-6">
        <h1>GraphQL Data</h1>
        {data.getMovies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`http://localhost:8000/${movie.poster}`} alt={movie.title} height={'150px'} width={'150px'}/>
            <p>{movie.shortDescription}</p>
          </div>
        ))}
      </div>
      <div className="col-md-3">
        <h1>GraphQL Data</h1>
        
        <div>Right Page</div>
      </div>
    </div>
    
    </ProtectedRoute>
  );
  
}
