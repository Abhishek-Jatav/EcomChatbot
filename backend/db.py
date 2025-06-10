import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        dbname='ecom_chatbot',
        user='postgres',
        password='admin123',  # must match the password you just set
        host='localhost',
        port='5432'
    )
    return conn
