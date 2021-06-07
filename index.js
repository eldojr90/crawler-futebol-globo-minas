const { 
    allSchedulesWeek, 
    schedulesToday, 
} = require('./all.schedule.week');

/* 
retorna os dados das trasmissões de futebol 
a partir da data de hoje */
allSchedulesWeek().then(data => console.log(data));

//retorna somente data de hoje 
schedulesToday().then(data => console.log(data));