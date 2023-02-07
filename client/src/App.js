import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import TimeAgo from 'react-timeago';
import './App.css';

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
    console.log(devices);
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
                <div key={device.address}>
                  <div><b>{device.name}</b> - Victron Energy {device.data.model_name}</div>
                  <div>{device.data.soc}</div>
                  <div>{device.updates.length}</div>
                  {/* <div>{time ? <TimeAgo date={time}/> : 'unknown'}</div> */}
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
