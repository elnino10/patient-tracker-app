import json
import os
import time

from flask import jsonify, request
from gotrue.errors import AuthApiError, AuthRetryableError
from supabase import create_client

from flask_server.app import app

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_API_KEY")
supabase = create_client(url, key)
