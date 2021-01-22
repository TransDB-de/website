export default ({ store }) => {
    let isMobile = false;

    window.addEventListener("resize", () => {

        if (window.innerWidth < 720 && !isMobile) {

            isMobile = true;
            store.commit("setMobile", isMobile);

        } else if (window.innerWidth >= 720 && isMobile) {

            isMobile = false;
            store.commit("setMobile", isMobile);

        }

    })
}
