FROM node:18

# set working directory
WORKDIR /usr/src/

# Install dependencies and build the app
COPY package*.json ./
RUN npm install

COPY . .

#RUN npm run build
# server to serve the files
#FROM nginx:alpine
#COPY /build/ /usr/share/nginx/html

EXPOSE 3000

# start
CMD ["npm", "start"]
#CMD ["nginx", "-g", "daemon off;"]
