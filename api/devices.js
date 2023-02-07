const express = require("express");
const router = express.Router();

const MAX_DEVICE_HISTORY_SIZE = 10;

const devices = (io) => {

  let deviceMap = new Map();

  router.get('/api/devices', (req, res) => {
    res.json(deviceMap)
  });

  router.post('/api/device', (req, res) => {
    const device = req.body;
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
   
    deviceArray = Array.from(deviceMap.values());
    deviceArray.sort((a, b) => a.name.localeCompare(b.name))

    io.emit('DevicesUpdate', deviceArray);
    res.status(200).end()
  });
  return router;
}
module.exports = devices;