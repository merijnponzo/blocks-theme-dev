import React, { useState, useEffect } from "react";

const TagList = ({ tags, tagClass, onTagClick }) => {

  const CreateTags = () => {
    const elements = [];
    for (const key in tags) {
      const tag = tags[key];
        elements.push(
          <div
            key={tag.id}
            onClick={() => onTagClick(tag)}
            className={`ponzo--editor-tag ${tagClass} ${tag.active ? "active" : ""}`}
          >
            {tag.label}
          </div>
        );
    }
    return elements;
  };


  return (
    <div className="ponzo--editor-tags">
      <CreateTags />
    </div>
  );
};

export default TagList;
