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
RUN pip install -U pip
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend .

COPY entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]