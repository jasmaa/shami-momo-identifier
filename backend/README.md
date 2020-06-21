# Shami-Momo

Identifies if an image is of Shamiko or Momo using Resnet-18 trained off of Roger Park's
[Machikado Mazoku face collection](https://onedrive.live.com/?id=5524F7DE20BB5EB2%21269088&cid=5524F7DE20BB5EB2)

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