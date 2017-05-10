import React, {Component, PropTypes} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import { TextField, TagsField } from '../../../../components/form/'

class SearchPetForm extends Component {

	componentWillReceiveProps(nextProps) {
		const { ageMin,
			ageMax,
			name,
			species,
			dirty,
			valid} = nextProps
		if (dirty && valid &&
			(ageMin !== this.props.ageMin ||
			ageMax !== this.props.ageMax ||
			name !== this.props.name ||
			species !== this.props.species)) {
			this.props.submit()
		}
	}

	render() {
		const { handleSubmit, speciesList, submit, initialValues } = this.props

		const speciesOptions = speciesList && speciesList.map(s => ({label: s, value: s}))
		return (
			<form onSubmit={handleSubmit}>
				<fieldset>
					<div className="row">
						<div className="col-md-4">
							<Field name="name" label="Nom" maxLength={250} component={TextField} />
						</div>
						<div className="col-md-2">
							<Field name="ageMin" label="Age minimum" maxLength={250} component={TextField} />
						</div>
						<div className="col-md-2">
							<Field name="ageMax" label="Age maximum" maxLength={250} component={TextField} />
						</div>
						<div className="col-md-4">
							<Field name="species" label="Espèces" component={TagsField} options={speciesOptions} />
						</div>
					</div>
				</fieldset>
			</form>
		)
	}
}

const validate = (values) => {
	const errors = {}
	if (values.ageMin && isNaN(parseInt(values.ageMin))) {
		errors.ageMin = 'Valeur numérique attendue'
	}
	if (values.ageMax && isNaN(parseInt(values.ageMax))) {
		errors.ageMax = 'Valeur numérique attendue'
	}
	return errors
}

const mapStateToProps = (state, props) => {
	const {
		ageMin, ageMax, name, species
	} = formValueSelector(props.form)(state, 'ageMin', 'ageMax', 'name', 'species')
	return {
		ageMin,
		ageMax,
		name,
		species
	}
}

SearchPetForm.propTypes = {
	speciesList: PropTypes.array.isRequired,
	// connect
	species: PropTypes.array,
	age: PropTypes.string,
	name: PropTypes.string,
	// redux-form
	handleSubmit: PropTypes.func,
	submitting: PropTypes.bool,
	valid: PropTypes.bool
}

export default compose(
	reduxForm({
		form: 'SearchPetForm',
		validate
	}),
	connect(mapStateToProps, {

	})
)(SearchPetForm)
