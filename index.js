const { 
    allSchedulesWeek, 
    schedulesToday, 
} = require('./src/crawler');

const selected = process.argv[2];

const init = (selected = '0') => {
    selected = Number.parseInt(selected);
    selected !== 1 
    ? allSchedulesWeek().then(data => console.log(data))
    : schedulesToday().then(data => console.log(data));
}

init(selected);
