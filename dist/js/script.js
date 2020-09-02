
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
});

let userHeaderIcon = document.querySelector(".user-header__icon");

userHeaderIcon.addEventListener("click", function(e){
    let userHeaderMenu = document.querySelector(".user-header__menu");
    userHeaderMenu.classList.toggle('_active');
    iconMenu.classList.remove('_active');
    menuBodyOpen.classList.remove('_active');
});

let iconMenu = document.querySelector(".icon-menu");
let menuBodyOpen = document.querySelector(".menu__body");

iconMenu.addEventListener("click", function(e){
    iconMenu.classList.toggle('_active');
    menuBodyOpen.classList.toggle('_active');
});

document.addEventListener("click", function(e){
    if(!e.target.closest('.user-header')){
        let userHeaderMenu = document.querySelector(".user-header__menu");
        userHeaderMenu.classList.remove('_active');
    }
});

$(document).ready(function(){
    $('.slider').slick({
        dots:false,
        prevArrow:"<img class='a-left control-c prev slick-prev' src='../img/prev.jpg'>",
        nextArrow:"<img class='a-right control-c next slick-next' src='../img/next.jpg'>"
    });
    $(".control-c").wrapAll("<div class='new-nav'></div>");
    $('.product-slider').slick({
        dots:false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        prevArrow:"<img class='a-left control-c prev slick-prev' src='../img/left-arrow.png'>",
        nextArrow:"<img class='a-right control-c next slick-next' src='../img/right-arrow.png'>"
    });
});

