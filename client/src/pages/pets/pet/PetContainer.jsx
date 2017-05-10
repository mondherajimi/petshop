import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import loader from '../../../resources/img/spinner.svg'
import { Button, Glyphicon } from 'react-bootstrap'
import { push } from 'react-router-redux'
import ConfirmModal from '../../../components/ConfirmModal'
import * as actions from '../../../webservices/pets/petActions'
import { isLoading, getPetWithMetadata } from '../../../webservices/pets/petSelector'
import PetService from '../../../webservices/pets/PetService'
import {addNotification} from '../../notifier/NotifierActions'
import PetInformation from './PetInformation'
import { emitRemovePet } from '../../../controllers/SocketIOController'
import {Pager} from 'react-bootstrap'

class PetContainer extends Component {

	componentWillMount() {
		this.props.loadPet(this.props.id)
		this.state = {
			openConfirm: false
		}
	}

	onDelete = () => {
		return PetService.deletePet(this.props.id).then(() => {
			this.props.addNotification({
				message: <div className="notification-content">L'animal a été supprimé</div>,
				level: 'success'
			})
			emitRemovePet(this.props.pet)
			this.props.removePet(this.props.id)
			this.props.push('/pets')
		}).catch((e) => {
			this.props.addNotification({
				message: <div className="notification-content">Erreur lors de la suppression de l'animal</div>,
				level: 'error'
			})
		})
	}

	render() {
		const { loading, pet } = this.props
		if (loading) {
			return (
				<div>
					<img src={loader} alt="Loader" role="presentation" />
				</div>
			)
		}
		if (!pet) {
			return (
				<div>
					<div className="row">
						<div className="col-12">
							Animal introuvable
						</div>
					</div>
				</div>
			)
		}

		return (
			<div>
				<div className="row vertical-align">
					<div className="col-xs-12">
						<div className="vertical-align">
							<div className="float-left">
								<Pager className="previous-btn-container">
									<Pager.Item previous href="#" onClick={() => this.props.push('/pets')}>
										<Glyphicon glyph="chevron-left" />
									</Pager.Item>
								</Pager>
							</div>
							<div className="float-left">
								<h1>{pet.name}</h1>
							</div>
						</div>
					</div>
					<div className="float-right">
						<Button block onClick={() => {
							this.setState({ openConfirm: true })
						}}>
							<Glyphicon glyph="remove" /> Relacher
						</Button>
						<ConfirmModal
							open={this.state.openConfirm}
							title={ `Relacher l'animal` }
							content={`Etes vous sûr de vouloir retirer l'animal "${pet.name}" du catalogue ?`}
							onClose={() => { this.setState({ openConfirm: !this.state.openConfirm}) }}
							onConfirm={ this.onDelete } />
					</div>
					<div className="float-right">
						<Button block onClick={() => {
							this.props.push(`/pets/edit/${pet._id}`)
						}}>
							<Glyphicon glyph="edit" /> Modifier
						</Button>
					</div>
				</div>
				<PetInformation pet={pet} />
			</div>
		)
	}
}

PetContainer.PropTypes = {
	loading: PropTypes.bool,
	pet: PropTypes.object,
	id: PropTypes.string,
}

const mapStateToProps = (state, props) => ({
	loading: isLoading(props.id)(state),
	pet: getPetWithMetadata(props.id)(state),
})

export default connect(
	mapStateToProps,
	{
		push,
		addNotification,
		loadPet: actions.loadPet,
		removePet: actions.removePet,
	}
)(PetContainer)
