import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {SubmissionError} from 'redux-form'
import EditPetForm from './EditPetForm'
import PetService from '../../../webservices/pets/PetService'
import {addNotification} from '../../notifier/NotifierActions'
import {addPet} from '../../../webservices/pets/petActions'
import {loadSpecies} from '../../../webservices/species/speciesActions'
import { loadPet } from '../../../webservices/pets/petActions'
import { isLoading, getPet } from '../../../webservices/pets/petSelector'
import loader from '../../../resources/img/spinner.svg'
import {getSpeciesList, isLoadingList as isLoadingSpecies} from '../../../webservices/species/speciesSelector'
import { emitUpdatePet } from '../../../controllers/SocketIOController'

class EditPetContainer extends Component {

	componentWillMount() {
		this.props.loadSpecies()
		// mode edition
		if (this.props.idPet) {
			this.props.loadPet(this.props.idPet)
		}
	}

	handleSubmit = (values) => {
		let petEditPromise = 0
		if (this.props.idPet) {
			// modification
			petEditPromise = PetService.modifyPet(this.props.idPet, values)
		} else {
			// creation
			petEditPromise = PetService.createPet(values)
		}
		return petEditPromise.then((pet) => {
			this.props.addNotification({
				message: (<div className="notification-content">
					{ this.props.idPet ? 'L\'animal a été modifié avec succès' : 'Animal créé avec succès' }
				</div>),
				level: 'success'
			})
			this.props.addPet(pet)
			this.props.onSubmitSuccess(pet._id)
			emitUpdatePet(pet)
		}).catch((e) => {
			if (e.data) {
				throw new SubmissionError(e.data)
			}
			throw new SubmissionError({ _error: 'Une erreur technique s\'est produite' })
		})
	}

	render() {
		const { species, idPet, showTitle, pet, isLoadingPet } = this.props

		if (idPet && isLoadingPet) {
			return (
				<div>
					<img src={loader} alt="Loader" role="presentation" />
				</div>
			)
		}

		if (idPet && !pet) {
			return (<div>
				Animal introuvable
			</div>)
		}

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						{ showTitle &&
						<h1>{ idPet ? `Modification "${pet.name}"` : 'Ajout d\'un animal' }</h1>
						}
						<EditPetForm
							species={species}
							form="EditPetForm"
							onCancel={this.props.onCancel}
							onSubmit={this.handleSubmit}
							initialValues={pet}
						/>
					</div>
				</div>
			</div>
		)
	}
}

EditPetContainer.propTypes = {
	idPet: PropTypes.string,
	onCancel: PropTypes.func,
	showTitle: PropTypes.bool,
	onSubmitSuccess: PropTypes.func,
	addNotification: PropTypes.func,
	addPet: PropTypes.func,
	loadSpecies: PropTypes.func,
	species: PropTypes.array,
	isLoadingSpecies: PropTypes.bool,
}

const mapStateToProps = (state, props) => ({
	species: getSpeciesList(state),
	isLoadingSpecies: isLoadingSpecies(state),
	pet: props.idPet && getPet(props.idPet)(state),
	isLoadingPet: props.idPet && isLoading(props.idPet)(state)
})

export default connect(mapStateToProps, {
	addNotification,
	addPet,
	loadSpecies,
	loadPet
})(EditPetContainer)
