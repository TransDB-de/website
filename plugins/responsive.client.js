export default ({ store }) => {
    store.commit("setMobile", window.innerWidth <= 720);
    
    let mediaQuery = window.matchMedia('(max-width: 720px)');

    mediaQuery.addEventListener("change", (e) => {
        store.commit("setMobile", e.matches);
    });
}
