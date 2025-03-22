import { useState } from "react";
import axios from "axios";

const App = () => {
  const [problem, setProblem] = useState("");
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const response = await axios.post("http://localhost:5000/generate-feedback", {
        problem,
        code,
      });
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error generating feedback:", error);
      setFeedback("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Programming Tutor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Student Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows="6"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Feedback"}
          </button>
        </form>
        {feedback && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold">Feedback:</h2>
            <p className="mt-2 text-gray-700">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
