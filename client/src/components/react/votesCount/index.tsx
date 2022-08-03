import React from 'react';
import styles from './styles.module.scss';

interface props {
  count: number;
  id: string;
}

const VotesCount = ({ count, id }: props) => {
  const [voteCount, setVoteCount] = React.useState(count);

  return <div className={styles.container}>{voteCount}</div>;
};

export default VotesCount;
