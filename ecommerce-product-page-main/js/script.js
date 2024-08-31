// 変数定義 ---------------------------------------------------
let cartButton = document.querySelector('.cart-button');
let cartBox = document.querySelector('.cart-box');
let cartQuantityBox = document.querySelector('.cart-quantity-box');
let cartQuantity = document.querySelector('.cart-quantity');
let cartProductQuantity = document.querySelector('.cart-product-quantity');
let cartEmpty = document.querySelector('.cart-empty');
let cartNotEmpty = document.querySelector('.cart-not-empty');
let totalPrice = document.querySelector('.total-price');
let deleteButton = document.querySelector('.delete');
let checkoutButton = document.querySelector('.check-out-button');

let mainImg = document.querySelector('.main-img');
let mainThumbnailArray = Array.from(document.querySelectorAll('.main-thumbnail img'));
let price = document.querySelector('.price');
let inputMinus = document.querySelector('.input-minus');
let inputNumber = document.querySelector('input');
let inputPlus = document.querySelector('.input-plus');
let AddToCartButton = document.querySelector('.add-to-cart-button');

let modalContainer = document.querySelector('.modal-container');
let modalImg = document.querySelector('.modal-img');
let modalThumbnailArray = Array.from(document.querySelectorAll('.modal-thumbnail img'));
let modalClose = document.querySelector('.modal-close');
let modalPrevious = document.querySelector('.modal-previous');
let modalNext = document.querySelector('.modal-next');
// -----------------------------------------------------------

// 初期状態の選択されたサムネイルを取得（あとで設定を消すため）
let targetDiv = document.querySelector('.main-thumbnail-flame');
let targetDivModal = document.querySelector('.modal-thumbnail-flame');
let targetThumbnailModal = document.querySelector('.modal-opacity');

// メインサムネイル画像のクリックイベント
for (let i = 0; i < mainThumbnailArray.length; i++) {
    mainThumbnailArray[i].addEventListener('click', function(event) {
        // メイン画像を変更
        mainImg.src = 'images/image-product-' + Number(mainThumbnailArray.indexOf(event.target) + 1) + '.jpg';
        // モーダル画像を変更
        modalImg.src = mainImg.src;
        // 選択されていた要素のstyle変更
        let mainOpacityArray = document.querySelectorAll('.main-opacity');
        let modalOpacityArray = document.querySelectorAll('.modal-opacity');
        for (let j = 0; j < mainOpacityArray.length; j++) {
            mainOpacityArray[j].classList.remove('main-opacity');
            modalOpacityArray[j].classList.remove('modal-opacity');
        }
        targetDiv.classList.remove('main-thumbnail-flame');
        targetDivModal.classList.remove('modal-thumbnail-flame');
        // 新しく選択した要素のstyle変更
        event.target.classList.add('main-opacity');
        targetDiv = event.target.closest('div');
        targetDiv.classList.add('main-thumbnail-flame');
        targetThumbnailModal = modalThumbnailArray[Number(mainThumbnailArray.indexOf(event.target))];
        targetThumbnailModal.classList.add('modal-opacity');
        targetDivModal = targetThumbnailModal.closest('div');
        targetDivModal.classList.add('modal-thumbnail-flame');
    });
}

// メイン画像クリックイベント
// ※pc　tabletのみ
if (window.matchMedia('(min-width: 800px)').matches) {
    mainImg.addEventListener('click', function() {
    // モーダルを開く
        modalContainer.style.visibility = 'visible';
    });
}

// モーダルサムネイル画像のクリックイベント
for (let k = 0; k < modalThumbnailArray.length; k++) {
    modalThumbnailArray[k].addEventListener('click', function(event) {
        modalImg.src = 'images/image-product-' + Number(modalThumbnailArray.indexOf(event.target) + 1) + '.jpg';
        // 選択されていた要素のstyle変更
        targetThumbnailModal = document.querySelector('.modal-thumbnail .modal-opacity');
        targetThumbnailModal.classList.remove('modal-opacity');
        targetDivModal = targetThumbnailModal.closest('div');
        targetDivModal.classList.remove('modal-thumbnail-flame');
        // 新しく選択した要素のstyle変更
        targetThumbnailModal = event.target;
        targetThumbnailModal.classList.add('modal-opacity');
        targetDivModal = event.target.closest('div');
        targetDivModal.classList.add('modal-thumbnail-flame');
    });
}

// モーダル戻るボタンのクリックイベント
modalPrevious.addEventListener('click', function() {
    // 選択されていた要素のstyle変更
    targetThumbnailModal = document.querySelector('.modal-opacity');
    targetDivModal = document.querySelector('.modal-thumbnail-flame');
    targetThumbnailModal.classList.remove('modal-opacity');
    targetDivModal.classList.remove('modal-thumbnail-flame');

    // modal-imgのsrcとひとつ前の要素のstyle変更
    if (Number(modalThumbnailArray.indexOf(targetThumbnailModal)) == 0) {
        modalImg.src = 'images/image-product-' + modalThumbnailArray.length + '.jpg';
        targetThumbnailModal = modalThumbnailArray[modalThumbnailArray.length - 1];
    } else {
        modalImg.src = 'images/image-product-' + modalThumbnailArray.indexOf(targetThumbnailModal) + '.jpg';
        targetThumbnailModal = modalThumbnailArray[Number(modalThumbnailArray.indexOf(targetThumbnailModal) - 1)];
    }
    targetDivModal = targetThumbnailModal.closest('div');
    targetThumbnailModal.classList.add('modal-opacity');
    targetDivModal.classList.add('modal-thumbnail-flame');
})

// モーダル進むボタンのクリックイベント
modalNext.addEventListener('click', function() {
    // 選択されていた要素のstyle変更
    targetThumbnailModal = document.querySelector('.modal-thumbnail .modal-opacity');
    targetDivModal = document.querySelector('.modal-thumbnail-flame');
    targetThumbnailModal.classList.remove('modal-opacity');
    targetDivModal.classList.remove('modal-thumbnail-flame');

    // modal-imgのsrcとひとつ後の要素のstyle変更
    if (Number(modalThumbnailArray.indexOf(targetThumbnailModal)) == modalThumbnailArray.length - 1) {
        modalImg.src = 'images/image-product-1.jpg';
        targetThumbnailModal = modalThumbnailArray[0];
    } else {
        modalImg.src = 'images/image-product-' + Number(modalThumbnailArray.indexOf(targetThumbnailModal) + 2) + '.jpg';
        targetThumbnailModal = modalThumbnailArray[Number(modalThumbnailArray.indexOf(targetThumbnailModal) + 1)];
    }
    targetDivModal = targetThumbnailModal.closest('div');
    targetThumbnailModal.classList.add('modal-opacity');
    targetDivModal.classList.add('modal-thumbnail-flame');
})

// モーダル閉じるボタンのクリックイベント
modalClose.addEventListener('click', function() {
    modalContainer.style.visibility = 'hidden';
})

// インプットボタンの増減イベント
inputPlus.addEventListener('click', function() {
    inputNumber.value = Number(inputNumber.value) + 1;
})

inputMinus.addEventListener('click', function() {
    if (inputNumber.value > 0) {
        inputNumber.value = Number(inputNumber.value) - 1;
    }
})

// AddToCartButtonボタンイベント
AddToCartButton.addEventListener('click', function() {
    inputNumber = document.querySelector('input');
    if (inputNumber.value == 0) {
    } else {
    cartQuantity.innerHTML = Number(cartQuantity.innerHTML) + Number(inputNumber.value);
    cartQuantityBox.style.visibility = 'visible';
    cartProductQuantity.innerHTML = Number(cartProductQuantity.innerHTML) + Number(inputNumber.value);
    totalPrice.innerHTML = (Number(price.innerHTML) * Number(cartProductQuantity.innerHTML)).toFixed(2);
    inputNumber.value = 0;
    cartEmpty.style.display = 'none';
    cartNotEmpty.style.display = 'flex';
    }
})

// カートの確認イベント
// ※pc　tabletのみ
if (window.matchMedia('(min-width: 800px)').matches) {
    cartButton.addEventListener('mouseenter', function() {
        cartBox.style.display = 'block';
        cartBox.classList.remove('fade-out');
    });
    cartButton.addEventListener('mouseleave', function() {
        cartBox.classList.add('fade-out');

        // カートの中身のホバーイベント
        cartBox.addEventListener('mouseenter', function() {
            cartBox.classList.remove('fade-out');
        });
        cartBox.addEventListener('mouseleave', function() {
            cartBox.classList.add('fade-out');
        });
    });
}

// 商品の削除イベント
deleteButton.addEventListener('click', function() {
    cartQuantity.innerHTML = 0;
    cartQuantityBox.style.visibility = 'hidden';
    cartProductQuantity.innerHTML = 0;
    cartEmpty.style.display = 'flex';
    cartNotEmpty.style.display = 'none';
});

checkoutButton.addEventListener('click', function() {
    cartQuantity.innerHTML = 0;
    cartQuantityBox.style.visibility = 'hidden';
    cartProductQuantity.innerHTML = 0;
    cartEmpty.style.display = 'flex';
    cartNotEmpty.style.display = 'none';
});

// mobileのみ------------------------------------------------
let menu = document.querySelector('#menu');
let nav = document.querySelector('nav');
let navBody = document.querySelector('.nav-body');
let navClose = document.querySelector('#nav-close');

let mainPrevious = document.querySelector('.main-previous');
let mainNext = document.querySelector('.main-next');
let mainImgArray = [];
mainImgArray.push('images/image-product-1.jpg', 'images/image-product-2.jpg', 'images/image-product-3.jpg', 'images/image-product-4.jpg');
let l = 0;

// メイン戻る・進むボタンのクリックイベント

if (window.matchMedia('(max-width: 799px').matches) {
    mainPrevious.addEventListener('click', function() {
        if (l == 0) {
            l = 3;
        } else {
            l = l - 1;
        }
        mainImg.src = mainImgArray[l];
    });

    mainNext.addEventListener('click', function() {
        if (l == 3) {
            l = 0;
        } else {
            l = l + 1;
        }
        mainImg.src = mainImgArray[l];
    });

    // カートの確認イベント
    cartButton.addEventListener('click', function() {
        cartBox.classList.toggle('display');
    });

    // ナビの表示
    menu.addEventListener('click', function() {
        navBody.classList.remove('close-anime');
        navBody.classList.add('open-anime');
        nav.classList.add('nav-open');
    });

    // ナビを閉じる
    navClose.addEventListener('click', function() {
        navBody.classList.remove('open-anime');
        navBody.classList.add('close-anime');
        setTimeout(function() {
            nav.classList.remove('nav-open');
        },500);
    });
}

// add-to-cartボタンの下に薄いオレンジの影を付ける。

