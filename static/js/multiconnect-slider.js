// $(document).ready(function(){
//     createSlider(nomeSlider, coloreSlider, oraInizio, oraFine, stepMinuti, idContainer, titoloSlider);
//     createSlider('OrariApertura', '#007bff', '0600', '2100', 30, '#OrariAperturaContainer', 'Orari di apertura:');
// });

function createSlider(nomeSlider, coloreSlider, escursioneInizio, escursioneFine, step, contenitoreSlider, titoloSlider) {
    const startSliderId = `#startSlider${nomeSlider}`;
    const endSliderId = `#endSlider${nomeSlider}`;
    const startTimeId = `#startTime${nomeSlider}`;
    const endTimeId = `#endTime${nomeSlider}`;
    const startValueId = `#startValue${nomeSlider}`;
    const endValueId = `#endValue${nomeSlider}`;
    const sliderContainerClass = `slider-container ${coloreSlider.replace('#', '')}`;

    // Convert time string to minutes since 00:00
    function timeStringToMinutes(timeString) {
        const hours = parseInt(timeString.slice(0, 2));
        const minutes = parseInt(timeString.slice(2));
        return (hours * 60) + minutes;
    }

    // Create HTML structure
    const sliderContainer = $('<div>', {class: sliderContainerClass});
    const titleElement = $('<div>', {text: titoloSlider, class: 'h5 d-inline'});
    const startSlider = $('<input>', {type: 'range', class: 'slider', id: startSliderId.substring(1), min: timeStringToMinutes(escursioneInizio), max: timeStringToMinutes(escursioneFine), value: timeStringToMinutes(escursioneInizio), step: step});
    const endSlider = $('<input>', {type: 'range', class: 'slider', id: endSliderId.substring(1), min: timeStringToMinutes(escursioneInizio), max: timeStringToMinutes(escursioneFine), value: timeStringToMinutes(escursioneFine), step: step});
    const startValueDisplay = $('<div>', {class: 'thumb-value', id: startValueId.substring(1)});
    const endValueDisplay = $('<div>', {class: 'thumb-value', id: endValueId.substring(1)});
    const startTimeDisplay = $('<div>', {id: startTimeId.substring(1), class: 'h5 d-inline'});
    const endTimeDisplay = $('<div>', {id: endTimeId.substring(1), class: 'h5 d-inline'});

    sliderContainer.append(startSlider, startValueDisplay, endSlider, endValueDisplay);
    $(contenitoreSlider).append(titleElement, ' ', startTimeDisplay, ' - ', endTimeDisplay, sliderContainer);

    // Apply styles for thumb color
    $(`<style>
        .${coloreSlider.replace('#', '')} input[type="range"]::-webkit-slider-thumb {
            background: ${coloreSlider};
        }
        .${coloreSlider.replace('#', '')} input[type="range"]::-moz-range-thumb {
            background: ${coloreSlider};
        }
    </style>`).appendTo('head');

    // Update slider function
    function updateTimes() {
        const startValue = parseInt(startSlider.val());
        const endValue = parseInt(endSlider.val());

        // Calculate the hours and minutes from the slider values
        const startHours = Math.floor(startValue / 60);
        const startMinutes = startValue % 60;
        const endHours = Math.floor(endValue / 60);
        const endMinutes = endValue % 60;

        // Format the times
        const formattedStart = ('0' + startHours).slice(-2) + ':' + ('0' + startMinutes).slice(-2);
        const formattedEnd = ('0' + endHours).slice(-2) + ':' + ('0' + endMinutes).slice(-2);

        // Update the displayed times
        $(startTimeId).text(formattedStart);
        $(endTimeId).text(formattedEnd);

        // Update the thumb values
        $(startValueId).text(formattedStart);
        $(endValueId).text(formattedEnd);

        // Update thumb positions
        const startThumbLeft = ((startValue - parseInt(startSlider.attr('min'))) / (parseInt(endSlider.attr('max')) - parseInt(startSlider.attr('min')))) * 100 + '%';
        const endThumbLeft = ((endValue - parseInt(startSlider.attr('min'))) / (parseInt(endSlider.attr('max')) - parseInt(startSlider.attr('min')))) * 100 + '%';
        $(startValueId).css('left', startThumbLeft);
        $(endValueId).css('left', endThumbLeft);

        // Update slider track background
        const max = endSlider.attr('max');
        const min = endSlider.attr('min');
        const range = max - min;
        const startPercent = ((startValue - min) / range) * 100;
        const endPercent = ((endValue - min) / range) * 100;
        const background = `linear-gradient(to right, #d3d3d3 ${startPercent}%, ${coloreSlider} ${startPercent}%, ${coloreSlider} ${endPercent}%, #d3d3d3 ${endPercent}%)`;

        startSlider.css('background', background);
        endSlider.css('background', background);
    }

    // Event listeners
    startSlider.on('input', function() {
        if (parseInt(startSlider.val()) > parseInt(endSlider.val())) {
            startSlider.val(endSlider.val());
        }
        updateTimes();
    });

    endSlider.on('input', function() {
        if (parseInt(endSlider.val()) < parseInt(startSlider.val())) {
            endSlider.val(startSlider.val());
        }
        updateTimes();
    });

    // Initial update
    updateTimes();
}
