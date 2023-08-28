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

# SSR : docker run -p 5001:3001 -d react-ssr
# CSR : docker run -p 8080:3000 -d react-csr
EXPOSE 3000

CMD ["yarn" ,"dev"]

