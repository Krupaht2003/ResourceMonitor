from fastapi import FastAPI , Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import metrics, optimization, health, auth, users, dashboard
from starlette.middleware.sessions import SessionMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from app.utils.prometheus_metrics import REQUESTS

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

@app.middleware("http")
async def request_counter_middleware(request: Request, call_next):
    response = await call_next(request)

    # Increment only if the request is for /auth/login and response status is 200
    if request.url.path == "/auth/login" and response.status_code == 200:
        REQUESTS.inc()

    return response


# Initialize Prometheus Instrumentator but only expose metrics at "/metrics"
Instrumentator().expose(app, endpoint="/metrics", include_in_schema=False)

@app.on_event("startup")
async def startup_event():
    print("Application started successfully!")

@app.get("/health")
def health_check():
    return {"status": "ok"}

