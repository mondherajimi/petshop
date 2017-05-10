import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'
import PetImage from '../../../components/PetImage'
import {push} from 'react-router-redux'
import './PetList.less'

class PetList extends Component {

	render() {
		const { pets, push } = this.props
		return (
			<div>
				<Table responsive hover className="pet-list">
					<thead>
						<tr>
							<th></th>
							<th>Nom</th>
							<th>Espèce</th>
							<th>Age</th>
						</tr>
					</thead>
					<tbody>
						{ pets && pets.map((pet, index) => (
							<tr
								className="pointer"
								key={index}
								onClick={ () => { push(`/pets/${pet._id}`) } }
							>
								<td className="image">
									<PetImage species={pet.species} />
								</td>
								<td className="name">{pet.name}</td>
								<td className="species">{pet.species}</td>
								<td className="age">{pet.age}</td>
							</tr>
							)
						)}
					</tbody>
				</Table>
				{ (!pets || pets.length === 0) &&
					<p>Aucun animal trouvé</p>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
})

PetList.propTypes = {
	pets: PropTypes.array,
	// connect
	push: PropTypes.func,
}


export default connect(
	mapStateToProps,
	{ push }
)(PetList)
