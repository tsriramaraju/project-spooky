import React, { useEffect, useState } from 'react';
import { channel } from '../../../main';
import HeartIcon from '../hearIcon';
import { Player } from '@lottiefiles/react-lottie-player';
import styles from './styles.module.scss';
import heartLottie from '../../../assets/lottie/heart2.json';
import heartBreakLottie from '../../../assets/lottie/heartBreak.json';

interface props {
  count: number;
  id: string;
  userId: string;
}

const VotesCount = ({ count, id, userId }: props) => {
  const [voteCount, setVoteCount] = useState(count);
  const [animationData, setAnimationData] = useState<any>(heartLottie);
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleAnimation = (upVoted: boolean) => {
    setAnimationData(upVoted ? heartLottie : heartBreakLottie);
    setPlayAnimation(true);
    setTimeout(
      () => {
        setPlayAnimation(false);
      },
      upVoted ? 2500 : 500
    );
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (count !== voteCount) {
      handleAnimation(count > voteCount);
      setVoteCount(count);
    }
    channel.bind(id, (data: any) => {
      const { votes, upVoted, userId: user } = data.message;
      // if user is not the same as the one who voted, then update the vote count
      if (user.toString() === userId.toString()) return;
      handleAnimation(upVoted);
      setVoteCount(votes);
    });

    return () => {
      channel.unbind(id);
    };
  }, [count]);

  if (voteCount === 0) return <div></div>;

  return (
    <div className={styles.container}>
      <p className={styles.count}>{voteCount}</p>
      <HeartIcon className={styles.icon} />
      {playAnimation && (
        <div className={styles.lottie}>
          <Player
            autoplay
            loop={false}
            src={animationData}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default VotesCount;
