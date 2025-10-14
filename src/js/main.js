import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import * as bootstrap from 'bootstrap';
import { daysUntilNextBirthday } from './modules/days.js';
import { ver } from './modules/version.js';

dayjs.extend(utc);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const leoBirthday = new Date(document.getElementById('leo-birthday').dataset.leoBirthday);
    const leoDaysUntilNextBirthday = daysUntilNextBirthday(leoBirthday);
    const today = new Date();
    
    // Update version display
    const v = ver(leoBirthday, today);
    document.getElementById('leo-version').textContent = v;

    // Determine language
    const languageDatepicker = window.location.pathname !== '/index_en.html' ? 'pt-BR' : 'en';

    // Messages for each language
    const messageDaysUntil = {
        "pt-BR": {
            "title": "Quanto falta?",
            "content": [
                "Faltam",
                "dias",
                "pro niver do Léo!"
            ]
        },
        "en": {
            "title": "How many days?",
            "content": [
                "There are",
                "days",
                "until Léo's birthday!"
            ]
        }
    };

    // Create popover content
    const content = `
        <div class="container">
            <div class="row text-center">
                <p class="fs-6">${messageDaysUntil[languageDatepicker].content[0]}</p>
                <p class="fs-4">⏳🎊&nbsp;<span class="fs-1" id="leo-days-until">${leoDaysUntilNextBirthday}</span>&nbsp;⏳🎊</p>
                <p class="fs-4">${messageDaysUntil[languageDatepicker].content[1]}</p>
                <p class="fs-6">${messageDaysUntil[languageDatepicker].content[2]}</p>
            </div>
        </div>
    `;

    // Initialize all popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
        trigger: 'focus',
        html: true,
        title: `<p class="text-center m-0">🎂🎈🎉${messageDaysUntil[languageDatepicker].title}🎂🎈🎉</p>`,
        content: content,
        placement: 'bottom',
        delay: { show: 200, hide: 0 }
    }));

    function handleDateChange() {
        const dateStart = document.getElementById('dateStart').value;
        const dateEnd = document.getElementById('dateEnd').value;
        
        const startDate = dayjs.utc(dateStart);
        const endDate = dayjs.utc(dateEnd);
        
        let c = ver(startDate, endDate);
        
        if (c === 'vNaN.NaN.NaN') {
            c = 'v0.0.0';
        }

        const resultVersion = document.getElementById('result-version');
        resultVersion.textContent = c;
        
        // Flash animation using CSS
        resultVersion.classList.add('flash');
        setTimeout(() => resultVersion.classList.remove('flash'), 1000);

        const url = new URL(window.location.href.split('?')[0]);
        url.searchParams.set('d1', dateStart);
        url.searchParams.set('d2', dateEnd);

        const description = languageDatepicker !== 'en' 
            ? `Minha versão é ${c} #CadeOLeo` 
            : `My version is ${c} #CadeOLeo`;

        const shareData = {
            title: 'CadeOLeo',
            text: description,
            url: url.toString()
        };

        // Share button functionality
        const shareButton = document.querySelector('.share-button');
        if (navigator.share && shareButton) {
            shareButton.addEventListener('click', async () => {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            });
        }
    }

    // Initialize date inputs
    const dateInputs = document.querySelectorAll('.date-input');
    dateInputs.forEach(input => {
        input.setAttribute('type', 'date');
        input.addEventListener('change', handleDateChange);
    });

    // Set initial end date
    const dateEnd = document.getElementById('dateEnd');
    if (dateEnd) {
        dateEnd.value = dayjs().format('YYYY-MM-DD');
    }

    // Handle URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.has('d1')) {
        const d1 = params.get('d1');
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(d1)) {
            const dateStart = document.getElementById('dateStart');
            if (dateStart) {
                dateStart.value = d1;
                handleDateChange();
            }
        }
    }

    if (params.has('d2')) {
        const d2 = params.get('d2');
        if (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(d2)) {
            const dateEnd = document.getElementById('dateEnd');
            if (dateEnd) {
                dateEnd.value = d2;
                handleDateChange();
            }
        }
    }
});
