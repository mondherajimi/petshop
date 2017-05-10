import React, {Component, PropTypes} from 'react'
import EditPetContainer from './EditPetContainer'
import {Modal} from 'react-bootstrap'

class EditPetPopin extends Component {

	render() {
		return (
			<Modal show={this.props.open} onHide={this.props.onClose} bsSize="large">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-lg">Ajout d'un animal</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditPetContainer onSubmitSuccess={this.props.onClose} onCancel={this.props.onClose} />
				</Modal.Body>
			</Modal>
		)
	}
}

EditPetPopin.propTypes = {
	open: PropTypes.bool,
	onClose: PropTypes.func
}

export default EditPetPopin
