import React from "react";
import { connect } from "react-redux";
import { ArticleType } from "../redux/state";

interface Args {
  type: ArticleType;
  title: string;
  desc: string;
  notes: string[];
  video?: string;
};

const Article = ({ type, title, desc, notes, video }: Args) => (
  <article>

  </article>
);

export default connect<{}, {}, Args>(
  (state) => ({
    // ...
  } as Args),
)(Article);
