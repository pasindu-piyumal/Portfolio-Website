
import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const API_URL = "https://portfolio-rag-agent.onrender.com/api";

export default function PortfolioChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      message:
        "Hi! 👋 I'm Pasindu's AI assistant. Ask me about his skills, projects, education, and experience.",
    },
  ]);

  const handleSend = async (e) => {
    e.preventDefault();

    const text = question.trim();

    if (!text || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", message: text },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        throw new Error("Unable to connect to the AI assistant.");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          message:
            "Sorry, I'm temporarily unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portfolio-chat-widget">
      {isOpen && (
        <div className="portfolio-chat-window">
          <div className="portfolio-chat-header">
            <div className="portfolio-chat-brand">
              <div className="portfolio-chat-avatar">
                <Sparkles size={20} />
              </div>

              <div>
                <strong>Portfolio AI</strong>
                <span>
                  <i /> Online Assistant
                </span>
              </div>
            </div>

            <button
              className="portfolio-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="portfolio-chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`portfolio-chat-message ${
                  msg.role === "user" ? "user" : "assistant"
                }`}
              >
                {msg.message}
              </div>
            ))}

            {loading && (
                <div className="portfolio-chat-message assistant typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
          </div>

          <form
            className="portfolio-chat-input"
            onSubmit={handleSend}
          >
            <input
              type="text"
              placeholder="Ask me anything..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={!question.trim() || loading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        className="portfolio-chat-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={25} />
        ) : (
          <MessageCircle size={25} />
        )}
      </button>
    </div>
  );
}
