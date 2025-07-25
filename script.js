const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearAll = document.getElementById("clear");
// const ulList = document.querySelectorAll("li");
const filter = document.getElementById("filter");

// -----------Add an item to the list-----------
function addItem(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  // Validate the input
  if (newItem === "") {
    alert("Enter an item");
    return;
  }

  // Now we create a list item
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");

  const icon = createIcon("fa-solid fa-xmark");

  button.appendChild(icon);
  li.appendChild(button);

  // Appending the li to the dom
  itemList.appendChild(li);
  itemInput.value = "";

  // const ulList = document.querySelectorAll("li");
  ClearUI();
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

// -----------Remove an item from the list-----------
function removeItem(e) {
  // console.log(e.target);
  // e.target.remove(); // This just removes the cross button! LOL LMAO
  // console.log(e.target.parentElement);
  // e.target.parentElement.remove();
  // We use event delegation for this.

  // console.log(e.target.parentElement.classList);
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
    // i -> button -> li
  }
  ClearUI();
}

// -----------Clear the whole list-----------
function clearAllBtn() {
  if (confirm("You want to clear all items?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    ClearUI();
  }
}

// -----------Clear UI-----------
function ClearUI() {
  // console.log(ulList.length);
  const ulList = document.querySelectorAll("li");
  if (ulList.length === 0) {
    filter.style.display = "none";
    clearAll.style.display = "none";
  } else {
    filter.style.display = "block";
    clearAll.style.display = "block";
  }
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

// -----------Event Listeners-----------
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearAll.addEventListener("click", clearAllBtn);
filter.addEventListener("input", filterItems);
ClearUI();
