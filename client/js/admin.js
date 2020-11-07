import html from "./html.js";
import store from "./admin/store.js";
import App from "./admin/components/App.js";
import { fetchAlarms, fetchSounds } from "./admin/actions.js";

fetch('/client/js/tzdata.json')
  .then(response => response.json())
  .then(tzdata => moment.tz.load(tzdata))
  .then(() => {
    // Render our App.
    ReactDOM.render(html`
  <${ReactRedux.Provider} store=${store}>
    <${App} />
  <//>`,
      document.getElementById("admin-root")
    );

    // Initialize our state by dispatching an action to request it from the server.
    store.dispatch(fetchAlarms())
    store.dispatch(fetchSounds())
  });
