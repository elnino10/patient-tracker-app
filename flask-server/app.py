"""Application entry point"""

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cor = CORS(app, resources={r"/api/*": {"origins": "*"}})


# Routes and other application logic go here
@app.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})

@app.route("/api/patients", methods=["GET"], strict_slashes=False)
def patients():
    """get all users"""
    return [
        {"name": "John Doe", "age": 30, "email": "foobar@foo.com"},
        {"name": "Jane Smith", "age": 40, "email": "jane.smith@mail.com"},
        {"name": "John Smith", "age": 35, "email": "johnSmith@mail.com"},
        {"name": "Jane Doe", "age": 25, "email": "bar@foo.com"},
    ]


if __name__ == "__main__":
    from os import environ

    from dotenv import load_dotenv

    load_dotenv()

    HOST = environ.get("SERVER_HOST", "localhost")
    PORT = int(environ.get("SERVER_PORT", 5555))

    print(f"Server running on {HOST}:{PORT}")

    app.run(debug=True, host=HOST)
