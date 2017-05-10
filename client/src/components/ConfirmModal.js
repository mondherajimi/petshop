import React, {Component, PropTypes} from 'react'
import { Modal, Button } from 'react-bootstrap'

class ConfirmModal extends Component {
	render() {
		const { open, onClose, onConfirm, title, content } = this.props

		return (
			<Modal show={open} onHide={onClose} bsSize="large">
				<Modal.Header closeButton>
					<Modal.Title>{ title }</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{ content }
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={ onClose }>Annuler</Button>
					<Button bsStyle="primary" onClick={() => {
						onConfirm()
						onClose()
					}}>Confirmer</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

ConfirmModal.propTypes = {
	open: PropTypes.bool,
	title: PropTypes.string.isRequired,
	content: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm:PropTypes.func.isRequired,
}

export default ConfirmModal
