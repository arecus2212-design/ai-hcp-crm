# AI-First HCP CRM

An Intelligent CRM System for Life Sciences Field Teams

AI-First HCP CRM is a full-stack, production-style Customer Relationship Management (CRM) system designed for Healthcare Professional (HCP) interactions.
It enables medical representatives to log interactions using natural language, which is then converted into structured CRM data using Large Language Models (LLMs).

This project demonstrates end-to-end AI system design, combining frontend UX, backend APIs, AI agents, and database persistence.

✨ Key Features
🤖 AI-Assisted Interaction Logging

Log HCP interactions using free-text chat

AI automatically extracts:

HCP Name

Interaction Type

Topics Discussed

Sentiment

User reviews and edits data before saving (human-in-the-loop)

🧠 Agent-Based AI Architecture

Built using LangGraph

LLM powered by Groq (Llama-3.3-70B)

Backend enforces strict JSON-only AI output

📝 Manual CRM Form Support

Traditional form entry available

AI suggestions never overwrite user input

💾 Persistent Storage

Data stored in MySQL

Structured relational schema

Ready for analytics and reporting

🔐 Production-Ready Practices

Environment-based configuration

Secure API key handling

Proper CORS handling

Backend validation & normalization

🏗️ System Architecture
Frontend (React + Vite)
        |
        |  REST API
        v
Backend (FastAPI)
        |
        |  LangGraph Agent
        v
Groq LLM (Llama-3.3-70B)
        |
        v
MySQL Database

🧰 Tech Stack
Frontend

React (Vite)

JavaScript (ES6+)

CSS

Google Font: Inter

Backend

FastAPI

LangGraph

SQLAlchemy

Groq SDK

AI

Llama-3.3-70B-Versatile (Groq)

Agent-based extraction pipeline

Database

MySQL

📁 Project Structure
hcp-crm/
├── backend/
│   └── app/
│       ├── ai/
│       │   └── interaction_agent.py
│       ├── main.py
│       ├── models.py
│       ├── schemas.py
│       └── db.py
│
├── frontend/
│   └── hcp-crm-ui/
│       ├── src/
│       │   └── components/
│       │       └── LogHCPInteraction.jsx
│       └── package.json
│
├── README.md
└── .gitignore

⚙️ Local Setup Instructions
1️⃣ Clone the Repository
```bash
git clone https://github.com/arecus2212-design/ai-hcp-crm.git
cd ai-hcp-crm
```
2️⃣ Backend Setup

Create and activate virtual environment (optional):
````bash
python -m venv venv
``````````
````bash
venv\Scripts\activate
`````````````

Install dependencies:
```bash
pip install -r requirements.txt
```

Create .env file inside backend/:

```bash
GROQ_API_KEY=your_groq_api_key
DATABASE_URL=mysql+pymysql://user:password@localhost:3306/hcp_crm
````````

Run backend:
````bash
cd backend
python -m uvicorn app.main:app --reload
`````

API docs available at:

http://127.0.0.1:8000/docs

3️⃣ Frontend Setup
```bash
cd frontend/hcp-crm-ui
`````
````bash
npm install
````
```bash
npm run dev
````


Frontend available at:

http://localhost:5173

🧪 Example AI Input
Met Dr Neha Verma at clinic. Discussed Product Y dosage schedule.
She was interested but asked for follow-up data.

Auto-Extracted Output

HCP Name: Dr Neha Verma

Interaction Type: Meeting

Topics: Product Y dosage schedule

Sentiment: Neutral / Interested

🧠 Design Principles

Backend validates and parses AI output (frontend never parses raw LLM text)

AI assists, but users retain full control

Strong typing and validation for database safety

Mirrors real enterprise CRM workflows (Veeva / Salesforce-style)

🚧 Future Enhancements

Interaction history per HCP

Edit / update interactions

Delete interactions

Compliance & off-label detection

AI confidence scoring

Analytics dashboard

👨‍💻 Author

Yash Kaushal
B.Tech CSE (AI & ML) | B.Sc Physics (Hons)
Interested in AI systems, backend engineering, and life-sciences technology.

⭐ Why This Project Matters

This is not a demo chatbot.
It is a real AI-first enterprise workflow showcasing:

Responsible LLM integration

Full-stack ownership

Production-style backend design

Domain-aware AI usage
