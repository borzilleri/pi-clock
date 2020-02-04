import html from "./html.js";
import store from "./admin/store.js";
import App from "./admin/components/App.js";

// Render our App.
ReactDOM.render(html`
  <${ReactRedux.Provider} store=${store}>
    <${App} />
  <//>`,
  document.getElementById("admin-root")
);

// Initialize our state by dispatching an action to request it from the server.
import { fetchAlarms } from "./admin/actions.js";
store.dispatch(fetchAlarms())
