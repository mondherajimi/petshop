import React, {Component, PropTypes} from 'react'
import EditPetContainer from './EditPetContainer'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class EditPetPage extends Component {

	onSubmitSuccess = (petId) => {
		this.props.push(`/pets/${petId}`)
	}

	render() {
		return (
			<div className="row">
				<div className="col-12">
					{
						<EditPetContainer
							showTitle
							idPet={this.props.params.petId}
							onSubmitSuccess={this.onSubmitSuccess}
							onCancel={() => {
								if (this.props.params.petId) {
									this.props.push(`/pets/${this.props.params.petId}`)
								} else {
									this.props.push('/pets')
								}
							}} />
				}
				</div>
			</div>
		)
	}
}

EditPetPage.propTypes = {
	params: PropTypes.shape({
		idPet: PropTypes.string
	}),
	push: PropTypes.func
}


const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {
	push
})(EditPetPage)
