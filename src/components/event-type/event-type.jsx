/**
 * Created by AshZhang on 15/9/1.
 */


'use strict';

import './event-type.less';

import React from 'react';
import Component from '../../utils/react-store-component';


export default class EventType extends Component {

  render() {
    const eventTypes = this.props.stores.eventTypes.data;

    return (
      <footer className='mani-footer'>
        <ul className='mani-event-types'>
          {
            eventTypes.map(function (eventType) {
              return <li className={`mani-event-type type-${eventType.type}`} key={eventType.id}>{eventType.name}</li>
            })
          }
        </ul>
      </footer>
    );
  }
};