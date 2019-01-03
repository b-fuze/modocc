import React from "react";
import { connect } from "react-redux";
import { IState, IArticleBoth } from "../redux/state";

import Article from "./Article";

interface ArticleListProps {
  renderArticles: IArticleBoth[];
  scrollDiff: number;
};

interface ArticleListActions {
  // ...
};

const ArticleList = ({ renderArticles, scrollDiff }: ArticleListProps & ArticleListActions) => (
  <div className="article-list">
    <div className="scroll-proxy"></div>
    <div
      className="scroll-render"
      style={{
        top: scrollDiff + "px",
      }}>
      {renderArticles.map(article => (
        <Article
          type={article.type}
          title={article.title}
          desc={article.desc}
          notes={article.notes}
          video={article.video} />
      ))}
    </div>
  </div>
);

export default connect<ArticleListProps, ArticleListActions, {}, IState>(
  (state) => ({
    renderArticles: state.renderArticles,
    scrollDiff: state.scrollDiff,
  }),
)(ArticleList);
