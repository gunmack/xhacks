import logging
from fastapi import FastAPI
from contextlib import asynccontextmanager
import database

logging.basicConfig(level=logging.DEBUG)
database.setup()

app = FastAPI(
    lifespan=database.lifespan,
    title="stevens sex dungeon",
    description=f'peanits',
    root_path="/api"
)

@app.get("/")
async def read_root():
    return {"message": "steeeeeeeeeeeeeeeeewen"}

from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import sqlalchemy

@app.get("/get_user")
async def get_user(
    request: Request,
    db_session: database.DBSession,
    username: str
):
    res = await db_session.scalar(
        sqlalchemy.select(BedrockUser)
        .where(BedrockUser.username == username)
    )

    return JSONResponse(res.to_dict())

@app.post("/create_user")
async def create_user(
    request: Request,
    db_session: database.DBSession,
    username: str,
    email: str,
    u_token: str
):
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username cannot be of length zero!"
        )
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email cannot be of length zero!"
        )
    if u_token is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Token cannot be of length zero!"
        )
    
    db_session.add(BedrockUser(
        username=username,
        email=email,
        u_token=u_token
    ))

    await db_session.commit()

    res = await db_session.scalar(
        sqlalchemy.select(BedrockUser)
        .where(BedrockUser.username == username)
    )
    return JSONResponse(res.to_dict())

from database import Base
from sqlalchemy import (
    Column,
    ForeignKey,
    PrimaryKeyConstraint,
    String,
    Text
)

class BedrockUser(Base):
    __tablename__ = "bedrock_user"

    username = Column(String(255), primary_key=True, nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    u_token = Column(String(255))

    def to_dict(self) -> dict:
        return {
            "username" : self.username,
            "email" : self.email,
            "u_token" : self.u_token
        }