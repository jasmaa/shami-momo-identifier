FROM node:alpine as frontend
WORKDIR /tmp/web
COPY web/package.json .
COPY web/yarn.lock .
RUN yarn install
COPY web .
RUN yarn build

FROM python:3.6
WORKDIR /opt
COPY --from=frontend /tmp/web/build ./public
RUN apt-get -y install libc-dev
#RUN apt-get -y install build-essential
RUN pip install -U pip
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend .

EXPOSE 8000
CMD gunicorn -b 0.0.0.0:8000 "app:app"