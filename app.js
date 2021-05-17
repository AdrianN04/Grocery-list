// document manipulation elements
// items for the grocery list
const tableBody = document.querySelector('#tableBody');
const addItem = document.getElementById('addItem');
const input = document.getElementById('inputField');
const list = document.querySelector('table');
const clear = document.getElementById('clear-items');

// Display items to show when a item is added or removed from the list
const displayItems = document.getElementsByClassName('displayItems-container');
const actionDisplay = document.querySelector('.addItems-action');
const itemsContainer = document.getElementsByClassName('addItems-container');
const actionDelete = document.querySelector('.displayItems-action')

//sorting buttons
sortAsc = document.getElementById('ascending');
sortDesc = document.getElementById('descending');

//global variable used for the list
let globalId = 0;
let items = [];
let marked = 2;

// Event liseners for adding items into the list
addItem.addEventListener('click', addProducts);
document.addEventListener("keydown", function (event) {
  if (event.key == 13) {
    addProducts(event);
  }
});

// event listener to remove all items from the table
clear.addEventListener('click', clearTable);

// sorting the list ascendent
sortAsc.addEventListener('click', function (event) {
  ascendingSort();
  renderTable();
});

//sorting the list descendent
sortDesc.addEventListener('click', function (event) {
  sortDescending();
  renderTable();
});


// function to add products to the grocery list
function addProducts(event) {
  event.preventDefault();

  let inputValue = input.value;
  let newItems = {
    name: inputValue,
    id: globalId,
    bought: false
  };

  if (inputValue === '') {
    showAction(actionDisplay, "Please insert a item", false);
  } else {
    items.push(newItems);
    globalId++;
    showAction(actionDisplay, `${inputValue} added to your list`, true);
    renderTable();
  }
}

function renderTable() {
  tableBody.innerText = '';
  for (let i = 0; i < items.length; i++) {
    createItem(items[i]);
  }
}


// function to insert the items into the table
function createItem(items) {

  // local variables used to add help the code be more readable - they have also an event listener on click that executes remove and mark functions
  let markVar = "<a onClick='markItem(" + items.id + ")' href='#'>mark</a>";
  let deleteVar = "<a onClick='removeItem(" + items.id + ")' href='#'>delete</a>";

  // defining the item cell and adding it the marking property if it's selected by the user
  let itemsCell = document.createElement('td');
  itemsCell.innerText = items.name;
  itemsCell.classList.add("grocery-item_title");

  if (items.bought) {
    itemsCell.classList.add('marked');
  }

  itemsCell.setAttribute("id", "itemName" + items.id);

  // defining the table column that contains the two actions: mark and delete
  let tableAction = document.createElement('td')
  tableAction.classList.add('tableAction');

  //defining the table cell that has the function to mark the item
  let markCell = document.createElement('a');
  markCell.innerHTML = markVar;
  markCell.classList.add('grocery-item_link');

  // defining the table cell that has the function to delete the item
  let deleteCell = document.createElement('a');
  deleteCell.innerHTML = deleteVar;
  deleteCell.classList.add('grocery-item_link');

  // defining the table row and adding a class to it
  let row = document.createElement('tr');
  row.classList.add('grocery-item');

  //creating the cells of the row
  row.appendChild(itemsCell);
  row.appendChild(tableAction);
  tableAction.appendChild(markCell);
  tableAction.appendChild(deleteCell);

  //creating the table row
  tableBody.appendChild(row);
}


// function to display items added, removed or marked
function showAction(element, text, value) {
  if (value === true) {
    element.classList.add('success');
    element.innerText = text;
    input.value = '';
    setTimeout(function () {
      element.classList.remove('success');
    }, 2000)
  } else if (value === false) {
    element.classList.add('alert');
    element.innerText = text;
    setTimeout(function () {
      element.classList.remove('alert');
    }, 2000)
  } else if (value === marked) {
    element.classList.add('displayItems-action-marked');
    element.innerText = text;
    setTimeout(function () {
      element.classList.remove('displayItems-action-marked');
    }, 2000)
  }
}

// function to mark the bought products
function markItem(itemMarked) {
  let position;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === itemMarked) {
      items[i].bought = true;
      position = i;

      if (items[i].bought === true) {
        item = items[position].name;
        showAction(actionDelete, `${item} was bought`, 2);
        break;
      }
      break;
    }
  }
  renderTable();
}

// function to remove a item from the list
function removeItem(itemDeleted) {
  let position;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === itemDeleted) {
      position = i;
      break;
    }
  }
  item = items[position].name;
  items.splice(position, 1);
  showAction(actionDelete, `${item} was removed from the list`, false);
  renderTable();
}

// function to remove all items from the list
function clearTable() {
  let numberOfItems = document.querySelectorAll(".table");
  if (items.length > 0) {
    tableBody.innerHTML = '';
    showAction(actionDelete, "All items were deleted", false);
  } else {
    showAction(actionDelete, "No more items to delete", false);
  }
}

function ascendingSort() {
  items.sort((item1, item2) => {
    return sortObjectsAsc(item1, item2, 'name')
  });
}

function sortObjectsAsc(object1, object2, asc) {
  obj1 = object1[asc];
  obj2 = object2[asc];

  if (obj1 < obj2) {

    return -1
  }
  if (obj1 > obj2) {

    return 1;
  }
  return 0;
}

function sortDescending() {

  items.sort((item1, item2) => {
    return sortObjectsDesc(item1, item2, 'name')
  });

}

function sortObjectsDesc(object1, object2, desc) {
  obj1 = object1[desc];
  obj2 = object2[desc];

  if (obj1 < obj2) {
    return 1;
  }
  if (obj1 > obj2) {
    return -1
  }
  return 0;
}