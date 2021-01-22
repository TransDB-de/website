/*
    Script controlled scrolling effects can be useful, but have their issues.
    For one, the scroll event triggers often, causing potential performance conserns.
    It is alos executed asynchronosly of the draw thread, leading the jittering animations.
    This plugin implements a custom scroll event, to mitigate these issues.

    The event runs on the requestAnimationFrame loop, synchonizing it to the render loop,
    avoiding invisible style changes and letting the browser make performance decisions.

    For more details on scroll effects, see:
    https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
*/

export default ({}, inject) => {

    let events = [];
    let lastScroll = 0;

    /**
     * Adds an scroll event handler
     * @param {(scrollYPosition, scrollYDistance) => void} callback 
     */
    const addScrollEvent = (callback) => {
        events.push(callback);
    }

    /**
     * Removes all occurences of an scroll event handler
     * @param {(scrollYPosition, scrollYDistance) => void} callback 
     */
    const removeScrollEvent = (callback) => {
        events = events.filter(ev => ev !== callback);
    }

    inject("addScrollEvent", addScrollEvent);
    inject("removeScrollEvent", removeScrollEvent);

    const eventLoop = () => {
        let scroll = window.scrollY;
        let scrollDist = scroll - lastScroll;
    
        if (lastScroll !== scroll) {
    
            events.forEach(ev => {
                ev(scroll, scrollDist);
            });
    
        }
    
        lastScroll = scroll;
    
        window.requestAnimationFrame(eventLoop);
    }

    // start loop
    window.requestAnimationFrame(eventLoop);

}
