import { useQuery, gql } from '@apollo/client';

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
    <div>
      <h1>GraphQL Data</h1>
      {data.getUsers.map((user) => (
        <div key={user.id}>
          <h2>{user.fullName}</h2>
          <p>{user.username}</p>
        </div>
      ))}
    </div>
  );
}
