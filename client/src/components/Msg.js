import React, { PureComponent } from 'react';
import Alert from 'react-bootstrap/Alert';

export default class Msg extends PureComponent {
  
  render() {

    const { children } = this.props;

    return (
      <>
        <style type="text/css">
          {`
            .alert-msg:empty {
              display: none;
            }
          `}
        </style>
        <Alert variant="primary alert-msg" transition={false}>{children}</Alert>
      </>
    );
  }
}
