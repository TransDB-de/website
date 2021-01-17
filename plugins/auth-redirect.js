export default ({ app, store }) => {

    // Currently not working
    app.router.beforeEach((to, from, next) => {
        if(to.meta.authRequired === true && !store.getters["getLoginToken"]) {
            next("/");
        } else {
            next();
        }

    });

}