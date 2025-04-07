import { useQuery, gql } from '@apollo/client';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GET_DATA = gql`
  query GetData {
    getUsers {
      id
      username
      fullName
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
        {data.getUsers.map((user) => (
          <div key={user.id}>
            <h2>{user.fullName}</h2>
            <p>{user.username}</p>
          </div>
        ))}
      </div>
      <div className="text-center col-md-6">
        <h1>GraphQL Data</h1>
        {data.getUsers.map((user) => (
          <div key={user.id}>
            <h2>{user.fullName}</h2>
            <p>{user.username}</p>
          </div>
        ))}
      </div>
      <div className="col-md-3">
        <h1>GraphQL Data</h1>
        {data.getUsers.map((user) => (
          <div key={user.id}>
            <h2>{user.fullName}</h2>
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
    
    </ProtectedRoute>
  );
  
}
