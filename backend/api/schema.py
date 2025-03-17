# schema.py

import strawberry
from typing import List
from .models import User
from .database import AsyncSessionLocal
from sqlalchemy.future import select
from passlib.context import CryptContext
from .auth import create_access_token, verify_access_token


# Kullanıcı tipini tanımlıyoruz
@strawberry.type
class UserType:
    id: int
    username: str
    email: str
    full_name: str

# Kullanıcıları listelemek için bir resolver
@strawberry.type
class Query:
    @strawberry.field
    async def get_users(self) -> List[UserType]:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User))
            rows = result.scalars().all()
            return [UserType(id=row.id, username=row.username, email=row.email, full_name=row.full_name) for row in rows]
        

# Kullanıcı eklemek için bir mutation resolver
@strawberry.type
class Mutation:
        
    @strawberry.field
    async def register_user(self, username: str, email: str, full_name: str, password: str) -> UserType:
        async with AsyncSessionLocal() as session:
            new_user = User(username=username, email=email, full_name=full_name)
            new_user.set_password(password)
            session.add(new_user)
            await session.commit()
            return UserType(id=new_user.id, username=new_user.username, email=new_user.email, full_name=new_user.full_name)
        
    @strawberry.field
    async def login_user(self, username: str, password: str) -> str:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).where(User.username == username))
            user = result.scalars().first()
            if user is None or not user.verify_password(password):
                raise ValueError("Invalid username or password")
            return create_access_token({"sub": user.username, "id": user.id})

    @strawberry.field
    async def get_user_info(self, id: int) -> UserType:
        async with AsyncSessionLocal() as session:
            result = await session.execute(select(User).where(User.id == id))
            user = result.scalars().first()
            if user is None:
                raise ValueError("User not found")
            return UserType(id=user.id, username=user.username, email=user.email, full_name=user.full_name)