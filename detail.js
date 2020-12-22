'use strict';

window.addEventListener('load', () => {
    const id = getParamater('id');
    _idChanged(id);
});

/**
 * 引数に渡されたidをsearchBookBy関数を呼び出す.
 * idはURLで取得するのでdecodeURIを使ってデコードする.
 * @param id {string}
 */
function _idChanged(id) {
    if (!id) {
        console.warn('idが空です');
        return;
    }
    // decodeURIを実行してデコードする
    id = decodeURI(id);
    searchBookBy(id);
}

/**
 * fetchで取得したitemでBookクラスをインスタンス化し、BookのappendInnerHtml()を使って表示する.
 */
function _itemChanged(item) {
    const book = new Book(item);

    document.title = book.getTitle() + ' ' ; document.title;

    const thumbnail = document.getElementById('bookThumbnail');
    thumbnail.src = book.thumbnail;
    thumbnail.alt = book.getTitle();
    document.getElementById('bookTitle').innerHTML = book.getTitle();
    document.getElementById('bookPageCount').innerHTML = book.pageCount;
    document.getElementById('bookPublisher').innerHTML = book.getPublisher();
    document.getElementById('bookAuthor').innerHTML = book.getAuthors();
    document.getElementById('bookAnchor').href = book.buyLink;
    document.getElementById('description').innerHTML = book.getDescription();
}

/**
 * 引数のクエリで本の詳細を検索する.
 *
 * @param id {string}
 */
function searchBookBy(id) {
    if (!id) {
        return {};  // idがないため検索を行わない.
    }
    // https://developers.google.com/books/docs/v1/getting_started?hl=ja#rest-in-the-books-api
    // https://developers.google.com/books/docs/v1/reference/volumes?hl=ja
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then(res => res.json())
        .then(data => _itemChanged(data))
        .catch((e) => console.error(e, `Search book fetch error. id is ${id}`));
}