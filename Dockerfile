From node:8.11.3

ENV TINI_VERSION v0.17.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "-g", "--"]

WORKDIR /usr/app
COPY package.json yarn.lock ./
COPY . .

RUN ["yarn", "install", "--production", "--frozen-lockfile"]

EXPOSE 4040
CMD node ./build/main/index.js
