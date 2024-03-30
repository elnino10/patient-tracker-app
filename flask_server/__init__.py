import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import time
from os import environ
import json
from datetime import datetime

from dotenv import load_dotenv
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from gotrue.errors import AuthApiError, AuthRetryableError
from supabase import create_client
from postgrest.exceptions import APIError

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
# app.register_blueprint(app_views)
# cor = CORS(app, resources={r"/api/*": {"origins": "*"}})
cor = CORS(app)
