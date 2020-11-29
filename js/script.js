document.addEventListener("DOMContentLoaded", () => {
// TABS
    function showTabs() {

        const tabContent = document.querySelectorAll(".tabcontent"),
          tabParent = document.querySelector(".tabheader__items"),
          tabs = document.querySelectorAll(".tabheader__item");

        function hideTabContent() {
            tabContent.forEach(tab => {
                tab.classList.add("hide");
                tab.classList.remove("show", "fade");
                tabs.forEach(item =>{
                    item.classList.remove("tabheader__item_active");
                });
            });
        }
        
        function showTabContent(i = 0) {
            tabContent[i].classList.remove("hide");
            tabContent[i].classList.add("show", "fade");
            tabs[i].classList.add("tabheader__item_active");
        }

        // Навешиваем клик по родителю кнопок-табов
        tabParent.addEventListener("click", (e) => {
            let target = e.target;

            if (target && target.classList.contains("tabheader__item")) {
                tabs.forEach((item, i) => {
                    if (item == target) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

        hideTabContent(); 
        showTabContent();  

    }
    showTabs();
// TABS

// TIMER
    function timer() {

        const deadline = "2020-12-20";

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

    setClock(".timer", deadline);    

    }
    timer();
// TIMER

// MODAL WINDOW
    function modal() {
       
        const modalTrigger = document.querySelectorAll("[data-modal]"),
              modal = document.querySelector(".modal"),
              modalCloseBtn = modal.querySelector("[data-close]");
              
        function openModal() {
            modal.classList.toggle("show");
            document.body.style.overflow = "hidden";
            clearInterval(modalTimerId);
        } 
        
        function closeModal() {
            modal.classList.toggle("show");
            document.body.style.overflow = "";
        }
        // СОбытие для появления модалки
        modalTrigger.forEach(modalBtn => {
            modalBtn.addEventListener("click", openModal);
        });
        // События для скрытие модалки
        modalCloseBtn.addEventListener("click", closeModal);
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        // Скрываем модалку на Esc
        document.addEventListener("keydown", (event) => {
            if (event.code == "Escape" && modal.classList.contains("show")) {
                closeModal();
            }
        });

        const modalTimerId = setTimeout(openModal, 20000);

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener("scroll", showModalByScroll);
            }
        }

        window.addEventListener("scroll", showModalByScroll);

    }
    modal();
// MODAL WINDOW

});