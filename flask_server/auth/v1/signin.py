"""signin module"""
from flask_server.auth.v1 import (
    AuthApiError,
    AuthRetryableError,
    app,
    jsonify,
    request,
    supabase
)

@app.route("/auth/v1/signin", methods=["POST"], strict_slashes=False)
def signin():
    """signin"""
    try:
        user_data = request.get_json()
        session = supabase.auth.sign_in_with_password(
            {
                "email": user_data.get("email"),
                "password": user_data.get("password"),
            }
        )
        return session.model_dump_json()
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign in failed!", "error": error.message})

@app.route("/auth/v1/signout", methods=["POST"], strict_slashes=False)
def signout():
    """signout"""
    try:
        user_data = request.get_json()
        supabase.auth.sign_out(user_data.get("access_token"))
        return jsonify({"message": "Sign out successful!"})
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign out failed!", "error": error.message})
