import React, { Component } from 'react'
import { types } from './NotifierActions'

export default function () {
	const initialState = {}
	return (state = initialState, action = {}) => {
		switch (action.type) {

			case types.ADD:
				{
					if (action.notification) {
						const msg = action.notification.message
						return {
							...state,
							notification: {
								children: (<div>{msg}</div>),
								level: action.notification.level ? action.notification.level : 'success',
								position: action.notification.position ? action.notification.position : 'tc',
								autoDismiss: action.notification.autoDismiss || action.notification.autoDismiss === 0 ? action.notification.autoDismiss : 5,
								onlineChanged: false
							}
						}
					}
					return state
				}
			default:
				{
					return state
				}

		}
	}
}
