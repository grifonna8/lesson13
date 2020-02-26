document.addEventListener('DOMContentLoaded', function(){
  'use strict';

  const form = document.querySelector('.todo-control');
  const headerInput = document.querySelector('.header-input');
  const todoList = document.getElementById('todo');
  const completeList = document.getElementById('completed');

  let data = {
    toDo: [],
    completed: []
  };

  const itemRemove = function(elem){
    const item = elem.parentNode.parentNode; /* на два родителя вверх, чтобы найти li */
    const itemParent = item.parentNode;
    const id = itemParent.id;
    const text = item.textContent;
    
    itemParent.removeChild(item);

  };
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
  };

  const renderItem = function(text){
    const item = document.createElement('li');
    const btnBlock = document.createElement('div');
    const btnRemove = document.createElement('button');
    const btnComplete = document.createElement('button');

    item.classList.add('todo-item');
    btnBlock.classList.add('todo-buttons');
    btnRemove.classList.add('todo-remove');
    btnComplete.classList.add('todo-complete');

    item.textContent = text;

    btnRemove.addEventListener('click', function(event){
      itemRemove(event.target);
    });
    btnComplete.addEventListener('click', function(event){
      itemComplete(event.target);
    });

    btnBlock.appendChild(btnRemove);
    btnBlock.appendChild(btnComplete);
    item.appendChild(btnBlock);



    todoList.insertBefore(item, todoList.childNodes[0]);
        
  };
  const addItem = function(text){
    renderItem(text);
    headerInput.value = '';
    data.toDo.push(text);
  };
  
  form.addEventListener('submit', function(event) {
    event.preventDefault(); /* чтобы страница не перезагружалась */

    if(headerInput.value !== 0){
      addItem(headerInput.value);
    }
  });


});