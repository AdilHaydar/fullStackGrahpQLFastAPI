"use client"

import { gql, useLazyQuery } from '@apollo/client';
import ProtectedRoute from '../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import styles from '../styles/MenuItem.module.css'
import LeftMenuItem from '../components/LeftMenuItem';

const GET_DATA = gql`
query GetRelatedMovies($userId: Int!) {
  getRelatedMovies(userId: $userId) {
    id
    title
    shortDescription(words: 15)
    poster
    user {
      username
    }
  }
}`

export default function Home() {
  const [getUserData, { loading, error, data }] = useLazyQuery(GET_DATA);

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userId"))
    if (userId) {
      getUserData({ variables: { userId: userId } });
    }

  }, []);

  if (loading ||!data) return <p>Loading...</p>;


  return (
    <ProtectedRoute>

    <div className="row">
      <div className="col-md-3">
        <h1>GraphQL Data</h1>
        
        <div>
          <LeftMenuItem cssClass={styles.leftMenuItem} icon="bi bi-house-door-fill" route="/"  name="Anasayfa"/>
          <LeftMenuItem cssClass={styles.leftMenuItem} icon="bi bi-house-door-fill" route="/profile"  name="Profil"/>
          <LeftMenuItem cssClass={styles.leftMenuItem} icon="bi bi-house-door-fill" route="/settings"  name="Ayarlar"/>
        </div>
      </div>
      <div className="text-center col-md-6 mb-5">
        <h1>Anasayfa</h1>
        <hr></hr>
        {data?.getRelatedMovies.map((movie) => (
          <div key={movie.id}>
            <div className="d-flex justify-content-around">
              <div>
                <img height={'25px'} width={'25px'} />
                <p>{movie.user.username}</p>
              </div>
              <h2>{movie.title}</h2>
            </div>
              
            <div>            
            
            </div>
            
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
