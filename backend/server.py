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

from fastapi import Request
from fastapi.responses import JSONResponse
import sqlalchemy

@app.get("/test/{username}")
async def get_user(
    request: Request,
    db_session: database.DBSession,
    username: str
):
    print(username)
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