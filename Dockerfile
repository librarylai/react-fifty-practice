# Base Image
FROM node:15.14.0-stretch
RUN apt-get update &&  apt-get install -y yarn
# 這邊是指容器的工作目錄，就像 cd workspace 意思一樣
WORKDIR /workspace
COPY package.json /workspace
COPY yarn.lock /workspace
# 執行某個腳本命令，在這邊等同於我們先前所下的 npm install
RUN yarn install
# 複製當前目錄到容器中的 /workspace
COPY . /workspace
EXPOSE 8080: 3000

CMD ["yarn" ,"start"]

