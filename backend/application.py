from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from PIL import Image, ImageDraw, ImageFont
import io
import base64

CLIENT_ID = "77b3bc10c94c47fb1d84"
CLIENT_SECRET = "9c5e300a58134e9aa81937dc73cf19a3cd65fdc2"

application = Flask(__name__)
CORS(application)

@application.route('/getAccessToken')
def get_access_token():
    code = request.args.get('code')
    params = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code
    }
    headers = {
        "Accept": "application/json"
    }
    response = requests.post("https://github.com/login/oauth/access_token", params=params, headers=headers)
    data = response.json()
    return jsonify(data)

@application.route('/getUserData')
def get_user_data():
    authorization = request.headers.get('Authorization')
    headers = {
        "Authorization": authorization
    }
    response = requests.get("https://api.github.com/user", headers=headers)
    data = response.json()
    return jsonify(data)

@application.route('/getRepos')
def get_repos():
    user = request.args.get('user')
    authorization = request.headers.get('Authorization')
    headers = {
        "Authorization": authorization,
        "Accept": "application/json"
    }
    response = requests.get(f"https://api.github.com/users/{user}/repos?per_page=100&type=all", headers=headers)
    data = response.json()
    return jsonify(data)

@application.route('/getCommits')
def get_commits():
    owner = request.args.get('owner')
    repo_name = request.args.get('repoName')
    user = request.args.get('user')
    authorization = request.headers.get('Authorization')
    headers = {
        "Authorization": authorization,
        "Accept": "application/json"
    }
    response = requests.get(f"https://api.github.com/repos/{owner}/{repo_name}/commits?author={user}", headers=headers)
    data = response.json()
    return jsonify(data)

@application.route('/getUserInfoWithId')
def get_user_info_with_id():
    user = request.args.get('user')
    headers = {
        "Accept": "application/json"
    }
    response = requests.get(f"https://api.github.com/users/{user}", headers=headers)
    data = response.json()
    return jsonify(data)

@application.route('/generator')
def generate_linkedin_preview():
    username = request.args.get('username')
    
    # Retrieve the necessary data from the GitHub API
    user_data_response = requests.get(f"https://api.github.com/users/{username}")
    user_data = user_data_response.json()
    
    repos_response = requests.get(f"https://api.github.com/users/{username}/repos")
    repos = repos_response.json()
    

    
    
    # Create a custom preview image with the GitHub stats
    image = Image.new("RGB", (1200, 630), "#24292e")
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("Satoshi-Black.ttf", 48)
    
    # Add the user's profile picture
    profile_pic_response = requests.get(user_data['avatar_url'])
    profile_pic = Image.open(io.BytesIO(profile_pic_response.content))
    profile_pic = profile_pic.resize((200, 200))
    image.paste(profile_pic, (50, 50))
    
    # Add the username and stats
    draw.text((300, 70), f"GitHub Stats for {username}", font=font, fill="#ffffff")
    draw.text((300, 200), f"Repositories: {user_data['public_repos']}", font=font, fill="#ffffff")
    draw.text((300, 300), f"Followers: {user_data['followers']}", font=font, fill="#ffffff")
    draw.text((300, 400), f"Contributions: {commits_count}", font=font, fill="#ffffff")
    
    # Save the image to a byte stream
    image_byte_stream = io.BytesIO()
    image.save(image_byte_stream, format="PNG")
    image_byte_stream.seek(0)
    
    # Return the image as a response
    return image_byte_stream.getvalue(), 200, {"Content-Type": "image/png"}

if __name__ == '__main__':
    application.debug = True
    application.run(port=8000)
