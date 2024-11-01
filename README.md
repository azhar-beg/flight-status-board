# Flight Status Board

## To run the application on your local machine:
1. Make sure you have Node.js (version - 20.x.x) installed on your machine, if not you can download it from [here](https://nodejs.org/en/download/)
2. Clone the repository
3. Run `npm install` in the root directory
4. Run `npm start` in the root directory
5. Open your browser and navigate to `http://localhost:3000/`
6. Enjoy!

- If you start the project and get some error from server side or any other failure you will see the error stack due to local environment.
- You will have to close this manually by clicking on 'X' mark in the top right corner.
- If you don't want to see the error stack, you can run the project in production mode by running `npm run build` and then `serve -s build` in the root directory.

## To run with build follow the below steps:
1. Run `npm run build` in the root directory
2. Run `serve -s build` in the root directory (if you don't have serve installed, you can install it by running `npm install -g serve`)
3. Open your browser and navigate to `http://localhost:5000/`

## To run the tests:
1. Run `npm test` in the root directory

### If you want to update the interval for fetching flight details, please update the `BOARD_UPDATE_INTERVAL` variable in `constants.js` file.
