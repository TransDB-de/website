/**
 * Popup store wrapper, to simplify code, and improve readability when calling custom popups
*/

export default ({ store }, inject) => {
	inject("okMsg", (text) => store.commit("SET_POPUP",  {type: "ok", text}));
	inject("warnMsg", (text) => store.commit("SET_POPUP",  {type: "warn", text}));
	inject("errorMsg", (text) => store.commit("SET_POPUP",  {type: "error", text}));
}
