import { Route, Switch } from "wouter";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Posts from "./pages/Posts";
import Blogs from "./pages/Blogs";
import Comments from "./pages/Comments";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout>
          <Overview />
        </Layout>
      </Route>
      <Route path="/users">
        <Layout>
          <Users />
        </Layout>
      </Route>
      <Route path="/products">
        <Layout>
          <Products />
        </Layout>
      </Route>
      <Route path="/posts">
        <Layout>
          <Posts />
        </Layout>
      </Route>
      <Route path="/blogs">
        <Layout>
          <Blogs />
        </Layout>
      </Route>
      <Route path="/comments">
        <Layout>
          <Comments />
        </Layout>
      </Route>
      {/* Catch-all route for all other paths including empty tabs */}
      <Route path="/:rest*">
        {(params) => {
          // In wouter, wildcard parameters have '*' in their name
          const restPath = params["rest*"];

          // Check if it's an empty tab path
          if (restPath && restPath.startsWith("empty-")) {
            // For empty tabs, render Layout which will show placeholder
            return (
              <Layout>
                <div />
              </Layout>
            );
          }
          // For all other unknown paths, show NotFound
          return (
            <Layout>
              <NotFound />
            </Layout>
          );
        }}
      </Route>
    </Switch>
  );
}

export default App;
