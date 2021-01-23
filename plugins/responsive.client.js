export default ({ store }) => {
    let mediaQuery = window.matchMedia('(max-width: 720px)');

    mediaQuery.addEventListener("change", (e) => {
        store.commit("setMobile", e.matches);
    });
}
