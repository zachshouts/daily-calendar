

$(function () {
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    const currentHour = dayjs().hour();
    const currentDate = dayjs().format('dddd, MMMM D YYYY');
    const timeContainer = $('#currentDay');

    const events = JSON.parse(localStorage.getItem('events') || '[]');
    const saveBtn = $('.saveBtn');

    saveBtn.click(function (e) {
        const saveHour = $(this).parent().attr('id');
        console.log(saveHour);
        const hourEvent = $(`#${saveHour}`).children('textarea').val();
        console.log(hourEvent);
        const event = {
            hour: saveHour,
            event: hourEvent
        };
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    });
});
