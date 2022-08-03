import React from 'react';
import { channel } from '../../../main';
import HeartIcon from '../hearIcon';
import { Player } from '@lottiefiles/react-lottie-player';
import styles from './styles.module.scss';
import animationData from '../../../assets/lottie/heart2.json';

interface props {
  count: number;
  id: string;
}

const VotesCount = ({ count, id }: props) => {
  const [voteCount, setVoteCount] = React.useState(count);
  const [playAnimation, setPlayAnimation] = React.useState(false);

  channel.bind(id, (data: any) => {
    setVoteCount(data.message);
    setPlayAnimation(true);
    setTimeout(() => {
      setPlayAnimation(false);
    }, 2500);
  });

  if (voteCount === 0) return <div></div>;

  return (
    <div className={styles.container}>
      <p className={styles.count}>{voteCount}</p>
      <HeartIcon className={styles.icon} />
      {playAnimation && (
        <div className={styles.lottie}>
          <Player
            autoplay
            src={animationData}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default VotesCount;
