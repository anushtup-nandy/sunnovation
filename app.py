from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# PostgreSQL connection setup
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="sunnovation",
            user="postgres",
            password="Budgies@19813314"  # Replace with your actual password
        )
        return conn
    except Exception as e:
        logger.error(f"Database connection error: {e}")
        raise

@app.route('/submit-form', methods=['POST'])
def submit_form():
    try:
        data = request.get_json()
        logger.debug(f"Received data: {data}")

        if not data:
            return jsonify({"error": "No data received"}), 400

        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        if not all([name, email, message]):
            return jsonify({"error": "All fields are required"}), 400

        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        query = """
            INSERT INTO contact_us (name, email, message) 
            VALUES (%s, %s, %s) 
            RETURNING id, name, email, message, submitted_at
        """
        
        cur.execute(query, (name, email, message))
        result = cur.fetchone()
        conn.commit()
        
        logger.debug(f"Inserted data: {result}")
        
        return jsonify({
            "message": "Form submitted successfully",
            "data": result
        }), 200

    except psycopg2.Error as e:
        logger.error(f"Database error: {e}")
        return jsonify({"error": "Database error occurred"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)