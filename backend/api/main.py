from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, init_db
from .schema import Query, Mutation


origins = [
    "http://localhost:3000",  # Frontend adresi
    "http://localhost:8000",  # Diğer güvenli kaynaklar
    "*",  # Herkese izin ver, ancak güvenliği artırmak için "*" yerine belirli URL'ler kullanabilirsiniz.
]




# @strawberry.type
# class User:
#     id: int
#     name: str

# @strawberry.type
# class Query:
#     @strawberry.field
#     def users(self) -> list[User]:
#         return [
#             User(id=1, name="Ali"),
#             User(id=2, name="Veli"),
#         ]

schema = strawberry.federation.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

init_db()

app = FastAPI()
app.include_router(graphql_app, prefix="/graphql")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # İzin verilen domainler
    allow_credentials=True,
    allow_methods=["*"],  # Tüm yöntemlere izin ver
    allow_headers=["*"],  # Tüm header'lara izin ver
)
@app.get("/")
def home():
    return {"message": "GraphQL API çalışıyor"}
