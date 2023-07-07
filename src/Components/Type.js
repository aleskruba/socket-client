import React from 'react';
import { useSpring, animated } from 'react-spring';

const TypingAnimation = ({ text }) => {
  const props = useSpring({
    from: { width: '0%' },
    to: { width: '100%' },
    config: { duration: 100 },
    reset: true,
  });

  return (
    <div>
      <animated.div style={props}>{text}</animated.div>
    </div>
  );
};

export default TypingAnimation;
