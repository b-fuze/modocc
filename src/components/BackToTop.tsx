import React from "react";
import { connect } from "react-redux";

import { Type, IGoToTop, actions } from "../redux/actions";
import { IState } from "../redux/state";

import { Up } from "./Icons";

type BTTActions = {
  toTop(): IGoToTop;
};

const BackToTop = ({ toTop }: BTTActions) => (
  <div
    className="back-to-top"
    onClick={toTop}>
    <Up />
    <span className="title">Back to top</span>
  </div>
);

export default connect<{}, BTTActions, {}, IState>(
  null,
  {
    toTop: actions.goToTop,
  },
)(BackToTop);
