from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from .database import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    created_at = Column(TIMESTAMP, server_default=func.now()) 
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now()) 
    
    movies = relationship("MoviesAndSeries", back_populates="user")
    comments = relationship("Comment", back_populates="user")
    
    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hashed_password)

    def set_password(self, password: str):
        self.hashed_password = pwd_context.hash(password)
        
        
        
class MoviesAndSeries(Base):
    __tablename__ = 'movies_and_series'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    title = Column(String, index=True)
    year = Column(Integer)
    type = Column(String)
    genre = Column(String)
    description = Column(String)
    poster = Column(String)
    rating = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now()) 
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())  
    
    user = relationship("User", back_populates="movies")
    comments = relationship("Comment", back_populates="movie")
    
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": {"id": self.user.id, "username": self.user.username},
            "title": self.title,
            "year": self.year,
            "type": self.type,
            "genre": self.genre,
            "description": self.description,
            "poster": self.poster,
            "rating": self.rating,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    
    
class Comment(Base):
    __tablename__ = 'comments'
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    movie_id = Column(Integer, ForeignKey('movies_and_series.id'), nullable=False)
    content = Column(String, nullable=False)  
    timestamp = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="comments")
    movie = relationship("MoviesAndSeries", back_populates="comments")