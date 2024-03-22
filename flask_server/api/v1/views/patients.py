"""Patient routes module"""
from flask import jsonify
from api.v1.views import app_views

@app_views.route("/patients", methods=["GET"], strict_slashes=False)
def patients():
    """get all users"""
    return jsonify(
        {"name": "Jon Doe", "age": 30, "email": "foobar@foo.com"},
        {"name": "Jane Smith", "age": 40, "email": "jane.smith@mail.com"},
        {"name": "John Smith", "age": 35, "email": "johnSmith@mail.com"},
        {"name": "Jane Doe", "age": 25, "email": "bar@foo.com"},
    )
