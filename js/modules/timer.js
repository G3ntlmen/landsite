// Скрипт для таймера обратного отсчёта

function timer(id, deadline) {
 

        // Считаем оставшееся время для таймера
        function getRemainingTime(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                  minutes = Math.floor((t / (1000 * 60)) % 60),
                  seconds = Math.floor((t / 1000) % 60);

            return {
                "total": t,
                "days": days,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds
            };       
        }
        // Устанавливаем формат времени на таймере : 01 часов, 01 минут и т.д.
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        // Определяем необходимые объекты ДОМ дерева
        function setClock(selector, endtime) {
            const timer = document.querySelector(selector),
                  days = timer.querySelector("#days"),
                  hours = timer.querySelector("#hours"),
                  minutes = timer.querySelector("#minutes"),
                  seconds = timer.querySelector("#seconds"),
                  timeInterval = setInterval(updateClock, 1000);

            updateClock();      

            // Устанавливаем значения времени в таймер   
            function updateClock() {
                const t = getRemainingTime(endtime);

                days.textContent = getZero(t.days);
                hours.textContent = getZero(t.hours);
                minutes.textContent = getZero(t.minutes);
                seconds.textContent = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }

        }

    setClock(id, deadline);    
}

export default timer;