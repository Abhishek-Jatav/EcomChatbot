from faker import Faker
import random
from db import get_db_connection

fake = Faker()
conn = get_db_connection()
cur = conn.cursor()

brands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Bata', 'Woodland']
sizes = ['6', '7', '8', '9', '10', '11']

for _ in range(100):
    name = fake.word().capitalize() + " Shoes"
    category = "Footwear"
    price = random.randint(1000, 5000)
    size = random.choice(sizes)
    brand = random.choice(brands)
    description = fake.sentence(nb_words=12)

    cur.execute('''
        INSERT INTO products (name, category, price, size, brand, description)
        VALUES (%s, %s, %s, %s, %s, %s)
    ''', (name, category, price, size, brand, description))

conn.commit()
cur.close()
conn.close()
