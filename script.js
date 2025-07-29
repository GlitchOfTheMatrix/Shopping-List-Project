const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");
const filter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");

let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  ClearUI();
}

// -----------Add an item to the list-----------
function addItemOnSubmit(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  // Validate the input
  if (newItem === "") {
    alert("Enter an item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove(); // Complete remove
    // Then it will automatically proceed to add the updated item.
  } else {
    if (checkIfItemExists(newItem)) {
      alert("The item already exists");
    }
  }

  // Now we create a list item
  addItemToDom(newItem);

  // Add Item to local Storage
  addItemToLocalStorage(newItem);

  itemInput.value = "";
  ClearUI();
}

function addItemToDom(item) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");

  const icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);
  li.appendChild(button);

  // Appending the li to the dom
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// -----------Add an item to Local Storage-----------
function addItemToLocalStorage(item) {
  // Theory: We cannot store array in local storage, so, we use parsing and stringify.

  const itemsFromStorage = getItemsFromStorage();

  // Add Item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
    ClearUI();
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;
  // Change the style of item selected for editing purposes.
  // Making a class in css for this purpose : edit-mode

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>  Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

// -----------Remove an item from the list-----------
function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item);
  }

  // i -> button -> li
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item.textContent);

  // Re-set it to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// -----------Clear the whole list-----------
function clearAllBtn() {
  if (confirm("You want to clear all items?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    // Clear from local storage
    localStorage.removeItem("items");

    ClearUI();
  }
}

// -----------Clear UI-----------
function ClearUI() {
  const ulList = document.querySelectorAll("li");
  if (ulList.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }

  formBtn.innerHTML = '<i class = "fa-solid fa-plus"></i>   Add Item';
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// -----------Filtering items in the List-----------
function filterItems(e) {
  const itemsList = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();
  itemsList.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// -----------Initialize App-----------
function init() {
  // -----------Event Listeners-----------
  itemForm.addEventListener("submit", addItemOnSubmit);
  itemList.addEventListener("click", onClickItem);
  clearAll.addEventListener("click", clearAllBtn);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  ClearUI();
}

init();
