"""Application entry point"""

from . import (
    CORS,
    AuthApiError,
    AuthRetryableError,
    app,
    create_client,
    create_storage_client,
    datetime,
    environ,
    json,
    jsonify,
    jwt,
    load_dotenv,
    make_response,
    os,
    request,
    secure_filename,
    tempfile,
    time,
    timedelta,
)

cor = CORS(app, resources={r"/*": {"origins": "*"}})
load_dotenv()
url = environ.get("SUPABASE_URL")
key = environ.get("SUPABASE_API_KEY")
supabase = create_client(url, key)

storage_url = environ.get("SUPABASE_STORAGE_URL")
headers = {"apiKey": key, "Authorization": f"Bearer {key}"}  # headers for storage
storage = create_storage_client(storage_url, headers, is_async=False)
storage.list_buckets()

# allowed file extensions
ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
# image upload timestamp
IMAGE_TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")


# def create_app(config_filename=None):
#     """flask application factory"""
#     app = Flask(__name__)
#     app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True
#     app.config["CORS_HEADERS"] = "Content-Type"
#     CORS(app, resources={r"/*": {"origins": "*"}})
#     return app



# error handler
@app.errorhandler(404)
def not_found(error):
    """404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(
        jsonify({"error": "Not found", "message": error, "status": "failed"}), 404
    )


# check status route
@app.route("/status", methods=["GET"], strict_slashes=False)
def status():
    """Status of API"""
    return jsonify({"status": "success"}), 200


#######################      api routes for medics      #######################
# get all medics
@app.route("/api/v1/medics", methods=["GET"], strict_slashes=False)
def get_medics():
    """get all medics"""
    try:
        data = supabase.table("medics").select("*").execute()
        # Assert we pulled real data.
        if not len(data.data) > 0:
            return jsonify({"message": "No medic found!", "status": "failed"}), 404
        return (
            jsonify({"count": len(data.data), "data": data.data, "status": "success"}),
            200,
        )
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# get medic by id
@app.route("/api/v1/medics/<medic_id>", methods=["GET"], strict_slashes=False)
def get_medic_by_id(medic_id):
    """get medic by id"""
    try:
        data = supabase.table("medics").select("*").eq("id", medic_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "Medic not found!", "status": "failed"}), 404
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# update medic by id
@app.route("/api/v1/medics/<medic_id>", methods=["PATCH"], strict_slashes=False)
def update_medic(medic_id):
    """update medic by id"""
    try:
        medic_data = request.get_json()
        data = supabase.table("medics").update(medic_data).eq("id", medic_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "Medic not found!", "status": "failed"}), 404
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# delete medic by id
@app.route("/api/v1/medics/<medic_id>", methods=["DELETE"], strict_slashes=False)
def delete_medic_by_id(medic_id):
    """get all users"""
    try:
        supabase.table("medics").delete().eq("id", medic_id).execute()
        return {}
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


###################      api route for medical record     ####################
# create an authorization decorator
# def authorize_medic(func):
#     """routes are protected and accessed by medics only"""
#     @wraps(func)
#     def wrapper(*args, **kwargs):
#         """functools wrapper function"""
#         token = request.headers.get("Authorization").split("Bearer ")[1]
#         try:
#             payload = jwt.decode(token, environ.get("SECRET_KEY"), algorithms=["HS256"])
#             if payload["category"] == "medic":
#                 g.user = payload
#                 return func(*args, **kwargs)
#         except jwt.ExpiredSignatureError:
#             return jsonify({"message": "Token expired!"}), 401
#         except jwt.InvalidTokenError:
#             return jsonify({"message": "Invalid token!"}), 401

#     return wrapper

# create patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical-record",
    methods=["POST"],
    strict_slashes=False,
)
# @authorize_medic
def create_medical_record(patient_id):
    """create medical record"""
    try:
        req_data = request.get_json()
        req_data["patient_id"] = patient_id
        data = supabase.table("medical_records").insert(req_data).execute()
        if not len(data.data) > 0:
            return (
                jsonify(
                    {"message": "Could not create medical record!", "status": "failed"}
                ),
                400,
            )
        return jsonify({"data": data.data, "status": "success"}), 201
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# get patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical-record",
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

        if len(data.data) == 0:
            return jsonify({"data": [], "message": "Medical record not found!"}), 200

        if not len(data.data) > 0:
            return (
                jsonify({"message": "Medical record not found!", "status": "failed"}),
                404,
            )
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )

# update patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical-record",
    methods=["PATCH", "PUT"],
    strict_slashes=False,
)
# @authorize_medic
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
            return (
                jsonify({"message": "Medical record not found!", "status": "failed"}),
                404,
            )
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# delete patient's medical record
@app.route(
    "/api/v1/patients/<patient_id>/medical-record",
    methods=["DELETE"],
    strict_slashes=False,
)
# @authorize_medic
def delete_medical_record(patient_id):
    """delete medical record"""
    try:
        supabase.table("medical_records").delete().eq(
            "patient_id", patient_id
        ).execute()
        return {}
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


######################      api routes for patients      ######################
# get all patients
@app.route("/api/v1/patients", methods=["GET"], strict_slashes=False)
def get_patients():
    """get all users"""
    try:
        data = supabase.table("patients").select("*").execute()
        if not len(data.data) > 0:
            return jsonify({"message": "No patient found!", "status": "failed"}), 404
        return (
            jsonify({"count": len(data.data), "data": data.data, "status": "success"}),
            200,
        )
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# get patient by id
@app.route("/api/v1/patients/<patient_id>", methods=["GET"], strict_slashes=False)
def patients_by_id(patient_id):
    """get patient by id"""
    try:
        data = supabase.table("patients").select("*").eq("id", patient_id).execute()

        if len(data.data) == 0:
            return jsonify({"data": [], "message": "Patient not found!"}), 200

        if not len(data.data) > 0:
            return jsonify({"message": "Patient not found!", "status": "failed"}), 404
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# update patient by id
@app.route("/api/v1/patients/<patient_id>", methods=["PATCH"], strict_slashes=False)
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
            return jsonify({"message": "Patient not found!", "status": "failed"}), 404
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )

# delete patient by id
@app.route("/api/v1/patients/<patient_id>", methods=["DELETE"], strict_slashes=False)
def delete_patients_by_id(patient_id):
    """delete patient by id"""
    try:
        supabase.table("patients").delete().eq("id", patient_id).execute()
        return {}
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


######################      api routes for users      ######################
# get all users
@app.route("/api/v1/users", methods=["GET"], strict_slashes=False)
def users():
    """get all users"""
    try:
        data = supabase.table("users").select("*").execute()
        if not len(data.data) > 0:
            return jsonify({"message": "No user found!", "status": "failed"}), 404
        return (
            jsonify({"count": len(data.data), "data": data.data, "status": "success"}),
            200,
        )
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )

# get user by id
@app.route("/api/v1/users/<user_id>", methods=["GET"], strict_slashes=False)
def user_by_id(user_id):
    """get all users"""
    try:
        data = supabase.table("users").select("*").eq("id", user_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "User not found!"}), 404
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# update user by id
@app.route("/api/v1/users/<user_id>", methods=["PATCH"], strict_slashes=False)
def update_user_data(user_id):
    """get all users"""
    try:
        update_data = request.get_json()
        data = supabase.table("users").update(update_data).eq("id", user_id).execute()
        if not len(data.data) > 0:
            return jsonify({"message": "User not found!", "status": "failed"}), 404
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )

# delete user by id
@app.route("/api/v1/users/<user_id>", methods=["DELETE"], strict_slashes=False)
def delete_user_by_id(user_id):
    """get all users"""
    try:
        supabase.table("users").delete().eq("id", user_id).execute()

        return {}
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


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

        age_years = None
        age_months = None
        birthdate = None
        # check if user is patient
        if user_data.get("category") == "patient":
            birthdate = user_data.get("dob")
            birthdate = birthdate[:10]
            string_format = "%Y-%m-%d"

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

        # check if the user is signed up
        if session is not None:
            time.sleep(2)
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
                        "address": user_data.get("address"),
                        "phone_number": user_data.get("phone_number"),
                        "user_id": user_id,
                    }
                )
                .eq("id", user_id)
                .execute()
            )
            if not len(data.data) > 0:
                return (
                    jsonify({"message": "Could not create user!", "status": "failed"}),
                    400,
                )
        return jsonify({"data": data.data, "status": "success"}), 201
    except (AuthApiError, AuthRetryableError) as error:
        return (
            jsonify(
                {
                    "message": "Sign up failed!",
                    "error": error.message,
                    "status": "failed",
                }
            ),
            401,
        )


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

        if session is not None:
            time.sleep(2)
            session_data = json.loads(session.model_dump_json())
            user_id = session_data.get("user", {}).get("id")
            user_email = session_data.get("user", {}).get("email")

            user_category = supabase.table("users").select("category").eq(
                "email", user_data["email"]
            ).execute()

            token = generate_token(
                user_id=user_id,
                email=user_email,
                category=user_category.data[0]["category"],
            )
            return jsonify({"access_token": token, "status": "success"}), 200
        return jsonify({"message": "Sign in failed!", "status": "failed"}), 401
    except (AuthApiError, AuthRetryableError) as error:
        return (
            jsonify(
                {
                    "message": "Sign in failed!",
                    "error": error.message,
                    "status": "failed",
                }
            ),
            401,
        )


# generate access token for user authorization
def generate_token(user_id, email, category):
    """generate token"""
    custom_claims = {
        "sub": user_id,
        "email": email,
        "category": category,
    }

    payload = {
        **custom_claims,
        "exp": datetime.utcnow() + timedelta(days=1),
    }
    secret_key = environ.get("SECRET_KEY")
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token


# sign out route
@app.route("/auth/v1/signout", methods=["POST"], strict_slashes=False)
def signout():
    """signout function"""
    try:
        supabase.auth.sign_out()
        if not supabase.auth.get_session():
            return (
                jsonify({"message": "Sign out successful!", "status": "success"}),
                200,
            )
    except (AuthApiError, AuthRetryableError) as error:
        return (
            jsonify(
                {
                    "message": "Sign out failed!",
                    "error": error.message,
                    "status": "failed",
                }
            ),
            401,
        )


########################   storage route   #############################
def allowed_file(filename):
    """check if file extension is allowed"""
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
    )


# user profile picture upload
@app.route("/api/v1/profile-pic/<user_id>", methods=["POST"], strict_slashes=False)
def profile_pic_upload(user_id):
    """upload profile picture"""
    try:
        # check if the request contains a file
        if "file" not in request.files:
            return (
                jsonify({"message": "No file part!", "status": "failed"}),
                400,
            )
        file = request.files["file"]
        if file and allowed_file(file.filename):
            # construct file name with user id and timestamp
            save_file_as = f"{user_id}_{IMAGE_TIMESTAMP}.jpg"
            file_name = secure_filename(file.filename)

            # check if file is selected
            if file_name == "":
                return jsonify({"message": "No file selected", "status": "failed"}), 400

            # create a temporary directory
            temp_dir = tempfile.mkdtemp()
            file_path = os.path.join(temp_dir, file_name)
            file.save(file_path)

            storage.from_("profile_image").upload(
                save_file_as, file_path, {"content-type": "image/jpg"}
            )

            # update user profile_pic field in users table
            image_url = "https://oqctaxhqpoexbvokkqbd.supabase.co/"
            image_url += f"storage/v1/object/public/profile_image/{save_file_as}"
            data = (
                supabase.table("uploads")
                .insert({"profile_pic": image_url, "user_id": user_id})
                .execute()
            )
            if not len(data.data) > 0:
                return (
                    jsonify(
                        {
                            "message": "Could not update user profile picture!",
                            "status": "failed",
                        }
                    ),
                    404,
                )
            # remove the temporary directory
            os.remove(file_path)
            os.rmdir(temp_dir)

            return (
                jsonify(
                    {"message": "File uploaded successfully!", "status": "success"}
                ),
                201,
            )
        return jsonify({"message": "File not allowed!", "status": "failed"}), 400
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# get user profile picture
@app.route("/api/v1/profile-pic/<user_id>", methods=["GET"], strict_slashes=False)
def get_profile_pic(user_id):
    """get profile picture"""
    try:
        data = (
            supabase.table("uploads")
            .select("profile_pic")
            .eq("user_id", user_id)
            .execute()
        )

        if len(data.data) == 0 or not len(data.data) > 0:
            return jsonify({"data": [], "message": "Profile picture not found!"}), 200
        return jsonify({"data": data.data, "status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# update user profile picture
@app.route("/api/v1/profile-pic/<user_id>", methods=["PUT"], strict_slashes=False)
def update_profile_image(user_id):
    """update user's profile image"""
    try:
        # check if the request contains a file
        if "file" not in request.files:
            return (
                jsonify({"message": "No file part!", "status": "failed"}),
                400,
            )
        file = request.files["file"]
        if file and allowed_file(file.filename):
            # construct file name with user id and timestamp
            save_file_as = f"{user_id}_{IMAGE_TIMESTAMP}.jpg"
            file_name = secure_filename(file.filename)

            # check if file is selected
            if file_name == "":
                return jsonify({"message": "No file selected", "status": "failed"}), 400

            # create a temporary directory
            temp_dir = tempfile.mkdtemp()
            file_path = os.path.join(temp_dir, file_name)
            file.save(file_path)

            # # get file path to be updated in storage
            data = (
                supabase.table("uploads")
                .select("profile_pic")
                .eq("user_id", user_id)
                .execute()
            )
            if not len(data.data) > 0:
                return (
                    jsonify(
                        {"message": "Profile picture not found!", "status": "failed"}
                    ),
                    404,
                )

            # get image url
            image_url = data.data[0]["profile_pic"]
            # get image name
            image_name = image_url.split("/")[-1]

            # remove old image from storage
            storage.from_("profile_image").remove(f"{image_name}")

            # upload new profile image to storage
            storage.from_("profile_image").upload(
                save_file_as, file_path, {"content-type": "image/jpg"}
            )

            # update user profile_pic field in users table
            image_url = "https://oqctaxhqpoexbvokkqbd.supabase.co/"
            image_url += f"storage/v1/object/public/profile_image/{save_file_as}"
            time.sleep(1)
            data = (
                supabase.table("uploads")
                .update({"profile_pic": image_url})
                .eq("user_id", user_id)
                .execute()
            )
            if not len(data.data) > 0:
                return (
                    jsonify(
                        {
                            "message": "Could not update user profile picture!",
                            "status": "failed",
                        }
                    ),
                    404,
                )
            # remove the temporary directory
            os.remove(file_path)
            os.rmdir(temp_dir)
            return (
                jsonify({"data": data.data, "status": "success"}), 201
            )
        return jsonify({"message": "File not allowed!", "status": "failed"}), 400
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


# remove user profile image

@app.route("/api/v1/profile-pic/<user_id>", methods=["DELETE"], strict_slashes=False)
def remove_image_profile(user_id):
    """remove user's profile image"""
    try:
        data = (
            supabase.table("uploads")
            .select("profile_pic")
            .eq("user_id", user_id)
            .execute()
        )
        if not len(data.data) > 0:
            return jsonify({"message": "Profile picture not found!", "status": "failed"}), 404

        # get image url
        image_url = data.data[0]["profile_pic"]
        # get image name
        image_name = image_url.split("/")[-1]

        # delete image from storage
        storage.from_("profile_image").remove(f"{image_name}")

        # update user profile_pic field in users table
        data = (
            supabase.table("uploads")
            .delete()
            .eq("user_id", user_id)
            .execute()
        )
        if not len(data.data) > 0:
            return (
                jsonify(
                    {
                        "message": "Could not remove user profile picture!",
                        "status": "failed",
                    }
                ),
                404,
            )
        return jsonify({"status": "success"}), 200
    except Exception as error:
        return (
            jsonify(
                {"message": "An error occurred!", "error": error, "status": "failed"}
            ),
            400,
        )


if __name__ == "__main__":
    HOST = environ.get("SERVER_HOST", "localhost")
    PORT = int(environ.get("SERVER_PORT", 5555))

    app.run(host=HOST, port=PORT)
