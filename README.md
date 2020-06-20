<h1 align="center">Welcome to Expo Progress 👋</h1>

<p align="center">
  <img align="center" alt="Product: demo" src="https://media.giphy.com/media/ZBzWLLz4sO0MtZ57gb/giphy.gif" />
</p>

<p align="center">
  <a aria-label="made with expo" href="https://github.com/expo" target="_blank">
    <img src="https://img.shields.io/badge/MADE%20WITH%20EXPO-000.svg?style=for-the-badge&logo=expo&labelColor=4630eb&logoWidth=20">
  </a>
  <a href="https://github.com/evanbacon" aria-label="Follow EvanBacon on Github" target="_blank">
    <img alt="Github: evanbacon" src="https://img.shields.io/github/followers/evanbacon.svg?label=Follow&style=for-the-badge&logo=github&logoColor=FFFFFF&labelColor=24292e&logoWidth=20&color=lightgray" target="_blank" />
  </a>
  <a href="/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" target="_blank" />
  </a>
</p>

<p align="center">
  <a aria-label="made with expo" href="https://snack.expo.io/@bacon/expo-progress" target="_blank">
    <b>Try it with Snack 🥳</b>
  </a>
  
</p>
A simple progress bar component that you can use with Expo (iOS, Android, web).

I created this as an alternative to using a bunch of different packages across iOS, Android, and web. This is still natively accelerated using popular packages shipped in the Expo standard library (SVG, and Reanimated).

> This package is a work in progress. I'd like to also add a circular loader and pie loader.

**Replaces**

- [`@react-native-community/progress-bar-android` Android only](https://github.com/react-native-community/progress-bar-android)
- [`@react-native-community/progress-view` iOS only](https://github.com/react-native-community/progress-view)

<p>
  <a href="https://twitter.com/baconbrix" target="_blank">
    <img alt="Twitter: baconbrix" src="https://img.shields.io/twitter/follow/baconbrix.svg?style=for-the-badge&logo=TWITTER&logoColor=FFFFFF&labelColor=00aced&logoWidth=20&color=lightgray" target="_blank" />
  </a>
  <a href="https://twitter.com/expo" target="_blank">
    <img align="right" alt="Twitter: expo" src="https://img.shields.io/twitter/follow/expo.svg?style=for-the-badge&logo=TWITTER&logoColor=FFFFFF&labelColor=00aced&logoWidth=20&color=lightgray" target="_blank" />
  </a>  
</p>

### Features

- Fully TypeScript
- iOS, Android, web
- Native animation
- Optimized for tree-shaking
- Shipped in JS (no JSX)

## Install

```sh
yarn add expo-progress

# or

npm install --save expo-progress
```

Add peer dependencies:

```sh
# Get versions for Expo
expo install react-native-svg react-native-gesture-handler react-native-reanimated react-native-redash

# Get any version
yarn add react-native-svg react-native-gesture-handler react-native-reanimated react-native-redash
```

### Example

```tsx
import * as React from 'react';
import * as Progress from 'expo-progress';

export default function App() {
  return <Progress.Bar isIndeterminate color="blue" />;
}
```

## Docs

### Bar

Here are the prop types (I'm kinda lazy):

```ts
export type ProgressBarProps = {
  /**
   * If the progress bar will show indeterminate progress by looping an animation infinitely.
   *
   * @default false
   */
  isIndeterminate?: boolean;

  /**
   * Duration to animate changes in milliseconds.
   *
   * @default isIndeterminate ? 1000 : 500
   */
  duration?: number;

  /**
   * If the bar should animate between values.
   *
   * @default false
   */
  isAnimated?: boolean;

  /**
   * The progress value (between 0 and 1).
   *
   * @default 0
   */
  progress?: number;

  /**
   * The tint color of the progress bar itself.
   *
   * @default #007aff
   */
  color?: string;

  /**
   * The tint color of the progress bar track.
   *
   * @default transparent
   */
  trackColor?: string;

  /**
   * A stretchable image to display as the progress bar.
   */
  progressImage?: ImageURISource | ImageURISource[];

  /**
   * A stretchable image to display behind the progress bar.
   */
  trackImage?: ImageURISource | ImageURISource[];

  /**
   * Height of the loading indicator.
   *
   * @default 7
   */
  height?: number;

  /**
   * Border radius of the loading indicator.
   *
   * @default height / 2
   */
  borderRadius?: number;

  /**
   * Style for the loading indicator container view.
   */
  style?: ImageBackgroundProps['style'];
};
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/evanbacon/expo-progress/issues).

- Clone the repo
- Install `yarn`
- Build dev `yarn build`
- Start example `expo start`

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 Evan Bacon.<br />
This project is [MIT](/LICENSE) licensed.
