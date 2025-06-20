> yay -S mongosh-bin

>mongosh "mongodb://localhost:27017"
>show dbs
>use chatbot_db
>show collections
>db.questions.find().pretty()


# 🤖 Tally Assistant – Chatbot with MongoDB & FastAPI

Tally Assistant is a smart chatbot powered by Gemini AI and FastAPI, storing every user interaction in MongoDB. This guide walks you through setting up, connecting to, and exploring your chatbot’s brain using `mongosh`.

---

## 📦 Prerequisites

- MongoDB running locally on `localhost:27017`
- `mongosh` installed
- Your chatbot app set up (FastAPI backend)

---

## 🛠️ Install `mongosh`

If you're on Arch Linux or a compatible distro:

```bash
yay -S mongosh-bin
