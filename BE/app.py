from flask import Flask, request, jsonify
from flask_cors import CORS
from model import generate_feedback  # Import your feedback generation function

app = Flask(__name__)
CORS(app)

@app.route('/generate-feedback', methods=['POST'])
def generate_feedback_endpoint():
    data = request.get_json()
    problem = data.get('problem')
    code = data.get('code')

    if not problem or not code:
        return jsonify({'error': 'Problem and code are required'}), 400

    feedback = generate_feedback(problem, code)
    return jsonify({'feedback': feedback})

if __name__ == '__main__':
    app.run(debug=True)
