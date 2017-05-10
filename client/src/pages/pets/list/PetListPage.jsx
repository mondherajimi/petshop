import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../webservices/pets/petActions'
import {isLoadingList} from '../../../webservices/pets/petSelector'
import {getPetListFiltered} from './search/searchPetSelector'
import {getSpeciesList, isLoadingList as isLoadingSpecies} from '../../../webservices/species/speciesSelector'
import {loadSpecies} from '../../../webservices/species/speciesActions'
import loader from '../../../resources/img/spinner.svg'
import {Button, Glyphicon, Table} from 'react-bootstrap'
import EditPetPopin from '../edit/EditPetPopin'
import PetList from './PetList'
import SearchPetContainer from './search/SearchPetContainer'
import './PetList.less'

class PetListPage extends Component {

	constructor() {
		super()
		this.state = {
			editPetPopinOpen: false
		}
	}

	componentWillMount() {
		this.props.loadPets()
		this.props.loadSpecies()
	}

	openEditPetPopin = () => {
		this.setState({
			editPetPopinOpen: true
		})
	}

	closeEditPetPopin = () => {
		this.setState({
			editPetPopinOpen: false
		})
	}

	render() {
		const {loading, pets, species} = this.props

		if (loading) {
			return (
				<div>
					<img src={loader} alt="Loader" role="presentation"/>
				</div>
			)
		}
		return (
			<div>
				<div className="row vertical-align">
					<div className="col-xs-12">
						<h1>Animaux</h1>
					</div>
					<div className="float-right">
						<Button onClick={() => {
							this.openEditPetPopin()
						}}>
							<Glyphicon glyph="plus"/> Ajouter
						</Button>
						<EditPetPopin open={this.state.editPetPopinOpen} onClose={this.closeEditPetPopin}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<SearchPetContainer species={species} />
					</div>
					<div className="col-md-12">
						<PetList pets={pets} />
					</div>
				</div>
			</div>
		)
	}
}
PetListPage.PropTypes = {
	loading: PropTypes.bool,
	pets: PropTypes.array,
	loadPets: PropTypes.func,
	loadSpecies: PropTypes.func,
	species: PropTypes.array,
	isLoadingSpecies: PropTypes.bool,
}

const mapStateToProps = state => ({
	loading: isLoadingList(state),
	pets: getPetListFiltered(state),
	species: getSpeciesList(state),
	isLoadingSpecies: isLoadingSpecies(state),
})

export default connect(
	mapStateToProps,
	{
		loadPets: actions.loadPets,
		loadSpecies: loadSpecies
	}
)(PetListPage)
