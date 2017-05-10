import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

const SelectField = props => (
	<div>
		<FormGroup
			controlId="formControlsSelect"
			validationState={(props.meta.touched && props.meta.error) ? 'error' : null}
		>
			{
				props.label &&
				<ControlLabel>{props.label}</ControlLabel>
			}

			<FormControl
				{...props.input}
				placeholder={props.hint}
				componentClass="select"
			>
				{props.children}
			</FormControl>
			<div className="error">{ props.meta.touched && props.meta.error }</div>

		</FormGroup>
	</div>
)

export default SelectField
