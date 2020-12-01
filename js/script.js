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

// CARDS BY CLASSES
    function classCards() {

        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 65;
                this.changeToRUB();
            }
    
            changeToRUB() {
                this.price = this.price * this.transfer;
            }
    
            render() {
                const element = document.createElement("div");
    
                if (this.classes.length === 0) {
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                }
    
                this.classes.forEach(className => element.classList.add(className));
                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
                </div>
                `;
                this.parent.append(element);
            }
        }
        
        new MenuCard(
            "img/tabs/post.jpg",
             "post",
             'Меню "Постное"',
             'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
             9,
             '.menu .container',
             "menu__item",
             "big"
        ).render();
    
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            12,
            '.menu .container',
            "menu__item"
        ).render();
    
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Меню "Фитнес"',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            11,
            '.menu .container',
            "menu__item"
        ).render();

    }
// CARDS BY CLASSES
    classCards();
// CONTACT FORM
    function form() {

        const forms = document.querySelectorAll("form");

        const message = {
            loading: "Загрузка",
            success: "Спасибо! Скоро мы с вами свяжемся",
            failure: "Что-то пошло не так..."
        };

        forms.forEach(item => {
            postData(item);
        });

        function postData(form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const statusMessage = document.createElement("div");
                statusMessage.classList.add("status");
                statusMessage.textContent = message.loading;
                form.append(statusMessage);

                const request = new XMLHttpRequest();
                request.open("POST", "server.php");

                request.setRequestHeader("Content-type", "application/json");
                const formData = new FormData(form);

                const object = {};
                formData.forEach(function(value, key) {
                    object[key] = value;
                });

                const json = JSON.stringify(object);

                request.send(json);

                request.addEventListener("load", () => {
                    if (request.status === 200) {
                        console.log(request.response);
                        statusMessage.textContent = message.success;
                        form.reset();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 2000);
                    } else {
                        statusMessage.textContent = message.failure;
                    }
                });
            });
        }

    }
    form();
// CONTACT FORM

});