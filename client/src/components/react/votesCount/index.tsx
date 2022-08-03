import React from 'react';
import { channel } from '../../../main';
import styles from './styles.module.scss';

interface props {
  count: number;
  id: string;
}

const VotesCount = ({ count, id }: props) => {
  const [voteCount, setVoteCount] = React.useState(count);

  channel.bind(id, (data: any) => {
    setVoteCount(data.message);
  });

  return <div className={styles.container}>{voteCount}</div>;
};

export default VotesCount;
