## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

Also, there is a zip file attached with the Android .apk. You can simply download the .apk to your Android smartphone or emulator.
[CurrencyConverter.apk.zip](https://github.com/VashaMasha/CurrencyConverter/files/14581112/CurrencyConverter.apk.zip)


## User flow

1. When the currency button is pressed on the main screen, it redirects to a screen listing available currencies. The current currency and translation direction are passed as parameters.

2. Upon reaching the currency list screen, a request is made to the API https://api.fxratesapi.com/currencie to obtain available currencies.

2.1. Upon successful completion of the request and the existence of a currency list, the retrieved items are mapped with values from the currencies.json file and displayed on the screen. In this case, there is a possibility of missing a flag scenario. This occurs if the API returns a value not present in the currencies.json file, which contains a link to the flag icon.

2.2. If the request ends with an error or there is no list of currencies, it redirects to the main screen and displays an error message.

3. When text is entered into the input field on the currency list screen, the currency list is filtered based on the "code" and "name" fields using the entered value.

4. When a currency is selected, it navigates back to the main screen with parameters containing the fields of the selected currency.

5. The received value is saved on the main screen, and the convertValue function is called. Inside convertValue, there is a check for internet connection.

5.1. If there is an internet connection, the API https://fxratesapi.com/docs/endpoints/latest-exchange-rates is called. Parameters passed: "from" and "amount" values, with "amount" set to 1. Upon successful API call, the received "rate" is multiplied by the entered value in the input field, and the received "rates" list is saved in AsyncStorage for offline use of the application.

5.2. If there is no internet connection, the conversion to the selected currency is based on the saved "rates". If there are no saved "rates", an error is displayed.

6. When the input field value changes on the main screen, the onAmountChange function is called, inside which, after 500 milliseconds upon input completion, the convertValue function is called (steps 5.1 and 5.2). The timer is implemented to avoid calling the convertValue function on every input field change, thus waiting for the user to finish entering a whole number and avoiding unnecessary work during input.

## Project structure

Despite the project being small, I still decided to create a project structure with scalability in mind, to demonstrate how I would work with a large-scale project.

All the application code is stored in the src folder. I divided logical elements into folders (api, assets, components, data, router, store, theme, types). Custom components are placed in separate files and reused when necessary to avoid code and style duplication.

## Used libraries

@react-native-async-storage/async-storage - for storing "rates" and their subsequent use.

axios - for working with APIs.

@react-native-community/netinfo - for checking internet connection availability.

@react-navigation/native, @react-navigation/native-stack, @react-navigation/native, react-native-screens - for implementing navigation in the application.

<div align="center">
<img src="https://github.com/VashaMasha/CurrencyConverter/assets/36168154/c94bb53d-3ed2-4e93-a111-61b4caa78475" width="300">
<img src="https://github.com/VashaMasha/CurrencyConverter/assets/36168154/1a432a37-0f35-4df7-a9ae-8cc044fed29e" width="300">
</div>
