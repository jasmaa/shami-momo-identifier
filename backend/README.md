# Shami-Momo

Identifies if an image is of Shamiko or Momo

## Development

    # Frontend
    cd web
    yarn install
    yarn start

    # Backend
    cd backend
    pip install -r requirements.txt
    flask run

## Build with Docker
    docker build -t shami-momo .
    docker run --rm -p 8000:8000 shami-momo:latest