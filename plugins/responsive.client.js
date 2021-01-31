export default ({ store }) => {
    store.commit("SET_MOBILE", window.innerWidth <= 720);
    
    let mediaQuery = window.matchMedia('(max-width: 720px)');

    mediaQuery.addEventListener("change", (e) => {
        store.commit("SET_MOBILE", e.matches);
    });
}
