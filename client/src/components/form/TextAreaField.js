import React from 'react'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

const TextAreaField = props => (
	<div>
		<FormGroup>
			{
				props.label &&
				<ControlLabel>{props.label}</ControlLabel>
			}
			<FormControl
				{...props.input}
				componentClass="textarea"
				placeholder={props.hint}
				maxLength={props.maxLength}
				rows={props.rows}
				cols={props.cols}
			/>
			<div className="error">{ props.meta.touched && props.meta.error }</div>
		</FormGroup>
	</div>
)

export default TextAreaField
