document.addEventListener('DOMContentLoaded', function(){
  'use strict';

  const form = document.querySelector('.todo-control');
  const headerInput = document.querySelector('.header-input');
  const todoList = document.getElementById('todo');
  const completeList = document.getElementById('completed');

  // создаем объект
  let data = {
    toDo: [],
    completed: []
  };

  // проверяем local storage на наличие данных
  if(localStorage.getItem('localData')){
    data = JSON.parse(localStorage.getItem('localData'));
  }

  // если данные есть, выводим их из storage на экран
  const renderItemsForUpdate = function(){
    if (!data.toDo.length && !data.completed.length){  /* если пустые, то ничего не вернет */
      return;
    }
    for(let i = 0; i < data.toDo.length; i++){
      renderItem(data.toDo[i]); /* заносим в каждую li при новой загрузке то, что хранится из прошлых списков дел */
    }
    for(let i = 0; i < data.completed.length; i++){
      renderItem(data.completed[i], true); /* по дефолту тру */ 
    }
  };

  // функция, которая пишет в storage
  const dataUpdateToLocalS = function(){
    localStorage.setItem('localData', JSON.stringify(data)); /* перевели в этот формат, чтобы увидеть данные, но я не поняла, почему */
  };

  // все необходимые этапы для удаления как карточки, так и ее значения отовсюду
  const itemRemove = function(elem){
    const item = elem.parentNode.parentNode; /* на два родителя вверх, чтобы найти li */
    const itemParent = item.parentNode;
    const id = itemParent.id;
    const text = item.textContent;
    
    if (id === 'todo'){
      data.toDo.splice(data.toDo.indexOf(text), 1); /* получим индекс того, где сидит наш текст, и его один вынем */
    } else {
      data.completed.splice(data.completed.indexOf(text), 1);
    }

    itemParent.removeChild(item);
    dataUpdateToLocalS();
  };

   // все необходимые этапы для отмечания карточки в выполненных и верного занесения этих значений повсюду
  const itemComplete = function(elem){
    const item = elem.parentNode.parentNode; /* на два родителя вверх, чтобы найти li */
    const itemParent = item.parentNode; /* нашли ul */
    const id = itemParent.id;
    const text = item.textContent;

    let target; /* наша цель, куда будем вкидывать */
    if (id === 'todo'){
      target = completeList;
    } else {
      target = todoList;
    }

    if (id === 'todo'){
      data.toDo.splice(data.toDo.indexOf(text), 1); /* получим индекс того, где сидит наш текст, и его один вынем */
      data.completed.push(text); /* помещаем противоположный */
    } else {
      data.completed.splice(data.completed.indexOf(text), 1);
      data.toDo.push(text);
    }
    itemParent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    dataUpdateToLocalS();
  };

  // создание составных частей карточки и их помещение на страницу
  const renderItem = function(text, completed = false){ /* по умолчанию ложь */
    const item = document.createElement('li');
    const btnBlock = document.createElement('div');
    const btnRemove = document.createElement('button');
    const btnComplete = document.createElement('button');
    let list = todoList;

    if(completed){
      list = completeList;
    } else {
      list = todoList;
    }

    item.textContent = text;

    item.classList.add('todo-item');
    btnBlock.classList.add('todo-buttons');
    btnRemove.classList.add('todo-remove');
    btnComplete.classList.add('todo-complete');

    btnRemove.addEventListener('click', function(event){
      itemRemove(event.target);
    });
    btnComplete.addEventListener('click', function(event){
      itemComplete(event.target);
    });

    btnBlock.appendChild(btnRemove);
    btnBlock.appendChild(btnComplete);
    item.appendChild(btnBlock);

    list.insertBefore(item, list.childNodes[0]);
        
  };

  // добавление текста из карточки 
  const addItem = function(text){
    renderItem(text);
    headerInput.value = '';
    data.toDo.push(text);

    dataUpdateToLocalS();
  };
  
  // обработчик по энтеру или кнопке плюс
  form.addEventListener('submit', function(event) {
    event.preventDefault(); /* чтобы страница не перезагружалась */

    if(headerInput.value !== 0){
      addItem(headerInput.value.trim());
    }
  });

  renderItemsForUpdate();


});