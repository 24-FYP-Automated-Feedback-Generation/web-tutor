from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Your Hugging Face model endpoint
HF_API_URL = "https://api-inference.huggingface.co/models/<your-username>/<your-model>"
HF_API_KEY = "your-hugging-face-api-key"  # Optional if the model is private

HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}
from dotenv import load_dotenv
import os

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")


@app.route('/generate-feedback', methods=['POST'])
def generate_feedback():
    data = request.json
    problem = data.get("problem")
    student_code = data.get("student_code")
    metacognitive_profile = data.get("metacognitive_profile")

    if not problem or not student_code or not metacognitive_profile:
        return jsonify({"error": "Missing input data"}), 400

    # Format the input for the model
    inputs = f"Problem: {problem}\nCode: {student_code}\nProfile: {metacognitive_profile}"

    # Send request to Hugging Face
    response = requests.post(HF_API_URL, headers=HEADERS, json={"inputs": inputs})
    
    if response.status_code == 200:
        output = response.json()
        feedback = output[0]['generated_text']
        return jsonify({"feedback": feedback})
    else:
        return jsonify({"error": "Failed to generate feedback", "details": response.json()}), 500

if __name__ == '__main__':
    app.run(debug=True)
