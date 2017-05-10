import React, { Component, PropTypes } from 'react'
import PetContainer from './PetContainer'

class PetPage extends Component {

	render() {
		return (
			<div className="row">
				<div className="col-xs-12">
					{
						this.props.params.petId &&
						<PetContainer
							id={ this.props.params.petId }
						/>
					}
				</div>
			</div>
		)
	}
}

export default PetPage
