"use client";

import React, { useState } from "react";

export default function TextExpander({ children }) {
  const [isExpanded, setIsExpandes] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 30).join(" ") + "...";

  return (
    <span>
      {displayText}{' '}
      <button className="text-slate-700 border-b border-slate-700 leading-3 pb-1" onClick={() => setIsExpandes(!isExpanded)}>
        {isExpanded ? "show less" : "show more"}
      </button>
    </span>
  );
}
