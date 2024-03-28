"""signup module"""
from flask_server.auth.v1 import (
    AuthApiError,
    AuthRetryableError,
    app,
    json,
    jsonify,
    request,
    supabase,
    time,
)


@app.route("/auth/v1/signup", methods=["POST"], strict_slashes=False)
def signup():
    """signup function"""
    session = None
    try:
        user_data = request.get_json()
        session = supabase.auth.sign_up(
            {
                "email": user_data.get("email"),
                "password": user_data.get("password"),
            }
        )
        time.sleep(2)

        # check if the user is signed up
        if session is not None:
            # Retrieve additional profile information
            session_data = json.loads(session.model_dump_json())
            user_id = session_data.get("user", {}).get("id")
            data = (
                supabase.table("users")
                .update(
                    {
                        "first_name": user_data.get("first_name"),
                        "last_name": user_data.get("last_name"),
                        "category": user_data.get("category"),
                        "age": user_data.get("age"),
                        "specialization": user_data.get("specialization"),
                        "dob": user_data.get("DOB"),
                        "gender": user_data.get("gender"),
                    }
                )
                .eq("id", user_id)
                .execute()
            )
        return data.model_dump_json()
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign up failed!", "error": error.message})
