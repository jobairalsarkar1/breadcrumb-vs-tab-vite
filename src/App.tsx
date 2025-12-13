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
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
