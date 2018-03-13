import $ from "jquery";

class MobileMenu {
    constructor() {
        this.header = $(".header");
        this.menuIcon = $(".header__menu-icon");
        this.menuContent = $(".header__menu-content");
        // this.fullWindow = $(window);
        this.events();
        // this.removeBackground();
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
        // this.fullWindow.resize(this.removeBackground.bind(this));
    }

    toggleTheMenu() {
        this.menuContent.toggleClass("header__menu-content--visible");
        this.header.toggleClass("header--expanded");
        this.menuIcon.toggleClass("header__menu-icon--close-x");
    }

    // removeBackground() {
    //     var that = this;
    //     var viewportWidth = $(window).width();
    //     if (viewportWidth > 800 && header.hasClass("header--expanded")) {
    //         that.header.removeClass("header--expanded");
    //     }
    // }
}

export default MobileMenu;