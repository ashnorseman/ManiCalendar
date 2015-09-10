/**
 * Created by AshZhang on 15/8/30.
 */


'use strict';

import React from 'react/addons';
import { DropTarget } from 'react-dnd';

import dateUtils from '../../utils/dateUtils';
import Event from './event.jsx';

const CSSTransitionGroup = React.addons.CSSTransitionGroup;

const periodTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    sourceProps.onDrop(targetProps.time);
  }
};


@DropTarget('event', periodTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class HalfHour extends React.Component {

  constructor(props) {
    super(props);

    this.enterAddMode = this.enterAddMode.bind(this);
    this.recordEventName = this.recordEventName.bind(this);
    this.recordEventType = this.recordEventType.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.reopenEvent = this.reopenEvent.bind(this);
    this.finishEvent = this.finishEvent.bind(this);
    this.dropEvent = this.dropEvent.bind(this);

    this.state = {
      editing: false
    };
  }

  render() {
    const { connectDropTarget, events } = this.props;

    return connectDropTarget(
      <CSSTransitionGroup component='td' data-time={this.props.time} onClick={this.enterAddMode}
                          transitionName='event' transitionAppear={true} transitionLeave={false}>
        {
          this.state.editing
            ? this.renderEdit()
            : events.map((event, i) => {
                return (
                  <Event key={`event-${i}`} {...event}
                         onDelete={this.deleteEvent.bind(null, event.id)}
                         onReopen={this.reopenEvent.bind(null, event)}
                         onDrop={this.dropEvent.bind(null, event)}
                         onFinish={this.finishEvent.bind(null, event)} />
                );
              })
        }
      </CSSTransitionGroup>
    );
  }

  renderEdit() {
    const event = this.props.events && this.props.events[0];
    const eventTypes = this.props.eventTypes;

    return (
      <div className='mani-event-edit'>
        <input className='mani-event-input' autoFocus placeholder='事件名称' defaultValue={event ? event.eventName: null} onChange={this.recordEventName} />
        <select className='mani-event-select' defaultValue={event ? event.eventType : '1'} onChange={this.recordEventType}>
          {
            eventTypes.map(function (eventType) {
              return <option value={eventType.type} key={eventType.id}>{eventType.name}</option>
            })
          }
        </select>
        <button type='button' className='btn btn-normal' onClick={this.finishEdit}>确定</button>
      </div>
    );
  }

  enterAddMode() {

    this.setState({
      editing: true
    });
  }

  recordEventName(e) {
    this._eventName = e.target.value;
  }

  recordEventType(e) {
    this._eventType = e.target.value;
  }

  finishEdit(e) {
    const event = this.props.events && this.props.events[0];

    if (!event) {

      // Add a new event
      if (this._eventName) {
        this.props.eventStore.addEvent({
          startTime: this.props.time,
          eventName: this._eventName,
          eventType: this._eventType || '1'
        });
      }
    } else {

      // Edit the current event
      this.props.eventStore.editEvent({
        id: event.id,
        eventName: this._eventName,
        eventType: this._eventType
      });
    }

    this.setState({
      editing: false
    });

    e.stopPropagation();
  }

  deleteEvent(id, e) {
    if (confirm('真的要删我嘛…')) {
      this.props.eventStore.deleteEvent(id);
    }

    e.stopPropagation();
  }

  reopenEvent(event, e) {
    this.props.eventStore.reopenEvent(event);
    e.stopPropagation();
  }

  finishEvent(event, e) {
    this.props.eventStore.finishEvent(event);
    e.stopPropagation();
  }

  dropEvent(event, time) {
    this.props.eventStore.changeEventTime({event, time});
  }
}