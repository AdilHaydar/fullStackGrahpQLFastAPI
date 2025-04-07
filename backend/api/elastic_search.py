from elasticsearch import Elasticsearch
from schema import MoviesAndSeriesType
from typing import List

ELASTICSEARCH_URL = "http://localhost:9200"  # Replace with your Elasticsearch URL
es = Elasticsearch([ELASTICSEARCH_URL])

if es.ping():
    print("Elasticsearch is connected")
else:
    print("Elasticsearch is not connected")

MOVIE_INDEX = "movies"  # Elasticsearch index name

async def index_movie(movie_data: dict) -> None:
    movie_data.update({
        "search_field": movie_data.get("title"),
        "detailed_search_field": f"{movie_data.get('title')} {movie_data.get("description")}"
        })
    
    es.index(index=MOVIE_INDEX, body=movie_data)

async def get_movies() -> List[MoviesAndSeriesType]:
    # res = es.search(index=MOVIE_INDEX, body={"query": {"match_all": {}}})
    # print("Elasticsearch response:", res)
    # movies = [hit["_source"] for hit in res["hits"]["hits"]]
    # print("Movies fetched from Elasticsearch:", movies)
    res = es.search(index=MOVIE_INDEX, body={"query": {"match_all": {}}})
    hits = res["hits"]["hits"]
    
    # dict -> MoviesAndSeriesType dönüştür
    movies = [MoviesAndSeriesType(**hit["_source"]) for hit in hits]
    return movies
