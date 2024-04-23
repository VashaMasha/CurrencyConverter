Android .apk: [CurrencyConverter.apk.zip](https://github.com/VashaMasha/CurrencyConverter/files/15079051/CurrencyConverter.apk.zip)

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

### User flow
<div align="center">
<img src="https://github.com/VashaMasha/CurrencyConverter/assets/36168154/080e1188-8dd7-4421-b90b-9a78b8108072" width="300">
<img src="https://github.com/VashaMasha/CurrencyConverter/assets/36168154/0f10e8a2-1cef-461c-a8df-cd2fbc93da48" width="300">
</div>

1. By default, input fields on the main screen are set to 1, and currencies are "-". I did this because there is no data about the price at this step. I could use https://api.cryptorank.io/v1/currencies with the "symbol" parameter to show some default values, but sorting by symbol does not work on the backend side.

2. When the currency button is pressed on the main screen, it redirects to a screen listing available currencies. The current currency and its price are passed as parameters after selecting the currency.
   Unfortunately, the API does not return links to the currency image. Therefore, there are no images on the CurrencySelectScreen.

Additionally, there is pagination and two filters on the CurrencySelectScreen: Rank and Price.

3. Upon reaching the currency list screen, a request is made to the API https://api.cryptorank.io/v1/currencies?api_key=YOUR_API_KEY&limit=10&offset=0 to obtain available currencies.
   3.3. If the request ends with an error or there is no list of currencies, it redirects to the main screen and displays an error message.

4. When text is entered into the input field on the currency list screen, the currency list should be filtered. However, this functionality does not work on the backend side.

5. When a currency is selected, the user navigates back to the main screen with parameters containing the fields of the selected currency.

6. The received value is saved on the main screen, and the convertValue function is called.

7. After changing input fields on the main screen the convertValue function is also called to convert one currency to another. Also there is a swap button available on the screen for changing conversion direction.

### Project structure

Despite the project being small, I still decided to create a project structure with scalability in mind, to demonstrate how I would work with a large-scale project.

All the application code is stored in the src folder. I divided logical elements into folders (api, assets, components, data, router, theme, types). Custom components are placed in separate files and reused when necessary to avoid code and style duplication.

### Used libraries

axios - for working with APIs.

@react-navigation/native, @react-navigation/native-stack, @react-navigation/native, react-native-screens - for implementing navigation in the application.
