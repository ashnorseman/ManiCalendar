/**
 * Created by AshZhang on 15/8/30.
 */


'use strict';

import React from 'react';

import dateUtils from '../utils/dateUtils';
import Event from './event.jsx';


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

    this.state = {
      editing: false
    };
  }

  render() {
    const events = this.props.events;

    return (
      <td data-time={this.props.time} onClick={this.enterAddMode}>
        {
          this.state.editing
            ? this.renderEdit()
            : events.map((event, i) => {
                return <Event key={`event-${i}`} {...event}
                              onDelete={this.deleteEvent.bind(null, event.id)}
                              onReopen={this.reopenEvent.bind(null, event.id)}
                              onFinish={this.finishEvent.bind(null, event.id)} />;
              })
        }
      </td>
    );
  }

  renderEdit() {
    const event = this.props.events && this.props.events[0];

    return (
      <div className='mani-event-edit'>
        <input className='mani-event-input' autoFocus placeholder='事件名称' defaultValue={event ? event.eventName: null} onChange={this.recordEventName} />
        <select className='mani-event-select' defaultValue={event ? event.eventType : '1'} onChange={this.recordEventType}>
          <option value='1'>工作</option>
          <option value='2'>学习</option>
          <option value='3'>健身</option>
          <option value='4'>娱乐</option>
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
        this.props.onAddEvent(this._eventName, this._eventType || '1');
      }
    } else {

      // Edit the current event
      this.props.onEditEvent(event.id, this._eventName, this._eventType);
    }

    this.setState({
      editing: false
    });

    e.stopPropagation();
  }

  deleteEvent(id, e) {
    if (confirm('真的要删我嘛…')) {
      this.props.onDeleteEvent(id);
    }

    e.stopPropagation();
  }

  reopenEvent(id, e) {
    this.props.onReopenEvent(id);
    e.stopPropagation();
  }

  finishEvent(id, e) {
    this.props.onFinishEvent(id);
    e.stopPropagation();
  }
}