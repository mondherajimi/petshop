import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {MenuItem, Nav, Navbar, NavDropdown, NavItem, Glyphicon} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link} from 'react-router'

class HeaderMenu extends Component {

	isMenuItemActive = url => this.props.location && this.props.location.pathname && this.props.location.pathname.indexOf(url) !== -1

	render() {
		const { menuFolders } = this.props

		return (
			<Navbar collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/home" className="navbar-brand">
							Petshop
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<LinkContainer to="/pets" className={this.isMenuItemActive('/pets') && 'active'}>
							<NavItem eventKey="/pets">
								Animaux
							</NavItem>
						</LinkContainer>
						<LinkContainer to="/addPet" className={this.isMenuItemActive('/addPet') && 'active'}>
							<NavItem eventKey="/addPet">
								<Glyphicon glyph="plus" /> Ajouter un animal
							</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

HeaderMenu.propTypes = {
	location: PropTypes.object
}

const mapStateToProps = state => ({
})

export default connect(
	mapStateToProps,
	{

	}
)(HeaderMenu)
