/**
 * Created by AshZhang on 15/8/30.
 */


'use strict';

import './events.less';

import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';


const eventSource = {
  beginDrag(props) {
    return props;
  }
};


@DragSource('event', eventSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Event extends React.Component {

  render() {
    const {connectDragSource} = this.props;
    const finished = this.props.status === '已完成';

    return connectDragSource(
      <div className={`mani-event-clock type-${this.props.eventType}`}>
        <span className='mani-event-clock-status'>{this.props.status}</span>

        <div className='mani-event-clock-opr'>
          <span className='mani-event-clock-delete' onClick={this.props.onDelete}>删除</span>
          {finished ? <span onClick={this.props.onReopen}>重新打开</span> : <span onClick={this.props.onFinish}>完成</span>}
        </div>

        <span className='mani-event-clock-name'>{this.props.eventName}</span>
      </div>
    );
  }
}