import React, { PureComponent } from 'react';
import Alert from 'react-bootstrap/Alert';

export default class DeviceText extends PureComponent {
  
  render() {

    const { children } = this.props;

    return (
      <>
        <style type="text/css">
          {`
            .device-text {
              text-align: left;
              padding-left: 30px;
            }
          `}
        </style>
        <div class="device-text">{children}</div>
      </>
    );
  }
}
