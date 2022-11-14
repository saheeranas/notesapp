<!--
  Title: Notes App
  Description: An offline first notes app
  Author: saheeranas
  -->

# Notes App

An open souce, offline first note taking app.

<kbd>
  <img src="docs/notes-app.webp?raw=true"> 
</kbd>

## Features

- Offline first
- Sync to Google Drive (Optional)
- Privacy (Do not use any remote server to store data)

## Dependencies

- React Native
- Mobx State Tree (MST)
- Realm
- UI Kitten
- React Navigation v6

## Project Installation

Clone this repo

```
git clone https://github.com/saheeranas/notesapp.git
```

Open project folder and install dependencies

```
cd diaryapp
yarn
or
npm i
```

Run the project

```
yarn android
or
npm run android
```

or

```
yarn ios
or
npm run ios
```

### For Google Drive Support

1. Rename '.env.template' file to '.env'
2. Get 'OAuth 2.0 Client ID' for Android from Google Cloud Console (For Google Drive and Sign in: @react-native-google-signin/google-signin)
3. Place the Clinet ID in .env file for the key 'ANDROID_CLIENT_ID'

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
