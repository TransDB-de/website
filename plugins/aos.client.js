import AOS from "aos";
import "aos/dist/aos.css";

export default ({ app, $config }) => {

	app.AOS = new AOS.init($config.aos);

};