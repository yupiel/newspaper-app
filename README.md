# Newspaper app

### Usage Application

Install dependencies: ```npm install```

Build with webpack: ```npm run build``` and use the build accordingly

or

Run webpack dev server: ```npm run serve```

Webpack dev server will deploy the content to ```http://localhost:9000/```


### Testing

Install dependencies: ```npm install```

Run tests: ```npm run test```


### Docker

Install dependencies: ```npm install```

Build with webpack ```npm run build```

Create docker container from app's Dockerfile: ```docker build -t yourusername/imagefilename .``` <br>
Example: ```docker build -t yupiel/newspaper-app .```

The run the docker image you just created: <br> ```docker run -dp yourPortOutside:yourPortInside -e PORT=yourPortInside yourusername/imagefilename``` <br>
Example: ```docker run -dp 9000:3333 -e PORT=3333 yupiel/newspaper-app```

Navigate to: ```http://localhost:yourPortOutside``` in the example case ```http://localhost:9000``` to see the result
