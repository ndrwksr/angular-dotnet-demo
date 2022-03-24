# This Dockerfile is very inefficient, but it works just fine for a demo.

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
# This build needs to take place in an environment which has the DotNet SDK installed for
# the post-install step of @nx-dotnet/core

# Copy the entire workspace!
# We need to be able to capture package.json, yarn.lock, etc.
COPY . ./angular-dotnet-demo
WORKDIR /angular-dotnet-demo

# Install Node, as @nx-dotnet/core requires node be installed for the sake of checking module 
#  boundaries. Ideally we could use a base image which includes the dotnet SDK and Node, but 
#  one was not readily available.
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm

# Update npm and install n globally so we can ensure we're running on the latest LTS version
#  of Node
RUN npm install npm@latest -g && \
    npm install n -g && \
    n lts

# Install yarn, cannot be done in the same step as above
RUN npm install yarn -g

# Install node modules for whole workspace, cannot be done in the same step as above
RUN yarn

WORKDIR /angular-dotnet-demo/apps/records

RUN yarn nx run records:build

# Prod
FROM nginx:alpine
COPY --from=build /angular-dotnet-demo/dist/apps/records /usr/share/nginx/html