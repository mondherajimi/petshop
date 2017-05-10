import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Collapse, Panel, Glyphicon, Button} from 'react-bootstrap'
import SearchPetForm from './SearchPetForm'
import * as actions from './searchPetActions'
import { getShowFilter, getSearchPetFilter } from './searchPetSelector'
import './SearchPetContainer.less'

class SearchPetContainer extends Component {
	handleSubmit = (values) => {
		this.props.updateSearchFilter(values)
	}

	render() {
		const { species, showFilter, filters } = this.props

		const hasFilters = !!filters.name || !!filters.ageMin || !!filters.ageMax || (filters.species && filters.species.length !== 0)
		return (
			<div className="row search-pet-container">
				<div className="col-md-12 vertical-align">
					<Button
						className="collapse-search-button btn-third"
						onClick={() => this.props.setShowFilter(!showFilter)}
					>
						<div className={`${hasFilters && 'active'} search-icon-container float-left`}><Glyphicon glyph='search' /></div>
						<div className="text-container float-left">Rechercher</div>
						<div className="arrow-container float-left"><Glyphicon glyph={showFilter ? 'chevron-down' : 'chevron-right' } /></div>
					</Button>
				</div>
				<div className="col-md-12">
					<Collapse in={showFilter}>
						<Panel>
							<SearchPetForm
								speciesList={species}
								form="SearchPetForm"
								initialValues={filters}
								onSubmit={this.handleSubmit} />
						</Panel>
					</Collapse>
				</div>
			</div>
		)
	}
}

SearchPetContainer.propTypes = {
	species: PropTypes.array.isRequired,
	// connect
	showFilter: PropTypes.bool,
	updateSearchFilter: PropTypes.func
}

const mapStateToProps = state => ({
	showFilter: getShowFilter(state),
	filters: getSearchPetFilter(state)
})


export default connect(
	mapStateToProps, {
		updateSearchFilter: actions.updateSearchFilter,
		setShowFilter: actions.setShowFilter
	}
) (SearchPetContainer)