# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.api.routes import metrics, optimization, health, auth, users, dashboard
# from starlette.middleware.sessions import SessionMiddleware
# from prometheus_fastapi_instrumentator import Instrumentator

# app = FastAPI(
#     title="Resource Monitoring & Optimization Tool",
#     openapi_url="/openapi.json",
#     docs_url="/docs",
#     redoc_url="/redoc"
# )


# # Add CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # Include routes
# app.include_router(metrics.router, prefix="/api/metrics", tags=["Metrics"])
# app.include_router(optimization.router, prefix="/api/services/optimization", tags=["Optimization"])
# app.include_router(health.router, prefix="/health", tags=["Health"])
# app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# app.include_router(users.router, prefix="/users", tags=["User Management"])
# app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])


# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the Resource Monitoring & Optimization Tool"}

# # @app.get("/")
# # async def root():
# #     return {"message": "Welcome to Resource Monitoring & Optimization Tool"}
# # Properly register Prometheus metrics
# instrumentator = Instrumentator()
# instrumentator.instrument(app).expose(app, endpoint="/metrics")

# # Start collecting metrics when the application starts
# @app.on_event("startup")
# async def startup_event():
#     print("Application started successfully!")
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import metrics, optimization, health, auth, users, dashboard
from starlette.middleware.sessions import SessionMiddleware
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(
    title="Resource Monitoring & Optimization Tool",
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(metrics.router, prefix="/api/metrics", tags=["Metrics"])
app.include_router(optimization.router, prefix="/api/services/optimization", tags=["Optimization"])
app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["User Management"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Resource Monitoring & Optimization Tool"}

# Initialize Prometheus Instrumentator but only expose metrics at "/metrics"
Instrumentator().expose(app, endpoint="/metrics", include_in_schema=False)

@app.on_event("startup")
async def startup_event():
    print("Application started successfully!")


