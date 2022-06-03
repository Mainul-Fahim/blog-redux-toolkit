import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PostView from "./features/posts/PostView";
import SingleBlogPost from "./features/posts/SingleBlogPost";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
          <Home />
          </Route>
          <Route path="/home">
          <Home />
          </Route>
          <Route path="/posts">
            <PostView />
          </Route>
          <Route path="/post/:postId">
            <SingleBlogPost />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
