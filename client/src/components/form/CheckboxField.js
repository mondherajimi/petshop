import React from 'react'
import { Checkbox } from 'react-toolbox/lib/checkbox'

const CheckboxField = props => (
	<div>
		<Checkbox
			checked={!!props.input.value}
			{...props.input}
			label={props.label}
		/>
		<p className="error">
			{ props.meta.touched && props.meta.error }
		</p>
	</div>
)

export default CheckboxField
