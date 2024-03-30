"""Application entry point"""

from . import (
    AuthApiError,
    AuthRetryableError,
    app,
    create_client,
    datetime,
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


# error handler
@app.errorhandler(404)
def not_found(error):
    """404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({"error": "Not found", "message": error}), 404)


# check status route
@app.route("/status", methods=["GET"], strict_slashes=False)
def status():
    """Status of API"""
    return jsonify({"status": "OK"})


#######################      api routes for medics      #######################
# get all medics
@app.route("/api/v1/medics", methods=["GET"], strict_slashes=False)
def get_medics():
    """get all medics"""
    try:
        data = supabase.table("medics").select("*").execute()
        # Assert we pulled real data.
        if not len(data.data) > 0:
            return jsonify({"message": "No medic found!"}), 404
        return jsonify({"count": len(data.data), "data": data.data}), 200
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


# get medic by id
@app.route("/api/v1/medics/<medic_id>", methods=["GET"], strict_slashes=False)
def get_medic_by_id(medic_id):
    """get medic by id"""
    try:
        data = supabase.table("medics").select("*").eq("id", medic_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "Medic not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


# update medic by id
@app.route("/api/v1/medics/<medic_id>", methods=["PATCH"], strict_slashes=False)
def update_medic(medic_id):
    """update medic by id"""
    try:
        medic_data = request.get_json()
        data = supabase.table("medics").update(medic_data).eq("id", medic_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "Medic not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


# delete medic by id
@app.route("/api/v1/medics/<medic_id>", methods=["DELETE"], strict_slashes=False)
def delete_medic_by_id(medic_id):
    """get all users"""
    try:
        supabase.table("medics").delete().eq("id", medic_id).execute()
        return {}
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


###################      api route for medical history     ####################
# create patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical_record",
    methods=["POST"],
    strict_slashes=False,
)
def create_medical_record(patient_id):
    """create medical record"""
    try:
        req_data = request.get_json()
        req_data["patient_id"] = patient_id
        data = supabase.table("medical_records").insert(req_data).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "Could not create medical record!"})
        return data.data, 201
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


# get patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical_record",
    methods=["GET"],
    strict_slashes=False,
)
def get_medical_record(patient_id):
    """get medical record"""
    try:
        data = (
            supabase.table("medical_records")
            .select("*")
            .eq("patient_id", patient_id)
            .execute()
        )
        if not len(data.data) > 0:
            return jsonify({"message": "Medical record not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})

# update patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical_record",
    methods=["PATCH"],
    strict_slashes=False,
)
def update_medical_record(patient_id):
    """update medical record"""
    try:
        req_data = request.get_json()
        data = (
            supabase.table("medical_records")
            .update(req_data)
            .eq("patient_id", patient_id)
            .execute()
        )
        if not len(data.data) > 0:
            return jsonify({"message": "Medical record not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


# delete patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical_record",
    methods=["DELETE"],
    strict_slashes=False,
)
def delete_medical_record(patient_id):
    """delete medical record"""
    try:
        supabase.table("medical_records").delete().eq(
            "patient_id", patient_id
        ).execute()
        return {}
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


######################      api routes for patients      ######################
# get all patients
@app.route("/api/v1/patients", methods=["GET"], strict_slashes=False)
def get_patients():
    """get all users"""
    try:
        data = supabase.table("patients").select("*").execute()
        if not len(data.data) > 0:
            return jsonify({"message": "No patient found!"}), 404
        return jsonify({"count": len(data.data), "data": data.data}), 200
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


# get patient by id
@app.route("/api/v1/patients/<patient_id>", methods=["GET"], strict_slashes=False)
def patients_by_id(patient_id):
    """get patient by id"""
    try:
        data = supabase.table("patients").select("*").eq("id", patient_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "Patient not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})

# update patient by id
@app.route(
    "/api/v1/patients/<patient_id>", methods=["PUT", "PATCH"], strict_slashes=False
)
def update_patients(patient_id):
    """update patient by id"""
    try:
        update_data = request.get_json()
        data = (
            supabase.table("patients")
            .update(update_data)
            .eq("id", patient_id)
            .execute()
        )
        if not len(data.data) > 0:
            return jsonify({"message": "Patient not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})

# delete patient by id
@app.route("/api/v1/patients/<patient_id>", methods=["DELETE"], strict_slashes=False)
def delete_patients_by_id(patient_id):
    """delete patient by id"""
    try:
        supabase.table("patients").delete().eq("id", patient_id).execute()
        return {}
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


######################      api routes for users      ######################
# get all users
@app.route("/api/v1/users", methods=["GET"], strict_slashes=False)
def users():
    """get all users"""
    try:
        data = supabase.table("users").select("*").execute()
        if not len(data.data) > 0:
            return jsonify({"message": "No user found!"}), 404
        return jsonify({"count": len(data.data), "data": data.data}), 200
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})

# get user by id
@app.route("/api/v1/users/<user_id>", methods=["GET"], strict_slashes=False)
def user_by_id(user_id):
    """get all users"""
    try:
        data = supabase.table("users").select("*").eq("id", user_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "User not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})

# update user by id
@app.route("/api/v1/users/<user_id>", methods=["PUT"], strict_slashes=False)
def update_user_data(user_id):
    """get all users"""
    try:
        update_data = request.get_json()
        data = supabase.table("users").update(update_data).eq("id", user_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "User not found!"}), 404
        return data.data
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})

# delete user by id
@app.route("/api/v1/users/<user_id>", methods=["DELETE"], strict_slashes=False)
def delete_user_by_id(user_id):
    """get all users"""
    try:
        supabase.table("users").delete().eq("id", user_id).execute()

        return {}
    except Exception as error:
        return jsonify({"message": "An error occurred!", "error": error})


########################   authentication routes   #############################
# sign up route
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

        birthdate = user_data.get("dob")
        birthdate = birthdate[:15]
        string_format = "%a %b %d %Y"

        # convert birthdate to datetime object
        birthdate_obj = datetime.strptime(birthdate, string_format)

        # Get today's date
        today = datetime.today()

        # Calculate the difference between today's date and the birthdate
        age_years = today.year - birthdate_obj.year
        age_months = today.month - birthdate_obj.month
        if age_months < 0:
            age_years -= 1
            age_months += 12

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
                        "age_years": age_years,
                        "age_months": age_months,
                        "specialization": user_data.get("specialization"),
                        "dob": birthdate,
                        "gender": user_data.get("gender"),
                    }
                )
                .eq("id", user_id)
                .execute()
            )
            if not len(data.data) > 0:
                return "Could not create user!"
        return data.data
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign up failed!", "error": error.message})


# sign in route
@app.route("/auth/v1/signin", methods=["POST"], strict_slashes=False)
def signin():
    """signin function"""
    session = None
    try:
        user_data = request.get_json()
        session = supabase.auth.sign_in_with_password(
            {
                "email": user_data.get("email"),
                "password": user_data.get("password"),
            }
        )
        return session.data
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign in failed!", "error": error.message})


# sign out route
@app.route("/auth/v1/signout", methods=["POST"], strict_slashes=False)
def signout():
    """signout function"""
    try:
        user_data = request.get_json()
        supabase.auth.sign_out(user_data.get("access_token"))
        return jsonify({"message": "Sign out successful!"})
    except (AuthApiError, AuthRetryableError) as error:
        return jsonify({"message": "Sign out failed!", "error": error.message})


if __name__ == "__main__":
    HOST = environ.get("SERVER_HOST", "localhost")
    PORT = int(environ.get("SERVER_PORT", 5555))

    print(f"Server running on {HOST}:{PORT}")

    app.run(debug=True, host=HOST, port=PORT)
