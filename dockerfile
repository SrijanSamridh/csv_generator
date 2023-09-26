FROM node:18

# Create app directory
RUN mkdir /src
WORKDIR /src

# Install app dependencies
ADD package.json /src/package.json
RUN npm install

# Bundle app source
COPY . /src

# Expose port
EXPOSE 8080

# Run app
CMD node app.js