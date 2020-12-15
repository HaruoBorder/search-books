'use strict';

function _onSubmit(e) {
    const query = e.target.elements['q'].value;
    if(!query) {
        window.alert('本のタイトルを入力してください。');
        e.preventDefault(); // formタグのSubmitを止める
    }
}
 