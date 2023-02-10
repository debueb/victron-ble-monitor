# victron-ble-monitor

Monitor for Bluetooth Low Energy Advertisements of [Victron Energy](http://victronenergy.com/) devices. Currently tested devices: BMV-712 and SmartSolar MPPT 100/50

![screenshot](https://raw.githubusercontent.com/debueb/victron-ble-monitor/main/screenshot.png "Screenshot")

## prerequisites
- install [victron-ble-bridge](https://github.com/debueb/victron-ble-bridge) on a device that is in bluetooth range of your Victron devices and can run python3

## how to develop
- install [node](https://nodejs.org/en/)
- install dependencies
  - `yarn` or `npm i`
- start app locally
  - `yarn start` or `npm run start`
- if you are firewalled, tunnel your localhost using [ngrok](https://ngrok.com/)
- have victron-ble-bridge send data to localohost

## how to host
- fork this repo
- find a suitable hosting company, like [render.com](http://render.com)
- setup automatic builds using github hooks or build manually
- copy the public URL of the hosted app into [victron-ble-bridge](https://github.com/debueb/victron-ble-bridge) configuration file
