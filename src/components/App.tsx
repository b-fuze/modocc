  // import * as React from "react";
import { connect } from "react-redux";
import React from "react";

// Include styling
import "./styles/App.scss";

// Include components
import { Header, Overlay, Footer } from "./Chrome";
import Content from "./Content";
import BackToTop from "./BackToTop";

// Include Redux actions
import { Type, ISetScrollPadding, actions } from "../redux/actions"

interface Props {
  setScrollPadding(padding: number): ISetScrollPadding;
};

class App extends React.Component<Props> {
  searchBarRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.searchBarRef = React.createRef();
  }

  componentDidMount() {
    const sbRef = this.searchBarRef.current;

    if (sbRef) {
      // Scroll to top
      scrollTo(0, 0);

      const rect = sbRef.getBoundingClientRect();
      this.props.setScrollPadding(rect.bottom);
    }
  }

  render() {
    return (
      <div className="main">
        <Header inputRef={this.searchBarRef} />
        <Overlay />
        <Content />
        <BackToTop />
        <Footer />
      </div>
    );
  }
}

export default connect<{}, Props>(
  null,
  {
    setScrollPadding: actions.setScrollPadding,
  },
)(App);
