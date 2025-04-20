from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
import numpy as np

ELASTICSEARCH_URL = "http://localhost:9200"  # Replace with your Elasticsearch URL
es = Elasticsearch([ELASTICSEARCH_URL])

if es.ping():
    model = SentenceTransformer("all-MiniLM-L6-v2")
    print("Elasticsearch is connected")
else:
    print("Elasticsearch is not connected")

MOVIE_INDEX = "movies"  # Elasticsearch index name

async def index_movie(movie_data: dict) -> None:
    user = movie_data.pop("user_id")
    
    movie_data.update({"user":user})
    movie_data.update({
        "search_field": movie_data.get("title"),
        "detailed_search_field": f"{movie_data.get('title')} {movie_data.get("description")}"
        })
    vector = model.encode(movie_data["detailed_search_field"]).tolist()
    movie_data["vector_embedding"] = vector
    es.index(index=MOVIE_INDEX, body=movie_data)

async def get_movies() -> list:
    res = es.search(index=MOVIE_INDEX, body={"query": {"match_all": {}}})
    hits = res["hits"]["hits"]
    return hits


async def get_user_profile_vector(user_id:int):
    query = {
        "query": {
            "match": {
                "user.id": user_id
            }
        }
    }
    response = es.search(index="movies", body=query)
    vectors = []

    for hit in response["hits"]["hits"]:
        movie = hit["_source"]
        vector = movie["vector_embedding"]
        vectors.append(vector)

    if not vectors:
        return None

    return np.mean(vectors, axis=0).tolist()

async def get_related_movies_by_user(user_id:int) -> list:
    query_vector = await get_user_profile_vector(user_id)

    response = es.search(index=MOVIE_INDEX, body={
        "from": 0,
        "size": 15,
        "query": {
            "script_score": {
                "query": {
                    "match_all": {}
                },
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'vector_embedding') + 1.0",
                    "params": {
                        "query_vector": query_vector
                    }
                }
            }
        }
    })

    hits = response["hits"]["hits"]
    return hits
