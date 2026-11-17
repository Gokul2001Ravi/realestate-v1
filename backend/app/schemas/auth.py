from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminLoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    admin_name: str
    email: str
    role: str

class AdminProfile(BaseModel):
    email: str
    name: str
    role: str
