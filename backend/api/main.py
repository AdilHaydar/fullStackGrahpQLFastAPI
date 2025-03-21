from fastapi import FastAPI, UploadFile, File
from strawberry.fastapi import GraphQLRouter
import strawberry
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .schema import Query, Mutation
import shutil
import os


origins = [
    "http://localhost:3000",  # Frontend adresi
    "http://localhost:8000",  # Diğer güvenli kaynaklar
    "*",  # Herkese izin ver, ancak güvenliği artırmak için "*" yerine belirli URL'ler kullanabilirsiniz.
]



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
