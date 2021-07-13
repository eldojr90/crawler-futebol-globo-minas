const { 
    allSchedulesWeek, 
    schedulesBeginToday,
    schedulesToday, 
} = require('./src/crawler');

const selected = process.argv[2];

const init = (selected = '99') => {
    selected = Number.parseInt(selected);
    selected !== 1 
    switch(selected){
        case 0:
            schedulesBeginToday().then(data => console.log(data));
            break;
        case 1:
            schedulesToday().then(data => console.log(data));
            break;
        default:
            allSchedulesWeek().then(data => console.log(data));

    }
}

init(selected);
