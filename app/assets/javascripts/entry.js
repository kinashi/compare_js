// require('velocity');
// var axios  = require('axios');
// import {createStore} from 'redux';
import Table from './modules/table';

const $table = $('#js-table');
const table = new Table({
  $table: $table,
  filters: ['data-name'],
  limit: 5
});

// actions
$('#js-filter').on('keyup', (e) => {
  table.filter($('#js-filter').val());
});
