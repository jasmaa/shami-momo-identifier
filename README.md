# Shami-Momo Identifier

Identifies if an image is of Shamiko or Momo using ResNet-18 trained off of Roger Park's
[Machikado Mazoku face collection](https://onedrive.live.com/?id=5524F7DE20BB5EB2%21269088&cid=5524F7DE20BB5EB2).

![Screenshot of Shami-Momo Identifier](docs/screenshot_01.png)

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
    docker run --name shami-momo --rm -d -p 8000:8000 -e PORT=8000 shami-momo:latest