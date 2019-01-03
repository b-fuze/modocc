import React from "react";
import { connect } from "react-redux";

import { IState, CategoryRowType, IAnyCategoryRow } from "../redux/state";
import { IFocusArticle, actions } from "../redux/actions";

interface CategoriesProps {
  rows: IAnyCategoryRow[];
};

interface CategoriesActions {
  selectArticle(id: number): IFocusArticle;
};

const Categories = ({ rows }: CategoriesProps & CategoriesActions) => (
  <div className="main-categories">
    {rows.map(r => (
      r.type === CategoryRowType.CAT ? (
        <div className="category-name">{r.name}</div>
      ) : (
        <div className="category-item">{r.name}</div>
      )
    ))}
  </div>
);

export default connect<CategoriesProps, CategoriesActions, {}, IState>(
  (state) => ({
    rows: state.categoryRows,
  }),
  {
    selectArticle: actions.focusArticle,
  },
)(Categories);
