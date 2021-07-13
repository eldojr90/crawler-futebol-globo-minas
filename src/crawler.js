const {
    isLastScheduleOfLastDay,
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
    const lastIndex = $('body').find('.schedule-item-inner').length - 1;
    $('.schedule-item-inner').each((i, item) => {
        const unixTimestamp = $(item).find('.schedule-times').attr('data-start-time');
        const eventDate = new Date(unixTimestamp * 1000);
        const description = $(item).find('.schedule-item-content-soccer').text().trim();

        if (i == 0 || i == lastIndex) {
            let auxDate = new Date(eventDate.getTime());
            auxDate.setDate(auxDate.getDate() - 1);
            let lastDescription = `Referente ao dia ${getDateToString(auxDate)}. Last`;
            schedules.push({
                eventDate,
                description: `${i == lastIndex 
                    && isLastScheduleOfLastDay(eventDate) 
                    ? lastDescription
                    :'First'} Event`,
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
            && schedule.description.match(/^((?!(last)).)*$/i)));

const schedulesToday = () => schedulesBeginToday()
    .then(schedules =>
        schedules.filter((schedule) =>
            schedule.eventDate <= getTodayEnd()));

module.exports = {
    allSchedulesWeek,
    schedulesBeginToday,
    schedulesToday,
}

