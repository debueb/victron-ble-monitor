const express = require("express");
const router = express.Router();

const MAX_DEVICE_HISTORY_SIZE = 100;

const devices = (io) => {

  let deviceMap = new Map();

  const sortAndJsonize = () => {
    deviceArray = Array.from(deviceMap.values());
    return deviceArray.sort((a, b) => a.name.localeCompare(b.name))
  }

  router.get('/api/devices', (req, res) => {
    res.json(sortAndJsonize())
  });

  router.post('/api/devices', (req, res) => {
    const devices = req.body;
    console.log(devices);
    for (let device in devices) {
      let updates = [];
      if (deviceMap.has(device.address)){
        updates = deviceMap.get(device.address).updates;
      }
      updates.push(device.data);
      if (updates.length>MAX_DEVICE_HISTORY_SIZE){
        updates.shift();
      }
      device.updates = updates;
      deviceMap.set(device.address, device);
    }
    console.log(deviceMap);
    io.emit('DevicesUpdate', sortAndJsonize());
    res.status(200).end()
  });
  return router;
}
module.exports = devices;