from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai  
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException
from zoneinfo import ZoneInfo

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")

# #timezone setting
# kenyan_time = datetime.now(ZoneInfo("Africa/Nairobi"))

# MongoDB setup
client = MongoClient(MONGODB_URI)
db = client["chatbot_db"]
collection = db["questions"]

# Configure Gemini with API key
genai.configure(api_key=GOOGLE_API_KEY)

# You can switch to 'gemini-1.5-pro' or others if needed
model = genai.GenerativeModel(model_name="gemini-1.5-flash")


app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str




@app.post("/ask")
async def ask_question(payload: Question):
    try:
        response = model.generate_content(payload.question)
        answer = response.text
        # Kenyan time at the time of the request
        kenyan_time = datetime.now(ZoneInfo("Africa/Nairobi"))
        # Save to MongoDB
        print("Kenyan Time:", datetime.now(ZoneInfo("Africa/Nairobi")))

        collection.insert_one({
            "question": payload.question,
            "answer": answer,
            "timestamp": kenyan_time
        })

        return {"response": answer}
    except Exception as e:
        return {"error": str(e)}


@app.delete("/delete/{item_id}")
async def delete_question(item_id: str):
    try:
        # Convert string to ObjectId
        object_id = ObjectId(item_id)
        result = collection.delete_one({"_id": object_id})
        
        if result.deleted_count == 1:
            return {"message": f"Document with id {item_id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Document not found")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))





@app.get("/answers")
async def get_all_full_responses():
    try:
        # Fetch documents sorted by timestamp descending
        documents = collection.find().sort("timestamp", -1)

        results = []
        for doc in documents:
            doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
            results.append(doc)

        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


