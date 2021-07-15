import React from 'react';
import { configure, addParameters } from "@storybook/react";
import storyTheme from './theme';

addParameters({
  options: {
    theme: storyTheme,
  },
});

function loadStories() {
  const guides = require.context("../guides/", true, /\.stories\.(js|mdx)$/);
  const req = require.context("../src/", true, /\.stories\.(js|mdx)$/);
  const stories = [];
  stories.push(guides("./GetStarted.stories.mdx"));
  req.keys().forEach(story => stories.push(req(story)));
  return stories;
}

configure(loadStories, module);
