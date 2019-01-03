// Actions

export const enum Type {
  GO_TO_TOP = "GO_TO_TOP",
  SET_DOC_TITLE = "SET_DOC_TITLE",
  SET_SCROLL_PADDING = "SET_SCROLL_PADDING",
  SET_SCROLL = "SET_SCROLL",
  END_SCROLL = "END_SCROLL",
  FOCUS_ARTICLE = "FOCUS_ARTICLE",
  SET_QUERY = "SET_QUERY",
  SET_SUGGESTIONS = "SET_SUGGESTIONS",
};

export interface IAction {
  type: Type;
}

export interface IGoToTop extends IAction {
  type: Type.GO_TO_TOP;
}

export interface ISetDocTitle extends IAction {
  type: Type.SET_DOC_TITLE;
  title: string;
}

export interface ISetScrollPadding extends IAction {
  type: Type.SET_SCROLL_PADDING;
  padding: number;
}

export interface ISetScroll extends IAction {
  type: Type.SET_SCROLL;
  scroll: number;
}

export interface IEndScroll extends IAction {
  type: Type.END_SCROLL;
}

export interface IFocusArticle extends IAction {
  type: Type.FOCUS_ARTICLE;
  id: number;
}

export interface ISetQuery extends IAction {
  type: Type.SET_QUERY;
  query: string;
}

// Copied verbatim from state.ts
interface ISuggestion {
  id: number;
  name: string;
  highlightedName: string[];

  // Render-specific
  unmounting?: boolean;
}

export interface ISetSuggestions extends IAction {
  type: Type.SET_SUGGESTIONS;
  suggestions: ISuggestion[];
}

export type IAnyAction =
  IGoToTop
  | ISetScrollPadding
  | ISetScroll
  | IEndScroll
  | ISetDocTitle
  | IFocusArticle
  | ISetQuery
  | ISetSuggestions;

// Action factory
export const actions = {
  goToTop(): IGoToTop {
    return {
      type: Type.GO_TO_TOP,
    };
  },

  setScrollPadding(scrollp: number): ISetScrollPadding {
    return {
      type: Type.SET_SCROLL_PADDING,
      padding: scrollp,
    };
  },

  setDocTitle(title: string): ISetDocTitle {
    return {
      type: Type.SET_DOC_TITLE,
      title,
    };
  },

  setScroll(scroll: number): ISetScroll {
    return {
      type: Type.SET_SCROLL,
      scroll,
    };
  },

  endScroll(): IEndScroll {
    return {
      type: Type.END_SCROLL,
    };
  },

  focusArticle(id: number): IFocusArticle {
    return {
      type: Type.FOCUS_ARTICLE,
      id,
    };
  },

  setQuery(query: string): ISetQuery {
    return {
      type: Type.SET_QUERY,
      query,
    };
  },

  setSuggestions(suggestions: ISuggestion[], prevSuggestions: ISuggestion[]): ISetSuggestions {
    const newIds: {
      [id: number]: number;
    } = {
      // id: 1,
    };

    const newSuggestions = suggestions.slice();
    const removeSuggestions: [number, ISuggestion][] = [];

    for (let i=0; i<suggestions.length; i++) {
      const suggestion = suggestions[i];
      newIds[suggestion.id] = i;
    }

    // TODO: Generalize this unmounting animation thing thingy

    // Prune removed suggestions and animate suggestions to-be-removed
    for (let i=0; i<suggestions.length; i++) {
      const suggestion = suggestions[i];

      if (!suggestion.unmounting) {
        if (!(suggestion.id in newIds)) {
          // Find previous suggestion in the new suggestions, and insert before
          // it (if any)
          let prevIndex = 0;
          let prevSuggestion = suggestions[0];

          if (prevSuggestion) {
            // TODO: Do backwards for faster speeds and stuff
            while (prevIndex < i && prevSuggestion) {
              prevIndex++;
            }
          }

          removeSuggestions.push([prevIndex, suggestion]);
        }
      }
    }

    // Add (to be removed) suggestions to the new suggestions
    for (let i=removeSuggestions.length-1; i>-1; i--) {
      const suggestion = removeSuggestions[i];
      newSuggestions.splice(suggestion[0], 0, suggestion[1]);
    }

    return {
      type: Type.SET_SUGGESTIONS,
      suggestions: newSuggestions,
    };
  },
};
