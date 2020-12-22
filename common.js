'use strict';

// Not working on IE.
//  function getParamater(name) {
//     if (!name)
//         return;
//     const url = new URL(location.href);
//     return url.searchParams.get(name);
// }

/**
  * URLのパラメータから引数で指定されたパラメータ名の値を返却する.
  * @param name {string}
  * @return {string}
  */
function getParamater(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * リクエスト結果(Book)のclass(設計図).
 */
class Book {
    /**
     * インスタンス化するときに最初に一度だけ呼び出される関数で、
     * fetchした結果を元にBookをインスタンス化する.
     * @param item {object}
     */
    constructor(item) {
        const volumeInfo = item.volumeInfo;
        this.title = volumeInfo.title;
        this.subtitle = volumeInfo.subtitle;
        this.description = volumeInfo.description;
        this.pageCount = volumeInfo.pageCount;
        this.smallThumbnail = volumeInfo.imageLinks.smallThumbnail;
        this.thumbnail = volumeInfo.imageLinks.thumbnail;
        this.id = item.id;
        this.publisher = volumeInfo.publisher;
        this.publishedDate = volumeInfo.publishedDate;
        this.previewLink = volumeInfo.previewLink;
        this.authors = volumeInfo.authors;
        const saleInfo = item.saleInfo;
        if(saleInfo) {
            this.buyLink = saleInfo.buyLink;
        }
    }

    getTitle() {
        return this.title;
    }

    // 本の詳細を取得する
    getDescription() {
        return this.description ? this.description : '詳細はありません';
    }

    // 詳細ページのリンクを取得する
    getDetailLink() {
        return `./detail.html?id=${this.id}`;
    }

    // 出版社を取得する
    getPublisher() {
        return this.publisher ? this.publisher : '';
    }

    getAuthors() {
        return this.authors && this.authors.length ? this.authors[0] : '情報がありません';
    }

    /**
     * このBookを元に作成したCardのHTMLを返却する.
     */
    get cardHtml() {
        return `
            <a href="${this.getDetailLink()}">
                <div class="card layout horizontal">
                    <div class="flex">
                        <img src="${this.thumbnail}" alt="${this.title}">
                    </div>
                    <div class="flex-2 layout vertical">
                        <h3>${this.title}</h3>
                        <div id="description" class="flex">${this.getDescription()}</div>
                        <div>${this.getPublisher()}</div>
                    </div>
                </div>
            </a>
        `;
    }

    /**
     * 引数のエレメントのHTMLにこのBookで作成したCardのHTMLを追加する.
     * @param element {element}
     */
    appendInnerHtml(element) {
        if (!element) {
            console.warn('elementが空です.');
            return;
        }
        element.innerHTML += this.cardHtml;
    }
}