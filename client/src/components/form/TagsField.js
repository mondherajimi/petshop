import React, {Component, PropTypes} from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { FormGroup, ControlLabel } from 'react-bootstrap'

class TagsField extends Component {
	static propTypes = {

	}

	onChange = (value) => {
		const values = value && value.map(item => item.value)
		this.props.input.onChange(values)
	}

	render () {
		const { options, meta, label, input } = this.props

		const selectedItems = input.value && input.value.map(v => ({
			label: v,
			value: v
		}))

		return (
			<div>
				<FormGroup
					controlId="formBasicText"
					validationState={(meta.touched && meta.error) ? 'error' : null}
				>
					{
						label && <ControlLabel>{label}</ControlLabel>
					}
					<Select
						value={selectedItems}
						options={options}
						onChange={this.onChange}
						multi={true}
					/>
					<div className="error">{ meta.touched && meta.error }</div>
				</FormGroup>
			</div>
		)
	}
}

export default TagsField