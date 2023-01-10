

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
    const timeLabels = ['9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm'];
    const defaultStorage = [{hour: "hour-9", event: ""}, {hour: "hour-10", event: ""}, {hour: "hour-11", event: ""}, {hour: "hour-12", event: ""}, {hour: "hour-13", event: ""}, {hour: "hour-14", event: ""}, {hour: "hour-15", event: ""}, {hour: "hour-16", event: ""}, {hour: "hour-17", event: ""},]
    const timeContainer = $('#currentDay');
    timeContainer.text(currentDate);
    let events = JSON.parse(localStorage.getItem('events') || JSON.stringify(defaultStorage));
    let bgColor;

    for (let i = 0; i < timeLabels.length; i++) {
        if (i + 9 < currentHour) {
            bgColor = 'past';
        } else if (i + 9 === currentHour) {
            bgColor = 'present';
        } else {
            bgColor = 'future';
        };

        const row = $('<div>').addClass(`row time-block ${bgColor}`).attr('id', `hour-${i+9}`);
        const col = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(timeLabels[i]);
        const textArea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3').text(' ');
        const button = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
        const icon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
        button.append(icon);
        row.append(col, textArea, button);
        $('.container-lg').append(row);
    }

    if (events.length !== 0) {
        events.forEach(function(el) {
            $(`#${el.hour}`).children('textarea').val(el.event);
        });
    }


    const saveBtn = $('.saveBtn');
    saveBtn.click(function (e) {
        const saveHour = $(this).parent().attr('id');
        const hourEvent = $(`#${saveHour}`).children('textarea').val();
        
        events = events.map(storageEvent => (storageEvent.hour === saveHour) ? {...storageEvent, event: hourEvent} : storageEvent);
        localStorage.setItem('events', JSON.stringify(events));
    });
});
