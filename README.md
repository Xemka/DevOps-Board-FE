# DevOps Board

DevOps Board is an [electron](https://www.electronjs.org)-application for monitoring the state of sites hosted on your servers.\
This repository is presented 'Front-End' part - tray application, showing a list of active servers and sites running on them.

## Installation

Use the [npm](https://www.npmjs.com) to install DevOps Board.

```bash
npm install
```

## Launching

```bash
npm start
```
## Usage

The application receives from the server a list of sites, their state and the name of the server on which they are located, in the form of a json file. After that, it displays information in the application window, which is available in the tray.

Example of part of json-file:
```json
{
    "serverName": "Centaur",
    "siteName": "codex.so",
    "isActive": true
}
```

## Illustraions 
Application appearance:

![application](https://i.imgur.com/gjWkjJ5.png)

The appearance of the tray icon:

![tray-icon](https://i.imgur.com/dyMA5x0.png)
