// Функция для табов 
function tabs(tabSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabContent = document.querySelectorAll(tabsContentSelector),
    tabParent = document.querySelector(tabsParentSelector),
    tabs = document.querySelectorAll(tabSelector);

  function hideTabContent() {
      tabContent.forEach(tab => {
          tab.classList.add("hide");
          tab.classList.remove("show", "fade");
          tabs.forEach(item =>{
              item.classList.remove(activeClass);
          });
      });
  }
  
  function showTabContent(i = 0) {
      tabContent[i].classList.remove("hide");
      tabContent[i].classList.add("show", "fade");
      tabs[i].classList.add(activeClass);
  }

  // Навешиваем клик по родителю кнопок-табов
  tabParent.addEventListener("click", (e) => {
      let target = e.target;

      if (target && target.classList.contains(tabSelector.slice(1))) {
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

export default tabs;