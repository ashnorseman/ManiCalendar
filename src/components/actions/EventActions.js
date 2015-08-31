/**
 * Created by AshZhang on 15/8/30.
 */


'use strict';


import alt from '../../libs/alt';


export default alt.generateActions(
  'addEvent', 'editEvent', 'deleteEvent',
  'reopenEvent', 'finishEvent', 'changeEventTime'
);