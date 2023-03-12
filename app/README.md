# Frontend

A sample application.
Based on React-Native, NativeBase v3 KitchenSink, Primereact and other packages.

## Development

To start developing you can edit and adapt the example project at: ```Frontend/src/project/```. There you will have the folders ```helper``` and ```screens```. 
All files in ```Kitchenhelper``` will be outsourced in the future in an own package.
More informtaion will be added in the future.

## Running it on Web / QuickStart

You can start the development by simply running:

```
npm run web
```

## Running it on Android

You can start the development by simply running:

```
npm run android
```

## Running it on iOS or Web

You will need a MacOS and XCode installed. Then you can start the development by simply running:

```
npm run ios
```


## Troubleshooting

- It looks like you're trying to use TypeScript but don't have the required
    - https://stackoverflow.com/questions/73182941/unable-to-use-typescript-with-expo-it-looks-like-youre-trying-to-use-typescr
    - Fix:
      - `npm install expo-cli`
      - `npm install --save-dev @types/react@^16.9.55`
