import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the library
import './MovieDescription.css';

export const MovieDescription = () => {
  const [movieInput, setMovieInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMovieInputChange = (e) => {
    setMovieInput(e.target.value);
  };

  const fetchDescription = async () => {
    if (!movieInput.trim()) {
      alert("Please enter a movie title or comparison request.");
      return;
    }

    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY); // Use your API key here
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Adjust model as needed

      const result = await model.generateContent({
        prompt: `Provide a description or comparison for: ${movieInput}`,
      });
      console.log("this is result" ,result)

      setResponse(result.response.text()); // Parse the response correctly
    } catch (error) {
      console.error("Error fetching movie description:", error);
      setResponse("Sorry, we couldn't fetch the description. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#eb3656",
  };

  return (
    <section className="section-features container">
      <h4 className="subheading">Personalized Descriptions</h4>
      <h2 className="section-features-heading heading-secondary">
        Uncover Movie Insights with AI
      </h2>

      <div className="feature-contents">
        <div className="description-input-container">
          <textarea
            className="description-input"
            placeholder="Enter a movie title or ask a comparison question (e.g., 'Compare Inception and Interstellar')"
            value={movieInput}
            onChange={handleMovieInputChange}
          />
          <button
            className="fetch-description-btn"
            onClick={fetchDescription}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Get Insights"}
          </button>
        </div>

        {loading ? (
          <HashLoader cssOverride={override} color="#eb3656" />
        ) : (
          response && (
            <div className="response-container">
              <h3 className="response-heading">Your Movie Insight:</h3>
              <p className="response-text">{response}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};
