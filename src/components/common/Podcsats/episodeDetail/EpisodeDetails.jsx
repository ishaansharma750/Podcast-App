import React from 'react'
import Button from '../../button/Button'

const EpisodeDetails = ({ title, description, audioFile, onClick , index}) => {
  return (
    <div>
      <h1 style={{ textAlign: "left", marginBottom: 0 }}>
        {index}. {title}
      </h1>
      <p className="podcast-description">{description}</p>
      <Button
        text={"Play"}
        onClick={() => onClick(audioFile)}
        width={"100px"}
      />
    </div>
  );
};

export default EpisodeDetails