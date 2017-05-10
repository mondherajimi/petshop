import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NotificationSystem from 'react-notification-system'
import '../../resources/css/notifier.css'

class NotifierComponent extends Component {

	componentWillReceiveProps(nextProps) {
		const { notification } = nextProps.notifications

		if (notification) {
			this.notificationSystem.addNotification(notification)
		}
	}

	render() {
		return (
			<div>
				<NotificationSystem
					ref={c => (this.notificationSystem = c)}
					style={false}
					noAnimation={false}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	notifications: state.notifications
})

export default connect(mapStateToProps)(NotifierComponent)