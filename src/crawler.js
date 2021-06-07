const{
    daysOfWeek,
    numberToDateString,
    getTodayIni,
    getTodayEnd,
    getDateToString,
    getDateToTimeString} = require('./utils');

const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const allSchedulesWeek = () => requestPromise({
    uri: 'https://redeglobo.globo.com/globominas/programacao/',
    transform: body => cheerio.load(body),
}).then($ => {
        let schedules = [];
        $('.schedule-item-inner').each((i, item) => {
            const unixTimestamp = $(item).find('.schedule-times').attr('data-start-time');
            const eventDate = new Date(unixTimestamp * 1000);
            const description = $(item).find('.schedule-item-content-soccer').text().trim();
            const dateString = getDateToString(eventDate);
            const timeString = getDateToTimeString(eventDate);
            const dayOfWeek = daysOfWeek[eventDate.getDay()];

            if (description !== '' && (eventDate > getTodayIni())) {
                schedules.push({
                    eventDate,
                    description,
                    dateString,
                    timeString,
                    dayOfWeek,
                });
            }
        });
        
        return schedules;
}).catch(err => console.log(err));

const schedulesToday = () => allSchedulesWeek()
    .then(schedules =>
            schedules.filter((schedule) =>
            schedule.eventDate >= getTodayIni() 
            && schedule.eventDate <= getTodayEnd()));

module.exports = {
    allSchedulesWeek,
    schedulesToday,
}

