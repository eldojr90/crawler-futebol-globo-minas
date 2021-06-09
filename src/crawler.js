const {
    getDayOfWeek,
    getTodayIni,
    getTodayEnd,
    getDateToString,
    getDateToTimeString } = require('./utils');
const requestPromise = require('request-promise');
const cheerio = require('cheerio');

const allSchedulesWeek = () => requestPromise({
    uri: 'https://redeglobo.globo.com/globominas/programacao/',
    transform: body => cheerio.load(body),
}).then($ => {
    let schedules = [];
    const schedulesLength = $('body').find('.schedule-item-inner').length;
    $('.schedule-item-inner').each((i, item) => {
        const unixTimestamp = $(item).find('.schedule-times').attr('data-start-time');
        const eventDate = new Date(unixTimestamp * 1000);
        const description = $(item).find('.schedule-item-content-soccer').text().trim();

        if (i == 0 || i == (schedulesLength - 1)) {
            schedules.push({
                eventDate,
                description: `${i == 0 ? 'First' : 'Last'} Event`,
                dateString: getDateToString(eventDate),
                timeString: getDateToTimeString(eventDate),
                dayOfWeek: getDayOfWeek(eventDate.getDay()),
            });
        }

        if (description !== '') {
            schedules.push({
                eventDate,
                description,
                dateString: getDateToString(eventDate),
                timeString: getDateToTimeString(eventDate),
                dayOfWeek: getDayOfWeek(eventDate.getDay()),
            });
        }
    });

    return schedules;
}).catch(err => console.log(err));

const schedulesBeginToday = () => allSchedulesWeek()
    .then(schedules =>
        schedules.filter((schedule) =>
            schedule.eventDate >= getTodayIni()
            && schedule.description !== 'Last Event'));

const schedulesToday = () => schedulesBeginToday()
    .then(schedules =>
        schedules.filter((schedule) =>
            schedule.eventDate <= getTodayEnd()));

module.exports = {
    allSchedulesWeek,
    schedulesBeginToday,
    schedulesToday,
}

