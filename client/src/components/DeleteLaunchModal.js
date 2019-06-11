/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import trashIcon from '../icons/trash.png'

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ modal: !this.state.modal })
  }
  onDeleteRecipe = () => {
    this.setState({ modal: false })
    this.props.onDeleteThis()
  }

  render() {
    return (
      <>
        <img src={trashIcon} alt="" onClick={this.toggle} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Invalid Inputs</ModalHeader>
          <ModalBody>
            <h4>Are you sure to delete this?</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.onDeleteRecipe}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModalExample;