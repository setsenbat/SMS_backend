FROM node:14
WORKDIR /sms_backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5557
CMD [ "node", "server/app.js" ]