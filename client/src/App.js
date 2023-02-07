import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import TimeAgo from 'react-timeago';
import './App.css';
import BatteryMonitor from './BatteryMonitor';

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
                  {device.data.soc && 
                    <>
                      <div class="Device-Text">Last SoC (%): {device.data.soc}</div>
                      <BatteryMonitor data={device.updates}/>
                    </>
                  }
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
