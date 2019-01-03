import React from "react";
import { connect } from "react-redux";
import cc from "classcat";

import { IState, ISuggestion } from "../redux/state";
import defaults from "../defaults";
import { IFocusArticle, ISetQuery, actions } from "../redux/actions";

import { Close } from "./Icons";

interface HeaderProps {
  title: string;
  query: string;
  suggestions: ISuggestion[];
};

interface HeaderOwnProps {
  inputRef: React.RefObject<HTMLInputElement>;
};

interface HeaderActions {
  focusArticle(id: number): IFocusArticle;
  setQuery(query: string): ISetQuery;
};

const HeaderElement = ({ query, title, suggestions, focusArticle, setQuery, inputRef }: HeaderProps & HeaderOwnProps & HeaderActions) => (
  <div className="main-header">
    {/* Upper section */}
    <div className="essential">
      <h1 className="doc-title-hero">{title}</h1>
      <div className="row">
        <div className="doc-title-small">
          <h1 className="title">{title}</h1>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef} />

          <div className="actions">
            <Close />
          </div>
          <div className="suggestions">
            {/* Render fancy suggestions */}
            {suggestions.map(s => (
              <div
                className={cc([
                  "suggestion",
                  s.unmounting && "suggestion-unmount",
                ])}
                key={s.id}
                onClick={() => {
                  focusArticle(s.id);
                }}>
                {s.highlightedName.map((portion, i) => (
                  i % 2 ? (
                    <span className="highlighted">{portion}</span>
                  ) : (
                    <span>{portion}</span>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Extra buttons */}
    <div className="extra">
      <div className="action">

      </div>
      <div className="action">

      </div>
      <div className="action">

      </div>
    </div>
  </div>
);

export const Header = connect<HeaderProps, HeaderActions, HeaderOwnProps, IState>(
  (state, ownProps) => ({
    title: state.docTitle,
    query: state.query,
    inputRef: ownProps.inputRef,
    suggestions: state.suggestions,
  }),
  {
    focusArticle: actions.focusArticle,
    setQuery: actions.setQuery,
  },
)(HeaderElement);

// Footer
export const Footer = ({  }) => (
  <div className="footer">
    Docs
  </div>
);

// Overlay
interface OverlayProps {
  factor: number;
}

const OverlayElement = ({ factor }: OverlayProps) => (
  <div
    className="overlay"
    style={{
      opacity: factor,
      pointerEvents: factor === 1 ? "all" : "none",
    }}>
  </div>
);

export const Overlay = connect<OverlayProps, {}, {}, IState>(
  (state, ownProps) => ({
    factor: state.topScrollFactor,
  }),
)(OverlayElement);
