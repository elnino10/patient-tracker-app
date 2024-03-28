"""Patient routes module"""

from flask import jsonify

# from flask_server.api.v1.views import app_views
from flask_server.app import app, supabase


# @app_views.route("/patients", methods=["GET"], strict_slashes=False)
@app.route("api/v1/patients", methods=["GET"], strict_slashes=False)
def patients():
    """get all users"""
    data = supabase.table("patients").select("*").execute()

    return jsonify(data.model_dump_json())
