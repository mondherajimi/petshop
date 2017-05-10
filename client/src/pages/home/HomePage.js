import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12 ">
						<h1>Petshop</h1>
						<div className="row">
							<div className="col-md-12">
								<p>
									Application permettant de gérer un catalogue d'animaux.
								</p>
							</div>
							<div className="col-md-12">
								<label>Auteur</label> Mondher AJIMI
							</div>
							<div className="col-md-12">
								<label>Technologies utilisées</label>
								<ul>
									<li>React</li>
									<li>React-router</li>
									<li>Redux</li>
									<li>Redux-form</li>
									<li>Reselect</li>
									<li>ImmutableJS</li>
									<li>socket.io-client</li>
									<li>React-bootstrap</li>
									<li>Webpack</li>
									<li>Less</li>
									<li>ESlint</li>
								</ul>
							</div>
							<div className="col-md-12">
								<label>Technologies serveur</label>
								<ul>
									<li>NodeJS</li>
									<li>Express</li>
									<li>socket.io</li>
									<li>Mongoose (MongoDB)</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
	{
	}
)(Home)
