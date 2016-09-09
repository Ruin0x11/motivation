'use strict';

var $ = document.getElementById.bind(document);

document.addEventListener('DOMContentLoaded', function () {
    loadOptions();
    $('save').onclick = saveOptions;
});

function loadElement(id) {
    $(id).value = typeof localStorage[id] == 'undefined' ? '' : localStorage[id];
}

function saveElement(id) {
    localStorage[id] = $(id).value;
}

function loadOptions() {
    loadElement("wallpapers");
}

function saveOptions() {
    saveElement("wallpapers");
    alert("Settings saved.");
}
