# Fundamental React Native

## Description

The `fundamental-react-native` library is a set of **React Native** components based on **SAP Fundamental Styles**.

# API Reference

See Component Documentation for examples and API details.

# Getting Started

## Install

For an existing react application, install `fundamental-react-native`:

```sh
npm install react-native-fundamental
```

This project does not contain fonts and icons - they must be added to your project separately. Download **Font 72** and add fonts to your project.

## Usage
React Native Fundamental uses a centralized theme to provide consistency across all the components.

### Step 1. Import ThemeProvider and theme then wrap your root component.

This step is important. We are passing `theme` as context value that each component will access.

```js
//your root component
import { ThemeProvider, theme } from 'react-native-fundamental';

function App() {
  return (
    <ThemeProvider value={theme}>
      <Root />
    </ThemeProvider>
  );
}
```

### Step 2. Use component.

```js
//inside any file
import { Button } from 'react-native-fundamental';

function HomeScreen() {
  return (
    <Button>
      Press Me
    </Button>
  );
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/iamshadmirza/react-native-fundamental/issues) and contribution [guidelines](CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!
