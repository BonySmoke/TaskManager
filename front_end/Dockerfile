FROM node:latest

WORKDIR /usr/TaskManager/front_end

COPY task-manager/package.json task-manager/package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000