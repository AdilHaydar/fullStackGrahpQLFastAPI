# schema.py

import strawberry
from typing import List, Optional
from .models import User, MoviesAndSeries, Comment
from .database import AsyncSessionLocal
from sqlalchemy.future import select
from passlib.context import CryptContext
from .auth import create_access_token, verify_access_token
import base64
import os
from fastapi import HTTPException


# Kullanıcı tipini tanımlıyoruz
@strawberry.type
class UserType:
    id: int
    username: str
    email: str
    full_name: str
    movies: List["MoviesAndSeriesType"]
    comments: List["CommentType"]
    
@strawberry.input
class UserInputType:
    username: str
    email: str
    full_name: str
    password: str
    
@strawberry.type
class MoviesAndSeriesType:
    id: int
    title: str
    year: Optional[int]
    genre: Optional[str]
    description: Optional[str]
    poster: Optional[str]
    rating: Optional[int]
    user: UserType
    comments: List["CommentType"]
    
@strawberry.input
class MoviesAndSeriesInputType:
    user_id: int
    title: str
    year: Optional[int] = None
    genre: Optional[str] = None
    description: Optional[str] = None
    poster_base64: Optional[str] = None
    rating: Optional[int] = None
    
@strawberry.type
class CommentType:
    id: int
    content: str
    user: UserType
    timestamp: Optional[int]
    
@strawberry.input
class CommentInputType:
    user_id: int
    movie_id: int
    content: str
    timestamp: Optional[int] = None

# Kullanıcıları listelemek için bir resolver
@strawberry.type
class Query:
    @strawberry.field
    async def get_users(self) -> List[UserType]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User))
            rows = result.scalars().all()
            return [UserType(id=row.id, username=row.username, email=row.email, full_name=row.full_name) for row in rows]
        
    @strawberry.field
    async def get_user(self, id: int) -> UserType:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).where(User.id == id))
            user = result.scalars().first()
            if user is None:
                raise ValueError("User not found")
            return user
        
    @strawberry.field
    async def get_movies(self) -> List[MoviesAndSeriesType]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(MoviesAndSeries))
            rows = result.scalars().all()
            return rows
        
    @strawberry.field
    async def get_movie(self, id: int) -> MoviesAndSeriesType:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(MoviesAndSeries).where(MoviesAndSeries.id == id))
            movie = result.scalars().first()
            if movie is None:
                raise ValueError("Movie not found")
            return movie
        
    @strawberry.field
    async def get_comments(self, movie_id: int) -> List[CommentType]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(Comment).where(Comment.movie_id == movie_id))
            rows = result.scalars().all()
            return rows
        

# Kullanıcı eklemek için bir mutation resolver
@strawberry.type
class Mutation:
        
    @strawberry.field
    async def register_user(self, username:str, email: str, password: str, full_name: str) -> UserType:
        async with AsyncSessionLocal() as session:
            new_user = User(username=username, email=email, full_name=full_name)
            new_user.set_password(password)
            session.add(new_user)
            await session.commit()
            return new_user
        
    @strawberry.field
    async def login_user(self, username: str, password: str) -> str:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).where(User.username == username))
            user = result.scalars().first()
            if user is None or not user.verify_password(password):
                raise ValueError("Invalid username or password")
            return create_access_token({"sub": user.username, "id": user.id})

    # @strawberry.field
    # async def get_user_info(self, id: int) -> UserType:
    #     async with AsyncSessionLocal() as session:
    #         result = await session.execute(select(User).where(User.id == id))
    #         user = result.scalars().first()
    #         if user is None:
    #             raise ValueError("User not found")
    #         return UserType(id=user.id, username=user.username, email=user.email, full_name=user.full_name)
        
    @strawberry.field
    async def create_movie(self, movie_data: MoviesAndSeriesInputType) -> MoviesAndSeriesType:
        async with AsyncSessionLocal() as session:
            movie_data = movie_data.__dict__
            if movie_data.poster_base64:
                try:    
                    img_data = base64.b64decode(movie_data.pop("poster_base64"))
                    file_path = f"uploads/posters/{movie_data.user_id}/{movie_data.title}.jpg"
                    with open(file_path, "wb") as f:
                        f.write(img_data)
                    movie_data["poster"] = file_path
                except Exception as e:
                    raise HTTPException(status_code=400, detail=str(e))
            else:
                file_path = None
            new_movie = MoviesAndSeries(**movie_data.__dict__)
            session.add(new_movie)
            await session.commit()
            return new_movie
        
        
    @strawberry.field
    async def create_comment(self, comment_data: CommentInputType) -> CommentType:
        async with AsyncSessionLocal() as session:
            new_comment = Comment(**comment_data.__dict__)
            session.add(new_comment)
            await session.commit()
            return new_comment