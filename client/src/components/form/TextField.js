import React, { PropTypes } from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

const TextField = ({
	meta,
	input,
	label,
	hint,
	...others
}) => (
	<div>
		<FormGroup
			controlId="formBasicText"
			validationState={(meta.touched && meta.error) ? 'error' : null}
		>
			{
				label && <ControlLabel>{label}</ControlLabel>
			}
			<FormControl
				{...input}
				placeholder={hint}
				{...others}
			/>
			<div className="error">{ meta.touched && meta.error }</div>

		</FormGroup>
	</div>
)
TextField.propTypes = {
	meta: PropTypes.object,
	input: PropTypes.object,
	//
	label: PropTypes.string,
	hint: PropTypes.string,
	type: PropTypes.string,
	maxLength: PropTypes.number,
	disabled: PropTypes.bool
}

export default TextField
