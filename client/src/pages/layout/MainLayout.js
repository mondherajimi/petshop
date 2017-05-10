import React, { Component, PropTypes } from 'react'
import HeaderMenu from './headerMenu'
import NotifierComponent from '../notifier/NotifierComponent'

class MainLayout extends Component {
	render() {
		return (
			<div>
				<NotifierComponent />
				<HeaderMenu location={this.props.location} />
				<div className="container main">
					{this.props.children}
				</div>
			</div>
		)
	}
}

MainLayout.propTypes = {
	children: PropTypes.element.isRequired,
	location: PropTypes.object
}

export default MainLayout
