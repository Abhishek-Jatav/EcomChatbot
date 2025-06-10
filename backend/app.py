from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app, origin=["http://localhost:300"])

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM products LIMIT 50;')
    rows = cur.fetchall()
    cur.close()
    conn.close()

    products = []
    for row in rows:
        products.append({
            'id': row[0],
            'name': row[1],
            'category': row[2],
            'price': row[3],
            'size': row[4],
            'brand': row[5],
            'description': row[6],
        })
    return jsonify(products)
@app.route('/api/search', methods=['GET'])
def search_products():
    query = request.args.get('q', '')

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT * FROM products
        WHERE LOWER(name) LIKE %s
           OR LOWER(description) LIKE %s
           OR LOWER(brand) LIKE %s
        LIMIT 30;
    """, (f'%{query.lower()}%', f'%{query.lower()}%', f'%{query.lower()}%'))

    rows = cur.fetchall()
    products = [{
        "id": row[0],
        "name": row[1],
        "category": row[2],
        "price": row[3],
        "size": row[4],
        "brand": row[5],
        "description": row[6],
    } for row in rows]

    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)
