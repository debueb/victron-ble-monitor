import React, { PureComponent } from 'react';
import Col from 'react-bootstrap/Col';

export default class DeviceCol extends PureComponent {
  
  render() {

    const { children } = this.props;

    return (
      <>
        <style type="text/css">
          {`
            .device-col {
              border-right: 1px solid #d5d5d5;
              border-bottom: 1px solid #d5d5d5;
              padding: 1em;
            }
          `}
        </style>
        <Col xs={12} className="device-col">{children}</Col>
      </>
    );
  }
}
