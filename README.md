# Newspaper app

## Usage Application

Install dependencies: ```npm install```

Build with webpack: ```npm run build``` and use the build accordingly

or

Run webpack dev server: ```npm run serve```

Webpack dev server will deploy the content to ```http://localhost:9000/```


## Testing

Install dependencies: ```npm install```

Run tests: ```npm run test```


## Docker

### Build it yourself

Install dependencies: ```npm install```

Build with webpack ```npm run build```

Create docker container from app's Dockerfile: ```docker build -t yourusername/imagefilename .``` <br>
Example: ```docker build -t yupiel/newspaper-app .```

### Download it from the repository

Alternatively you can download the latest image from the Dockerhub repository: <br> https://hub.docker.com/repository/docker/yupiel/newspaper-app <br>
or from this repository's Packages section (on the right). <br>
[They are updated within seconds of each other so you won't miss anything]

### Run the image

To run the docker image you just created: <br> ```docker run -dp yourPortOutside:yourPortInside -e PORT=yourPortInside yourusername/imagefilename``` <br>
Example: ```docker run -dp 9000:3333 -e PORT=3333 yupiel/newspaper-app```

Navigate to: ```http://localhost:yourPortOutside``` in the example case ```http://localhost:9000``` to see the result
