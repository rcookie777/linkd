import requests
from PIL import Image, ImageDraw, ImageFont
import io
import base64


def generate_linkedin_preview():
    username = "Joseph-M-Cook"
    
    # Retrieve the necessary data from the GitHub API
    user_data_response = requests.get(f"https://api.github.com/users/{username}")
    user_data = user_data_response.json()
    
    repos_response = requests.get(f"https://api.github.com/users/{username}/repos")
    repos = repos_response.json()

    commits_count = user_data['public_repos']
    
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

    base64_encoded_image = base64.b64encode(image_byte_stream.getvalue())
    
    # Return the image as a response
    return base64_encoded_image, 200, {"Content-Type": "image/png"}


print(generate_linkedin_preview())