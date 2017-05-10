import React from 'react'
import { FormGroup } from 'react-bootstrap'

const MaskedInput = require('react-maskedinput')

const DateField = props => (
	<FormGroup
		controlId="dateFieldText"
		validationState={(props.meta.touched && props.meta.error) ? 'error' : null}
	>
		{
				props.label &&
				<label htmlFor={props.input.name} className="control-label">{props.label}</label>
			}
		<div>
			<MaskedInput
				id={props.input.name}
				mask="11/11/1111"
				name="card"
				className={`form-control ${(props.meta.touched && props.meta.error) ? 'has-error' : null}`}
				placeholder="JJ/MM/AAAA"
				{...props.input}
				/>
		</div>
		<div className="error">{ props.meta.touched && props.meta.error }</div>
	</FormGroup>
)

export default DateField
