# #Stage 1
# FROM python:3.11-slim AS builder

# WORKDIR /app

# COPY requirements.txt .
# RUN pip install --no-cache-dir --upgrade -r requirements.txt

# # Stage 2
# FROM python:3.11-slim AS runtime

# WORKDIR /app

# COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
# COPY --from=builder /usr/local/bin /usr/local/bin

# COPY . .

# EXPOSE 8080
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]


# Stage 1: Builder Stage (Install Dependencies)
FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && apt-get install -y --no-install-recommends gcc curl && \
    pip install --no-cache-dir --upgrade -r requirements.txt && \
    apt-get remove -y gcc curl && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

# Stage 2: Runtime with Distroless Python and Updated GLIBC
FROM gcr.io/distroless/python3:latest

WORKDIR /app

# Install GLIBC manually in the Distroless image (for Python compatibility)
COPY --from=builder /lib/x86_64-linux-gnu /lib/x86_64-linux-gnu
COPY --from=builder /usr/lib/x86_64-linux-gnu /usr/lib/x86_64-linux-gnu
COPY --from=builder /usr/local/lib /usr/local/lib
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app .

# Expose port 8080 for the FastAPI app
EXPOSE 8080

# Use the distroless entrypoint for uvicorn
CMD ["app.main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "1"]
