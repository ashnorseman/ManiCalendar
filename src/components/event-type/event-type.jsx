/**
 * Created by AshZhang on 15/9/1.
 */


'use strict';

import './event-type.less';

import React from 'react';


export default class EventTypes extends React.Component {

  render() {
    const eventTypes = this.props.eventTypes;

    return (
      <div className='mani-data-footer'>
        <ul className='mani-event-types'>
          {
            eventTypes.map(function (eventType) {
              return <li className={`mani-event-type type-${eventType.type}`} key={eventType.id}>{eventType.name}</li>
            })
          }
        </ul>
      </div>
    );
  }
};