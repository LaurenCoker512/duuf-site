import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader {
    constructor() {
        this.headerLogo = $(".header__logo");
        this.headerTriggerElement = $(".large-hero__title-small");
        this.createHeaderWaypoint();
    }

    createHeaderWaypoint() {
        var that = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
                if (direction == "down") {
                    that.headerLogo.addClass("header--scroll");
                } else {
                    that.headerLogo.removeClass("header--scroll");
                }
            }
        });
    }
}

export default StickyHeader;