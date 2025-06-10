import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def get_db_connection():
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    return conn

# def get_db_connection():
#     conn = psycopg2.connect(
#         dbname='ecom_chatbot',
#         user='postgres',
#         password='admin123',  # must match the password you just set
#         host='localhost',
#         port='5432'
#     )
#     return conn
