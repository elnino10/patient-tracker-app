"""intialize the flask app"""
import os
import sys

import json
import time
import tempfile
from datetime import datetime, timedelta
from functools import wraps
from storage3 import create_client as create_storage_client
from os import environ
from werkzeug.utils import secure_filename
import jwt

from dotenv import load_dotenv
from flask import Flask, g, jsonify, make_response, request
from flask_cors import CORS
from gotrue.errors import AuthApiError, AuthRetryableError
from postgrest.exceptions import APIError
from supabase import create_client

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
# app.register_blueprint(app_views)
# cor = CORS(app, resources={r"/*": {"origins": "*"}})
# cor = CORS(app)
