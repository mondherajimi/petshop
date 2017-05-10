import React, {Component, PropTypes} from 'react'
import '../resources/css/pets.less'

const PetImage = (props) => {
	const { species } = props

	const spriteName = species && species.toLowerCase()
	return (
		<div className="petImage">
			<i className={`sprite sprite-${spriteName}`}></i>
		</div>
	)
}

export default PetImage
