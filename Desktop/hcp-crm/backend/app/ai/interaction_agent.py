import os
import json
from dotenv import load_dotenv
from groq import Groq
from langgraph.graph import StateGraph

# -------------------------------
# ENV + CLIENT
# -------------------------------
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# -------------------------------
# AI NODE FUNCTION
# -------------------------------
def extract_interaction(state: dict):
    user_text = state["text"]

    prompt = f"""
You are a backend API.

Return ONLY valid JSON.
No explanation.
No markdown.
No text before or after.

Schema:
{{
  "hcpName": string,
  "interactionType": string,
  "topics": string,
  "sentiment": string
}}

Text:
{user_text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    raw_output = response.choices[0].message.content.strip()

    # HARD GUARANTEE: always return JSON
    parsed = json.loads(raw_output)

    return {"result": parsed}

# -------------------------------
# LANGGRAPH DEFINITION
# -------------------------------
graph = StateGraph(dict)
graph.add_node("extract", extract_interaction)
graph.set_entry_point("extract")

# THIS is what main.py imports
interaction_graph = graph.compile()
