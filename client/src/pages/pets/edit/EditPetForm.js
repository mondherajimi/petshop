import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {SelectField, TextField, DateField} from '../../../components/form/index'
import {Button} from 'react-bootstrap'
import loader from '../../../resources/img/spinner.svg'
import { convertDateFRToDateEN } from '../../../utils/formatUtils'

const validate = (values) => {
	const {
		name,
		birthday
	} = values
	const errors = {}
	if (!name) {
		errors.name = 'Champ obligatoire'
	}
	if (birthday) {
		const birthdayTime = Date.parse(convertDateFRToDateEN(birthday))
		if (isNaN(birthdayTime)) {
			errors.birthday = 'Date incorrecte'
		} else if (birthdayTime > +(new Date()) ) {
			errors.birthday = 'La date de naissance ne peut pas être dans le futur'
		}
	}
	return errors
}

class EditPetForm extends Component {
	render() {
		const {
			species,
			error,
			handleSubmit,
			submitting,
			valid
		} = this.props

		return (
			<form onSubmit={handleSubmit} className="">
				<fieldset>
					{ error &&
						<div className="error">{ error }</div>
					}
					<div className="row">
						<div className="col-md-12">
							<Field name="name" label="Nom" maxLength={250} component={TextField} />
						</div>
						<div className="col-md-6">
							<Field name="species" label="Espèce" component={SelectField}>
								<option value={0}></option>
								{
									species && species.map((s) => (
										<option key={s} value={s}>{s}</option>
									))
								}
							</Field>
						</div>
						<div className="col-md-6">
							<Field name="birthday" label="Date de naissance" component={DateField} />
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-xs-6">
							<Button onClick={this.props.onCancel} block className="btn-second">
									Annuler
							</Button>
						</div>
						<div className="col-xs-6">
							<Button
								bsStyle="primary"
								block
								type="submit"
								disabled={submitting || !valid}
							>
								<span>
									Valider
									<span>
										{ submitting && <img src={loader} width="32px" alt="Loader" role="presentation"/> }
									</span>
								</span>
							</Button>
						</div>
					</div>
				</fieldset>
			</form>
		)
	}
}

EditPetForm.propTypes = {
	species: PropTypes.array,
	onCancel: PropTypes.func,
	// redux-form
	handleSubmit: PropTypes.func,
	submitting: PropTypes.bool,
	valid: PropTypes.bool
}

EditPetForm.defaultProps = {
	submitting: false,
	valid: false
}

export default reduxForm({
	form: 'EditPetForm',
	validate
})(EditPetForm)