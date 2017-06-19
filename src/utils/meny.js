/**
 * auther：马群
 * QQ：2381930754
 */
import Meny from "../assets/js/meny.js";
export default {
    deep: true,
    bind: function (el, binding) {
    var meny = Meny.create({
            // The element that will be animated in from off screen
            menuElement: $(el).find('.meny')[0],

            // The contents that gets pushed aside while Meny is active
            contentsElement: $(el).find('.contents')[0],

            // [optional] The alignment of the menu (top/right/bottom/left)
            position: Meny.getQuery().p || 'left',

            // [optional] The height of the menu (when using top/bottom position)
            height: 200,

            // [optional] The width of the menu (when using left/right position)
            width: 260,

            // [optional] Distance from mouse (in pixels) when menu should open
            threshold: 40,

            // [optional] Use mouse movement to automatically open/close
            mouse: true,

            // [optional] Use touch swipe events to open/close
            touch: true
        });
    }
}