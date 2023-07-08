FROM node:latest 
WORKDIR /app/server 
COPY package.json /app/server
COPY package-lock.json /app/server 
RUN npm install --force
COPY . /app/server
CMD [ "npm", "run", "dev" ]