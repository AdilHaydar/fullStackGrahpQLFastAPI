import { useQuery, gql } from '@apollo/client';
import ProtectedRoute from '../components/ProtectedRoute';

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
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ProtectedRoute>
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="form-group text-center">
          <label>Title</label>
          <input type="text" className="form-control" placeholder="Title"/>
        </div>
        <div className="form-group text-center">
          <label>Description</label>
          <textarea className="form-control"></textarea>
        </div>
        <div className="form-group text-center">
          <label>Year</label>
          <input type="number" className="form-control" placeholder="Year"/>
        </div>
        <div className="form-group text-center">
          <label>Rating</label>
          <input type="number" className="form-control" placeholder="Rating"/>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
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
