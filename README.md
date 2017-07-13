# Bizsaya MQTT POC
Because Bizsaya having multiple application but having same model/logic, It's good for the model and logic sit in single repository
to ensure code are DRY and reduce unwanted code

## To Run
- Install all required dependency via `npm install`
- `npm run server` to boot up MQTT broker server
- `npm run app` to boot up the application server that contain all the logic
- `npm run start` and `npm run start2` to boot up the consumer application that will consume the response from application server
