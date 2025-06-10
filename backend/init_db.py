from db import get_db_connection

conn = get_db_connection()
cur = conn.cursor()

cur.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        size TEXT,
        brand TEXT,
        description TEXT
    );
''')

conn.commit()
cur.close()
conn.close()
