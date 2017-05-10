import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import PetImage from '../../../components/PetImage'
import './PetInformation.less'

const PetInformation = (props) => {
	const { pet } = props

	return (
		<div className="row pet-information">
			<div className="col-md-12">
				<Panel>
					<div className="row">
						<div className="col-xs-4 col-md-2">
							<PetImage species={pet.species} />
						</div>
						<div className="col-xs-8 col-md-10">
							<div className="row">
								{ /* NAME */ }
								<div className="col-xs-12 col-md-6">
									<div className="row">
										<div className="col-xs-4">
											<label>Nom</label>
										</div>
										<div className="col-xs-8">
											{pet.name ? pet.name : '-'}
										</div>
									</div>
								</div>
								{ /* SPECIES */ }
								<div className="col-xs-12 col-md-6">
									<div className="row">
										<div className="col-xs-4">
											<label>Espèce</label>
										</div>
										<div className="col-xs-8">
											{pet.species ? pet.species : '-'}
										</div>
									</div>
								</div>
								<div className="col-xs-12 col-md-6">
									<div className="row">
										<div className="col-xs-4">
											<label>Date de naissance</label>
										</div>
										<div className="col-xs-8">
											{pet.birthday ? pet.birthday : '-'}
										</div>
									</div>
								</div>
								{ /* Age */ }
								<div className="col-xs-12 col-md-6">
									<div className="row">
										<div className="col-xs-4">
											<label>Age</label>
										</div>
										<div className="col-xs-8">
											{pet.age ? pet.age : '-'}
										</div>
									</div>
								</div>
								<div className="col-xs-12 col-md-6">
									<div className="row">
										<div className="col-xs-4">
											<label>Date d'ajout</label>
										</div>
										<div className="col-xs-8">
											{pet.createdDate ? pet.createdDate : '-'}
										</div>
									</div>
								</div>
								<div className="col-xs-12 col-md-6">
									<div className="row">
										<div className="col-xs-4">
											<label>Dernière mise à jour</label>
										</div>
										<div className="col-xs-8">
											{pet.updatedDate ? pet.updatedDate : '-'}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Panel>
			</div>
		</div>
	)
}

PetInformation.propTypes = {
	pet: PropTypes.object
}

export default PetInformation