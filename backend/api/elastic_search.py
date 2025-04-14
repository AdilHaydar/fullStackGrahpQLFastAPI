from elasticsearch import Elasticsearch
from typing import List

ELASTICSEARCH_URL = "http://localhost:9200"  # Replace with your Elasticsearch URL
es = Elasticsearch([ELASTICSEARCH_URL])

if es.ping():
    print("Elasticsearch is connected")
else:
    print("Elasticsearch is not connected")

MOVIE_INDEX = "movies"  # Elasticsearch index name

async def index_movie(movie_data: dict) -> None:
    print("Indexing movie data:", movie_data)
    user = movie_data.pop("user_id")
    movie_data.update({"user":user})
    print("Movie data after pop:", movie_data)
    movie_data.update({
        "search_field": movie_data.get("title"),
        "detailed_search_field": f"{movie_data.get('title')} {movie_data.get("description")}"
        })
    
    es.index(index=MOVIE_INDEX, body=movie_data)

async def get_movies() -> list:
    # res = es.search(index=MOVIE_INDEX, body={"query": {"match_all": {}}})
    # print("Elasticsearch response:", res)
    # movies = [hit["_source"] for hit in res["hits"]["hits"]]
    # print("Movies fetched from Elasticsearch:", movies)
    res = es.search(index=MOVIE_INDEX, body={"query": {"match_all": {}}})
    hits = res["hits"]["hits"]
    print("Hits", hits)
    print("Type of hits", type(hits))
    # dict -> MoviesAndSeriesType dönüştür
    # movies = [MoviesAndSeriesType(**hit["_source"]) for hit in hits]
    # return movies
    return hits
