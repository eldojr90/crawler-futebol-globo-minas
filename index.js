const { allSchedulesWeek, schedulesToday } = require('./all.schedule.week');

allSchedulesWeek().then(data => console.log(data));

schedulesToday().then(data => console.log(data));