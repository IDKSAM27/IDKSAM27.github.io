---
title: 'How to Structure a fast, scalable backend using Python and FastAPI'
date: '2026-06-18'
excerpt: 'Learn how to structure a clean, scalable FastAPI backend for real-world applications.'
---

# Building for Scale: Stop Putting Everything in main.py

**Tags:** `FastAPI`, `Python`, `Backend`, `Scalability`, `Architecture`

---

If you're starting with FastAPI, you've probably noticed how easy it is to get a basic app running in a single `main.py` file. But as your project grows, things can quickly turn into a messy spaghetti codebase.

Don't worry - you're not alone.

---

### Check Out the Video
If you prefer watching over reading, I've broken down this exact architecture in my latest YouTube video:
[Watch "How to Structure a fast, scalable backend using Python and FastAPI" on YouTube](https://www.youtube.com/watch?v=TE7Fj_lEY7g)

---

## What You'll Learn

- Why structure matters in FastAPI
- The recommended project layout
- Separating Routes, Controllers, and Services
- Dependency Injection for database sessions
- Final Thoughts and mental model

---

## Why Structure Matters? 

FastAPI is incredibly flexible and doesn't force a specific structure on you (unlike Django). While this is great for microservices, it means you have to be disciplined about organizing your code.

**Key goals of a good structure:**

1. **Separation of Concerns:** Keep your business logic away from your routing logic.
2. **Testability:** Make it easy to mock databases and external services.
3. **Scalability:** Allow new features to be added without breaking existing ones.

---

## The Recommended Project Layout

Instead of putting everything in `main.py`, a scalable FastAPI app usually looks like this:

```text
my_fastapi_app/
├── app/
│   ├── main.py
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   └── users.py
│   │       └── router.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── models/
│   │   └── user.py
│   ├── schemas/
│   │   └── user.py
│   ├── services/
│   │   └── user_service.py
│   └── db/
│       └── session.py
├── requirements.txt
└── .env
```

---

## Visualizing the Flow

As shown in my architecture diagram, here is how a request typically flows between the **Client (Mobile/PC)** and your backend **API Layer**:

```text
    +--------------------+
    |  Client mobile/pc  |
    +--------------------+
         |          ^
    HTTP |          | JSON Response
         v          |
    +--------------------+
    |      API Layer     |
    |--------------------|
    |  Router &          |
    |  Pydantic          |
    |  Validation        |
    +--------------------+
             |
             v
    +--------------------+
    |  Service Layer     |
    | (Business Logic)   |
    +--------------------+
             |
             v
    +--------------------+
    |    Database (DB)   |
    +--------------------+
```

### 1. API Layer (Routers & Pydantic Validation)

The API Layer interacts directly with the **Client**. It receives the `HTTP` request, uses Pydantic schemas to validate the incoming data, passes the data down to the Service Layer, and eventually returns a `JSON Response`.

```python
# app/api/v1/endpoints/users.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserResponse
from app.services import user_service
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=UserResponse)
def create_new_user(user_in: UserCreate, db: Session = Depends(get_db)):
    user = user_service.create_user(db, user_in)
    return user
```

### 2. Service Layer (Business Logic)

This is where the actual work happens. Keep it strictly separated from HTTP requests so it remains pure and easy to test!

```python
# app/services/user_service.py
from app.models.user import User
from sqlalchemy.orm import Session

def create_user(db: Session, user_data: UserCreate):
    # Check if user exists, hash password, save to DB
    new_user = User(email=user_data.email, hashed_password="***")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
```

---

## Common Errors 

### 1. Putting logic in Routers

```python
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    # 50 lines of hashing, DB calls, and email sending here...
    pass # error waiting to happen
```
> Fix: Move the logic to a `service.py` file so you can unit test it without making HTTP requests.

### 2. Circular Imports

If your models import schemas and schemas import models, things will break.
> Fix: Keep layers strictly separated. Routers import Services. Services import Models and Schemas.

---

## Final Thoughts

Building a scalable backend isn't about using the fanciest tools—it's about keeping things organized and separated. By splitting your FastAPI app into Routers, Services, and Models, you set yourself up for long-term success.

> Tip: If you're confused, start simple. You can always refactor later. The framework is flexible enough to grow with you.

---

## Further Reading

- [FastAPI Official Docs on Bigger Applications](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- [Domain Driven Design (DDD) in Python](https://www.cosmicpython.com/)

---

### Thanks for reading! 
