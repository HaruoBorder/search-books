'use strict';

/**
* URLのパラメータから引数で指定されたパラメータ名の値を返却する.
* @param name {string} パラメータの名前です。
* @return {string} パラメータに一致した値を返します。
*/
function getParamater(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
* 引数のクエリで本のリストを検索する.
*
* @param query {string}
*/
function searchBooksBy(query) {
    if (!query) {
        return [];  // queryがないため検索を行わない.
    }
    // // https://developers.google.com/books/docs/v1/getting_started?hl=ja#rest-in-the-books-api
    const by = 'relevance';
    const fields = 'fields=items(id,volumeInfo/*,accessInfo(embeddable,country,viewability))';
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(res => res.json())
        .then(data => _itemsChanged(data.items))
        .catch((e) => console.error(e, `Search books fetch error. query is ${query}`));
}

function _itemsChanged(items) {
    console.log(items);
    const booksElement = document.getElementById('books');
    for (let i = 0; i < items.length; i++) {
        const title = items[i].volumeInfo.title;
        const thumbnail = items[i].volumeInfo.imageLinks.thumbnail;
        const description = items[i].volumeInfo.description;
        booksElement.innerHTML += `
        <div>
            <img src="${thumbnail}" alt="">
            <h2>${title}
            </h2>
            <div>${description}</div>
        </div>
        `
    }
}

window.addEventListener('load', function(){
    const q = getParamater('q');
    console.log(q);
    searchBooksBy(q);
});
