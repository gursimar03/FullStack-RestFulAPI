import React from 'react';

class Modal extends React.Component {
  render() {
    return (
      <div className="delete-Modal">
          <p>
            {this.props.modalContent}
          </p>
        <button className="modal-close" onClick={this.props.closeModal}></button>
      </div>
    );
  }
}

export default Modal;