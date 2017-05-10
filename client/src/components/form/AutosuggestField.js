import React from 'react'
import Autosuggest from 'react-autosuggest'

const AutosuggestField = (props) => {
	const inputProps = {
		...props.input,
		onChange: props.onChangeSuggest
	}

	return (
		<div>
			<Autosuggest
				suggestions={props.suggestions}
				onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
				getSuggestionValue={props.getSuggestionValue}
				renderSuggestion={props.renderSuggestion}
				onSuggestionsClearRequested={props.onSuggestionsClearRequested}
				inputProps={inputProps}
			/>
			<div className="error">{ props.meta.touched && props.meta.error }</div>
		</div>
	)
}

export default AutosuggestField
