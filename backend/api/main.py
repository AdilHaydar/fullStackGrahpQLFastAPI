from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry
from fastapi.middleware.cors import CORSMiddleware
from .database import init_db
from .schema import Query, Mutation
from contextlib import asynccontextmanager
from .elastic_search import es
from fastapi.staticfiles import StaticFiles



origins = [
    "http://localhost:3000",  # Frontend adresi
    "http://localhost:8000",  # Diğer güvenli kaynaklar
    "*",  # Herkese izin ver, ancak güvenliği artırmak için "*" yerine belirli URL'ler kullanabilirsiniz.
]



schema = strawberry.Schema(query=Query, mutation=Mutation)
graphql_app = GraphQLRouter(schema)

init_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
    if not es.indices.exists(index="movies"):
        es.indices.create(index="movies")
        print("Index created")
    else:
        print("Index already exists")
    
    yield
    
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(graphql_app, prefix="/graphql")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # İzin verilen domainler
    allow_credentials=True,
    allow_methods=["*"],  # Tüm yöntemlere izin ver
    allow_headers=["*"],  # Tüm header'lara izin ver
)

@app.on_event("startup")
def create_index():
    if not es.indices.exists(index="movies"):
        es.indices.create(index="movies")
        print("Index created")
    else:
        print("Index already exists")

@app.get("/")
def home():
    return {"message": "GraphQL API çalışıyor"}

