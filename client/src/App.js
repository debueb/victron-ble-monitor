import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import TimeAgo from 'react-timeago';
import './App.css';
import SOCMonitor from './components/SOCMonitor';
import ConsumptionMonitor from './components/ConsumptionMonitor';
import SolarPowerMonitor from './components/SolarPowerMonitor';
import SolarYieldMonitor from './components/SolarYieldMonitor';
import timeLeft from './timeLeft';

class App extends Component {
  // Initialize state
  state = {
    msg: "No data available.",
    devices: [],
  }

  constructor(){
    super()
    this.updateDevices.bind(this);
  }

  // Fetch data after first mount
  componentDidMount() {
    const socket = socketIOClient();
    socket.on("DevicesUpdate", this.updateDevices);

    fetch('/api/devices').then(response => {
      if (response.status !== 200) {
        this.setState({ 
          msg: `Server returned response status: ${response.status}`
        });
        return;
      }

      response.json().then(this.updateDevices);
    }).catch((err) => {
      console.log(err);
      this.setState({ 
        msg: err
      });
    })
  }

  updateDevices = (devices) => {
    if (devices && devices.length > 0 ){
      this.setState({ devices, msg: null });
    }
  }

  render() {
    return (
      <div>
        <div className="App">
            <div class="Devices">
              {this.state.devices.map((device) => (
                <div class="Device" key={device.address}>
                  <div class="Device-Text"><b>{device.name}</b> - Victron Energy {device.data.model_name}</div>
                  <div class="Device-Text">Last Update: <TimeAgo date={device.updates[device.updates.length-1].timestamp} /></div>
                  {'remaining_mins' in  device.data && <div class="Device-Text">Time Remaining: {timeLeft(device.data.remaining_mins)}</div>}
                  {'charge_state' in device.data && <div class="Device-Text">Charging State: {device.data.charge_state}</div>}
                  {'soc' in device.data && <SOCMonitor data={device.updates}/>}
                  {'consumption' in device.data && <ConsumptionMonitor data={device.updates}/>}
                  {'solar_power' in device.data && <SolarPowerMonitor data={device.updates}/>}
                  {'yield_today' in device.data && <SolarYieldMonitor data={device.updates}/>}
                </div>
              ))}
            </div>
          <div class="msg">{this.state.msg}</div>
        </div>
      </div>
    );
  }
}

export default App;
