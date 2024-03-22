"""Application entry point"""

from flask import Flask, jsonify, make_response
from flask_cors import CORS
from api.v1.views import app_views

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
cor = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Routes and other application logic go here
@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)

@app.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})


if __name__ == "__main__":
    from os import environ
    from dotenv import load_dotenv

    load_dotenv()

    HOST = environ.get("SERVER_HOST", "localhost")
    PORT = int(environ.get("SERVER_PORT", 5555))

    print(f"Server running on {HOST}:{PORT}")

    app.run(debug=True, host=HOST, port=PORT)
