import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import json
import time
from datetime import datetime, timedelta
from functools import wraps
from os import environ

import jwt
from dotenv import load_dotenv
from flask import Flask, g, jsonify, make_response, request
from flask_cors import CORS
from gotrue.errors import AuthApiError, AuthRetryableError
from postgrest.exceptions import APIError
from supabase import create_client

app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
# app.register_blueprint(app_views)
# cor = CORS(app, resources={r"/*": {"origins": "*"}})
# cor = CORS(app)
