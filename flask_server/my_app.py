"""Application entry point"""

from . import (
    AuthApiError,
    AuthRetryableError,
    app,
    create_client,
    environ,
    json,
    jsonify,
    load_dotenv,
    make_response,
    request,
    time,
)


load_dotenv()
url = environ.get("SUPABASE_URL")
key = environ.get("SUPABASE_API_KEY")


supabase = create_client(url, key)


# Routes and other application logic go here
@app.errorhandler(404)
def not_found(error):
    """404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({"error": "Not found"}), 404)


# check status route
@app.route("/status", methods=["GET"], strict_slashes=False)
def status():
    """Status of API"""
    return jsonify({"status": "OK"})


# api routes
@app.route("/api/v1/patients", methods=["GET"], strict_slashes=False)
def patients():
    """get all users"""
    data = supabase.table("patients").select("*").execute()

    return data.model_dump_json()


@app.route("/api/v1/patients/<patient_id>", methods=["GET"], strict_slashes=False)
def patients_by_id(patient_id):
    """get all users"""
    data = supabase.table("patients").select("*").eq("id", patient_id).execute()

    return data.model_dump_json()


@app.route(
    "/api/v1/patients/<patient_id>", methods=["PUT", "PATCH"], strict_slashes=False
)
def update_patients(patient_id):
    """get all users"""
    data = supabase.table("patients").select("*").eq("id", patient_id).execute()
    if not data:
        return jsonify({"message": "Patient not found!"}), 404
    patient_data = request.get_json()
    update_patient = (
        supabase.table("patients").update(patient_data).eq("id", patient_id).execute()
    )

    return update_patient.model_dump_json()


@app.route("/api/v1/patients/<patient_id>", methods=["DELETE"], strict_slashes=False)
def delete_patients_by_id(patient_id):
    """get all users"""
    data = supabase.table("patients").delete().eq("id", patient_id).execute()

    if data:
        return ({"message": "Patient deleted successfully!"}), 200


@app.route("/api/v1/medics", methods=["GET"], strict_slashes=False)
def medics():
    """get all users"""
    data = supabase.table("medics").select("*").execute()

    return data.model_dump_json()


@app.route("/api/v1/medics/<medic_id>", methods=["GET"], strict_slashes=False)
def pmedic_by_id(medic_id):
    """get all users"""
    data = supabase.table("medics").select("*").eq("id", medic_id).execute()

    return data.model_dump_json()


@app.route("/api/v1/medics/<medic_id>", methods=["PUT", "PATCH"], strict_slashes=False)
def update_medics(medic_id):
    """get all users"""
    data = supabase.table("medics").select("*").eq("id", medic_id).execute()
    if not data:
        return jsonify({"message": "Medic not found!"}), 404
    medic_data = request.get_json()
    update_medic = (
        supabase.table("medics").update(medic_data).eq("id", medic_id).execute()
    )

    return update_medic.model_dump_json()


@app.route("/api/v1/medics/<medic_id>", methods=["DELETE"], strict_slashes=False)
def delete_medic_by_id(medic_id):
    """get all users"""
    data = supabase.table("medics").delete().eq("id", medic_id).execute()

    if data:
        return ({"message": "Medic deleted successfully!"}), 200


@app.route("/api/v1/users", methods=["GET"], strict_slashes=False)
def users():
    """get all users"""
    data = supabase.table("users").select("*").execute()

    return data.model_dump_json()


@app.route("/api/v1/users/<user_id>", methods=["GET"], strict_slashes=False)
def user_by_id(user_id):
    """get all users"""
    data = supabase.table("users").select("*").eq("id", user_id).execute()

    return data.model_dump_json()


@app.route("/api/v1/users/<user_id>", methods=["PUT"], strict_slashes=False)
def update_user_data(user_id):
    """get all users"""
    data = supabase.table("users").select("*").eq("id", user_id).execute()
    if not data:
        return jsonify({"message": "Patient not found!"}), 404
    user_data = request.get_json()
    update_user = supabase.table("users").update(user_data).eq("id", user_id).execute()

    return update_user.model_dump_json()


@app.route("/api/v1/users/<user_id>", methods=["DELETE"], strict_slashes=False)
def delete_user_by_id(user_id):
    """get all users"""
    data = supabase.table("users").delete().eq("id", user_id).execute()

    if data:
        return ({"message": "User deleted successfully!"}), 200


# authentication routes
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
                        "dob": user_data.get("dob"),
                        "gender": user_data.get("gender"),
                    }
                )
                .eq("id", user_id)
                .execute()
            )
            print(data.model_dump_json())
        return data.model_dump_json()
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign up failed!", "error": error.message})


if __name__ == "__main__":
    HOST = environ.get("SERVER_HOST", "localhost")
    PORT = int(environ.get("SERVER_PORT", 5555))

    print(f"Server running on {HOST}:{PORT}")

    app.run(debug=True, host=HOST, port=PORT)
