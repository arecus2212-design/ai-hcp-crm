import { useState } from "react";
import "./LogHCPInteraction.css";

export default function LogHCPInteraction() {
  const [formData, setFormData] = useState({
    hcpName: "",
    interactionType: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics: "",
    sentiment: "Neutral",
  });

  const [aiInput, setAiInput] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // AI CHAT HANDLER
  // -------------------------------
  const handleAIChat = async () => {
    if (!aiInput.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ai/parse-interaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiInput }),
      });

      const data = await res.json();
      const parsed =
        typeof data.result === "string"
        ? JSON.parse(data.result)
        : data.result;


      setFormData((prev) => ({
        ...prev,
        hcpName: parsed.hcpName || prev.hcpName,
        interactionType: parsed.interactionType || prev.interactionType,
        topics: parsed.topics || prev.topics,
        sentiment: parsed.sentiment || prev.sentiment,
      }));

      setAiInput("");
    } catch (err) {
      console.error(err);
      alert("AI failed to parse interaction");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // SAVE TO DATABASE
  // -------------------------------
  const handleSave = async () => {
    try {
      await fetch("http://127.0.0.1:8000/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      alert("Interaction saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save interaction");
    }
  };

  return (
    <div className="hcp-page">
      <h1 className="page-title">Log HCP Interaction</h1>

      <div className="hcp-layout">
        {/* LEFT PANEL */}
        <div className="hcp-card">
          <h2 className="section-title">Interaction Details</h2>

          <div className="form-group">
            <label>HCP Name</label>
            <input
              value={formData.hcpName}
              onChange={(e) =>
                setFormData({ ...formData, hcpName: e.target.value })
              }
              placeholder="Search or select HCP..."
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Interaction Type</label>
              <select
                value={formData.interactionType}
                onChange={(e) =>
                  setFormData({ ...formData, interactionType: e.target.value })
                }
              >
                <option>Meeting</option>
                <option>Call</option>
                <option>Video</option>
                <option>Email</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Attendees</label>
            <input
              value={formData.attendees}
              onChange={(e) =>
                setFormData({ ...formData, attendees: e.target.value })
              }
              placeholder="Enter names or search..."
            />
          </div>

          <div className="form-group">
            <label>Topics Discussed</label>
            <textarea
              value={formData.topics}
              onChange={(e) =>
                setFormData({ ...formData, topics: e.target.value })
              }
              placeholder="Enter key discussion points..."
            />
          </div>

          <div className="form-group">
            <label>Observed / Inferred HCP Sentiment</label>
            <div className="radio-row">
              {["Positive", "Neutral", "Negative"].map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="sentiment"
                    value={s}
                    checked={formData.sentiment === s}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sentiment: e.target.value,
                      })
                    }
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Interaction
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="hcp-card ai-card">
          <h2 className="section-title">🤖 AI Assistant</h2>
          <p className="ai-subtitle">Log interaction via chat</p>

          <p className="ai-help">
            Describe the interaction in natural language and let AI fill the
            form for you.
          </p>

          <div className="chat-row">
            <input
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Describe interaction..."
            />
            <button onClick={handleAIChat} disabled={loading}>
              {loading ? "Analyzing..." : "AI Log"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
