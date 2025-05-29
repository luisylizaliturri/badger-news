# Badger News

A mobile application that delivers customized University of Wisconsin news right to your fingertips.

## Overview

Badger News is a React Native application that allows users to browse and read the latest news from the University of Wisconsin. The app features a clean, intuitive interface that displays news articles in an easy-to-read format and allows users to customize their news feed based on their interests.

<img src="assets/demo-image.png" alt="Badger News Demo" width="300" />

## Features

- Browse latest university news articles
- Read full articles with author information and posting dates
- Customize news feed by selecting preferred topics
- Animated content loading for a polished user experience
- Open original articles in browser

## Tech Stack

- React Native
- Expo
- React Navigation
- Context API for state management
- RESTful API integration

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Expo CLI
- iOS or Android device/emulator

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd badger-news
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm start
```

4. Run on device:
   - Scan the QR code using the Expo Go app ([iOS](https://apps.apple.com/us/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
   - Or run on an emulator using the Expo CLI options

## API Information

The application uses a REST API to fetch news articles:
- Article summaries: `https://cs571api.cs.wisc.edu/rest/s25/hw8/articles`
- Article details: `https://cs571api.cs.wisc.edu/rest/s25/hw8/article?id=ARTICLE_ID`

## Testing

For the best experience, please test the application on a physical device using the Expo Go app or on an emulator. The web version is not supported.
