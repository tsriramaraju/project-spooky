import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import VotesCount from '../components/react/votesCount';

export const getRoot = (element: HTMLDivElement) => {
  const root = createRoot(element);
  return root;
};

export const renderReact = (
  root: Root,
  value: number,
  id: string,
  sessionId: string
) => {
  root.render(<VotesCount count={value} id={id} sessionId={sessionId} />);
};
