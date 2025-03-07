from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.core.security import hash_password
from app.models.user import User
from pydantic import BaseModel

router = APIRouter()

class SignupRequest(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):  
    # Use sync query() instead of async select()
    existing_user = db.query(User).filter(User.username == request.username).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(username=request.username, hashed_password=hash_password(request.password))
    db.add(user)
    db.commit()  # Sync commit
    db.refresh(user)  # Sync refresh to update the instance

    return {"message": "User created successfully"}
