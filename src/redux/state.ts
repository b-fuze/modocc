// Reducers and app state

import React from "react";
import { Type, IAnyAction } from "./actions";

export const enum CategoryRowType {
  CAT = "CAT",
  ITEM = "ITEM",
}

export interface CategoryRow {
  type: CategoryRowType;
  name: string;
}

export interface CategoryTitleRow extends CategoryRow {
  type: CategoryRowType.CAT;
  name: string;
}

export interface CategoryItemRow extends CategoryRow {
  type: CategoryRowType.ITEM;
  id: number;
  name: string;
}

export type IAnyCategoryRow =
  CategoryTitleRow
  | CategoryItemRow;

export const enum ArticleType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}

export interface IArticleBase {
  type: ArticleType;
  title: string;
  desc: string;
  notes: string[];
}

export interface IArticleText extends IArticleBase {
  type: ArticleType.TEXT;
}

export interface IArticleVideo extends IArticleBase {
  type: ArticleType.VIDEO;
  video: string;
}

export type IArticle = IArticleText | IArticleVideo;
export type IArticleBoth = IArticleText & IArticleVideo;

// Suggestion
export interface ISuggestion {
  id: number;
  name: string;
  highlightedName: string[];

  // Render-specific
  unmounting?: boolean;
}

// Main state
export interface IState {
  docTitle: string;
  headerHeight: number;
  topScrollPadding: number;
  topScrollFactor: number;
  categoryRows: IAnyCategoryRow[];

  // Search
  query: string;
  suggestions: ISuggestion[];

  // Article scrolling and rendering
  renderArticles: IArticleBoth[];
  scrollDiff: number;

  // Fancy scrolling effects
  targetScroll: number;
  isScrolling: boolean;
}

export type TPartialState = {
  [K in keyof IState]?: IState[K];
}

const initialState: IState = {
  docTitle: "modocc — beautiful docs",
  headerHeight: 80,
  topScrollPadding: 0,
  topScrollFactor: 1,
  categoryRows: [],

  query: "",
  suggestions: [],

  renderArticles: [],
  scrollDiff: 0,

  targetScroll: 0,
  isScrolling: false,
};

export function change(state: IState, changed: TPartialState) {
  return Object.assign({}, state, changed);
}

export function reducer(state = initialState, action: IAnyAction): IState {
  switch (action.type) {
      case Type.GO_TO_TOP:
        return change(state, {
          targetScroll: 0,
          isScrolling: true,
        });

      case Type.SET_DOC_TITLE:
        return change(state, {
          docTitle: action.title,
        });

      case Type.SET_SCROLL_PADDING:
        return change(state, {
          topScrollPadding: action.padding,
        });

      case Type.SET_SCROLL:
        return change(state, {
          targetScroll: action.scroll,
        });

      case Type.END_SCROLL:
        return change(state, {
          isScrolling: false,
        });

      case Type.SET_QUERY:
        return change(state, {
          query: action.query,
        });

      case Type.SET_SUGGESTIONS:
        return change(state, {
          suggestions: action.suggestions,
        });

    default:
      return state;
  }
}
