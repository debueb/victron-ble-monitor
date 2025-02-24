import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import TimeAgo from 'react-timeago';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import DeviceCol from './components/DeviceCol';
import DeviceText from './components/DeviceText';
import Msg from './components/Msg';
import SOCMonitor from './components/SOCMonitor';
import PowerMonitor from './components/PowerMonitor';
import SolarPowerMonitor from './components/SolarPowerMonitor';
import SolarYieldMonitor from './components/SolarYieldMonitor';
import timeLeft from './timeLeft';

class App extends Component {
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
      <div className="App">
        <Msg>{this.state.msg}</Msg>
        <Container fluid>
          <Row style={{'min-height': 100 + 'vh'}}>
            {this.state.devices.map((device) => (   
              <DeviceCol>
                <DeviceText><b>{device.name}</b> - Victron Energy {device.model_name}</DeviceText>
                <DeviceText>Last Update: <TimeAgo date={device.updates[device.updates.length-1].timestamp} /></DeviceText>
                {'device_state' in  device.updates[0] && <DeviceText>Device State: device.updates[0].device_state)</DeviceText>}
                {'input_voltage' in  device.updates[0] && <DeviceText>Input Voltage: device.updates[0].input_voltage)</DeviceText>}
                {'output_voltage' in  device.updates[0] && <DeviceText>Output Voltage: device.updates[0].output_voltage)</DeviceText>}
                {'remaining_mins' in  device.updates[0] && <DeviceText>Time Remaining: {timeLeft(device.updates[0].remaining_mins)}</DeviceText>}
                {'charge_state' in device.updates[0] && <DeviceText>Charging State: {device.updates[0].charge_state}</DeviceText>}
                {'soc' in device.updates[0] && <SOCMonitor data={device.updates}/>}
                {'power' in device.updates[0] && <PowerMonitor data={device.updates}/>}
                {'solar_power' in device.updates[0] && <SolarPowerMonitor data={device.updates}/>}
                {'yield_today' in device.updates[0] && <SolarYieldMonitor data={device.updates}/>}
              </DeviceCol>
            ))}
          </Row>
       </Container>
      </div>
    );
  }
}

export default App;
