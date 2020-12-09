document.addEventListener("DOMContentLoaded", () => {
// TABS

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

    

// TABS

// TIMER

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

    
// TIMER

// MODAL WINDOW

        const modalTrigger = document.querySelectorAll("[data-modal]"),
              modal = document.querySelector(".modal");

              
        function openModal() {
            // modal.classList.toggle("show");
            modal.classList.add("show");
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";
            clearInterval(modalTimerId);
        } 
        
        function closeModal() {
            // modal.classList.toggle("show");
            modal.classList.add("hide");
            modal.classList.remove("show");
            document.body.style.overflow = "";
        }
        // СОбытие для появления модалки
        modalTrigger.forEach(modalBtn => {
            modalBtn.addEventListener("click", openModal);
        });
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.getAttribute("data-close") == "") {
                closeModal();
            }
        });
        // Скрываем модалку на Esc
        document.addEventListener("keydown", (event) => {
            if (event.code == "Escape" && modal.classList.contains("show")) {
                closeModal();
            }
        });

        const modalTimerId = setTimeout(openModal, 50000);

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener("scroll", showModalByScroll);
            }
        }

        window.addEventListener("scroll", showModalByScroll);



// MODAL WINDOW

// CARDS BY CLASSES

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

        const  getResource = async (url) => {
            const res = await fetch(url);

            if (!res.ok) {
               throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
    
            return await res.json();
    
        };

        getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

// CARDS BY CLASSES


    // CONTACT FORM


    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/icons/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const  postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: data
        });

        return await res.json();

    };

        // Обращаемся к серверу, передаём данные
    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }

    // Изменение модалки для показа сообщения об успухе/провале
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div class = "modal__close" data-close>×</div>
                <div class = "modal__title">${message}</div>
            </div
        `;
        
        // Подставляем модалку
        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }

// CONTACT FORM

// SLIDER
    const slides = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector(".offer__slider"),
          prev = document.querySelector(".offer__slider-prev"),
          next = document.querySelector(".offer__slider-next"),
          total = document.querySelector("#total"),
          current = document.querySelector("#current"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        }else {
            total.textContent = slides.length;
            current.textContent = {slideIndex};
        }

    // Устанавливаем css свойства для обёртки слайдов
    slidesField.style.width = slides.length * 100 + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    // Ширина каждого слайда одинаковая
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');

            if (i == 0) {
                dot.style.opacity = 1;
            }

            indicators.append(dot);
            dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    function addActiveDot(dots) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }

    function addFormatSlideIndex() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // Слайд назад
    prev.addEventListener("click", () => {
        if (offset == 0){  
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

       addFormatSlideIndex();

        addActiveDot(dots);

    });

    // Слайд вперёд
    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)){
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

       addFormatSlideIndex();

        addActiveDot(dots);

    });

    // Устанавливаем смену слайдов по клику на точки(dots)

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

           addFormatSlideIndex()

            addActiveDot(dots);

        });
    });

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // }else {
    //     total.textContent = slides.length;
    // }
    
    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //     });
    //     slides[slideIndex - 1].classList.remove("hide");
    //     slides[slideIndex - 1].classList.add("show");

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     }
    //     else {
    //         current.textContent = slideIndex;
    //     }

    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener("click", () => {
    //     plusSlides(-1);
    // });
    // next.addEventListener("click", () => {
    //     plusSlides(+1);
    // });
// SLIDER
    
});