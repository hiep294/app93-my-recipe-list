/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      errors: this.props.errors
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.onResetErrors()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Invalid Inputs</ModalHeader>
          <ModalBody>
            {this.state.errors.map((err, index) => {
              return <h4 key={index}>{err}</h4>
            })}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;