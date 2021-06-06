const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const numberToDateString = number => {
    if(number < 10) number = `0${number}`;
    return number;
}
const todayIni = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0);

const todayEnd = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59);

const timeString = date =>{
    const day = numberToDateString(date.getDate());
    const month = numberToDateString(date.getMonth());
    const fyear = date.getFullYear();
    const h = numberToDateString(date.getHours());
    const m = numberToDateString(date.getMinutes());
    
    return `${day}/${month}/${fyear} - ${h}:${m}`};

const allSchedulesWeek = () => requestPromise({
    uri: 'https://redeglobo.globo.com/globominas/programacao/',
    transform: body => cheerio.load(body),
}).then($ => {
    let schedules = [];
    $('.schedule-item-inner').each((i, item) => {
        const scheduleTimestamp = $(item).find('.schedule-times').attr('data-start-time');
        const label = $(item).find('.schedule-item-content-soccer').text().trim();
        const date = new Date(scheduleTimestamp * 1000);
        const scheduleTimeString = timeString(date);

        if (label !== '') {
            schedules.push({ date, scheduleTimeString, label });
        }
    });
    return schedules;
}).catch(err => console.log(err));

const schedulesToday = () => allSchedulesWeek().then(schedules =>
    schedules.filter(schedule => schedule.date >= todayIni() && schedule.date <= todayEnd()));

module.exports = {
    allSchedulesWeek,
    schedulesToday,
}

