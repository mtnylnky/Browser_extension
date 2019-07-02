//Source: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
//Source: https://github.com/mdn/webextensions-examples

var inputTitle = document.querySelector('#mytitle');
var inputBody = document.querySelector('#mycontent');
var noteContainer = document.querySelector('#savedfile');
var addBtn = document.querySelector('.addnote');

initialize();

addBtn.addEventListener('click', addNote);
function onError(error) {
  console.log(error);
};

function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
};

function addNote() {
  var noteTitle = inputTitle.value;
  var noteBody = inputBody.value;
  var gettingItem = browser.storage.local.get(noteTitle);
  gettingItem.then((result) => {
    var objTest = Object.keys(result);
    if(objTest.length < 1 && noteTitle !== '' && noteBody !== '') {
      inputTitle.value = '';
      inputBody.value = '';
      storeNote(noteTitle,noteBody);
    }
  }, onError);
};

function storeNote(title, body) {
  var storingNote = browser.storage.local.set({ [title] : body });
  storingNote.then(() => {
    displayNote(title,body);
  }, onError);
};

function displayNote(title, body) {
  var note = document.createElement('div');
  var noteDisplay = document.createElement('div');
  var noteH = document.createElement('h1');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');
  note.setAttribute('class','note');
  noteH.textContent = title;
  notePara.textContent = body;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete';
  clearFix.setAttribute('class','clearfix');
  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);
  note.appendChild(noteDisplay);

  deleteBtn.addEventListener('click',(e) => {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(title);
  });

  var noteEdit = document.createElement('div');
  noteContainer.appendChild(note);
  noteEdit.style.display = 'none';
}