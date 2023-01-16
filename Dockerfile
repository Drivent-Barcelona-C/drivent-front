FROM node:16
WORKDIR /drivent-front
COPY ./package*.json ./
COPY ./.husky ./
RUN npm install
COPY . . 
ENV PORT=4001
EXPOSE 4001
CMD ["npm", "start"]
