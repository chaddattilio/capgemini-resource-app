import React from "react";
import { Router, Link } from "@reach/router";
import { firestore } from "./firebase";
import { collectIdsAndDocs } from "./utilities";
import Home from "./Home";

class SeeResources extends React.Component {
  componentDidMount = async () => {
    const snapshot = await firestore.collection("employees").get();
    const posts = snapshot.docs.map(collectIdsAndDocs);
    console.log(posts);
    /*this.setState({ posts })*/

    /*this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs)
      this.setState({ posts })
    })*/
  };

  render() {
    return (
      <div>
        <div>You're on the see all resources page!</div>
        <Link to="/">Back to home</Link>
      </div>
    );
  }
}

export default SeeResources;
