# video-feed-app

## Setup

- Ubuntu 24.04
- Docker
- VS Code

## Code

- Use VS Code Dev Container
- Environment Setup is given in [.devcontainer/docker-compose.yml](.devcontainer/docker-compose.yml)

## Install Libs

```sh
npm install
```

## TEST

```sh
npm run test
```

## Dev

```sh
npm run dev
```

## Build

```sh
npm run build
```

## Stat

```sh
npm run start
```


## Docker Build Test

- Run Outside Dev Container

### Build
```sh
docker compose build
```

### Test
```sh
docker compose run --rm video_feed_app npm run test
```

### Up
```sh
docker compose up
```

### Down
```sh
docker compose down
```
