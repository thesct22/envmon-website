# EnvMon

The website is made using ReactJs framework and displays the sensor data stored in Firebase and can filter through the data

## Running in dev mode

Run 
```bash 
npm i
```

Run
```bash
npm start
```

## Making Production build

Run
```bash
npm build
```

## Adding to github pages

### Run on main branch

```bash
git checkout main
```

Edit first line of package.json

```js
{
  "homepage": "https://{igithub-id}.github.io/{repo-name}",
  "name": "envmon-website",
  "version": "0.1.0",
  "private": true,
  {...}
```

## Creating Docker Container

### Run on Docker branch

```bash
git checkout Docker
```

Run from directory which has the Dockerfile

```bash
docker build -t {your_dockerhub_id}/{image_name}:{image_tag (ex: alpine)} .
```
To run the container run

```bash
docker run -it  -p {any_port}:80 {your_dockerhub_id/{image_name}:{image_tag (ex: alpine)}
```
