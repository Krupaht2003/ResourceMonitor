from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import hash_password
from app.models.user import User
from pydantic import BaseModel, Field

router = APIRouter()

class SignupRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Username is required and must be 3-50 characters long")
    password: str = Field(..., min_length=6, max_length=100, description="Password is required and must be at least 6 characters long")

@router.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):  
    # Ensure username and password are not empty
    if not request.username.strip() or not request.password.strip():
        raise HTTPException(status_code=400, detail="Username and password are required")

    # Check if the user already exists
    existing_user = db.query(User).filter(User.username == request.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # Create a new user
    user = User(username=request.username, hashed_password=hash_password(request.password))
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created successfully"}
