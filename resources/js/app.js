import { InertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import React from "react";
import { render } from "react-dom";
import Layout from "./components/Layout";

const app = document.getElementById("app");

InertiaProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 0,

  // The color of the progress bar.
  color: "#374151",

  // Whether to include the default NProgress styles.
  includeCSS: true,

  // Whether the NProgress spinner will be shown.
  showSpinner: false,
});

render(
  <Layout>
    <InertiaApp
      initialPage={JSON.parse(app.dataset.page)}
      resolveComponent={(name) =>
        import(`./pages/${name}.tsx`).then((module) => module.default)
      }
    />
  </Layout>,
  app
);
