# Genno Frontend Starter Kit

## Requirements
- NodeJS v8 or above
- MongoDB v4
- Javascript Skill
- Basic MongoDB Skill

## Installation
- Find file .env in frontend root folder
- Update `VUE_APP_API_BASE_URL` field to your server url
- Update `VUE_APP_API_KEY_GMAP` field to API Key Google Map. See [Generating a Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Run `npm install` inside folder `frontend-vue`
- Run `npm run serve` for dev, `npm run build` to build for prod
- Open page `/install`, here you will need to fill FirstName, email, username, password, and Role
- Fill the form and submit
- It will create Super Admin User and default Site Configurations

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Docker

## Build image and run Container

### Development
```
docker-compose up -d --build
```

### Stop the container
```
docker-compose stop
```

### Production
```
docker-compose -f docker-compose-prod.yml up -d --build
```

### Stop production
```
docker stop web-prod
```


# Bash Command

## Deploy Container

### Start Development Environment
```
sh ./deploy/bin/dev.sh
```

### Stop Development Environment
```
sh ./deploy/bin/stop-dev.sh
```

### Start Production Environment
```
sh ./deploy/bin/prod.sh
```

### Stop Production Environment
```
sh ./deploy/bin/stop-prod.sh
```
