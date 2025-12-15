# 🧠 PROJECT BRAIN: Nimbus IQ AI

## 🛠 TECH STACK & CONFIGURATION
* **Core Framework:** React 18+ (Frontend) + FastAPI (Backend)
* **Language:** Python 3.11 + TypeScript
* **Styling:** Tailwind CSS
* **Backend/API:** FastAPI (Python)
* **Database:** MongoDB (NoSQL) or Pinecone (Vector DB)
* **State Management:** React Context API / Hooks
* **Key Libraries:** @google/genai (AI SDK), Lucide-React (Icons), Pydantic (Validation)

---

## 📂 FILE SYSTEM ARCHITECTURE

/root
├── /public            # Static assets
├── /src               # Source code
│   ├── index.tsx      # Main React Entry Point
│   ├── main.py        # Python Backend Entry Point (The Brain)
│   └── project_context.md # This file
├── index.html         # HTML Template
├── package.json       # Dependencies
└── README.md          # Project documentation

---

## 🎨 DESIGN SYSTEM & STYLE GUIDE
* **Color Palette:**
    * Primary: #0f172a (Nimbus-900 / Slate)
    * Secondary: #06b6d4 (Nimbus-500 / Cyan)
    * Accent: #22d3ee (Nimbus-400 / Cyan Bright)
* **Typography:** System Sans-Serif (Inter style)
* **Spacing:** Tailwind Utility Grid

---

## 📝 CURRENT CODING CONVENTIONS (RULES)
1.  **Imports:** ESM modules.
2.  **Naming:** PascalCase for components, snake_case for Python.
3.  **AI Integration:** Use @google/genai for all LLM calls.
4.  **Backend:** FastAPI for all server-side logic (simulated or real).
