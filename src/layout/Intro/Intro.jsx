import React from 'react';

const Intro = () => {
  return (
    <section className="intro">
      <div className="container">
        <h1 className="intro__title">
          Test assignment for
          <br className="pc" /> front-end developer
        </h1>
        <p className="intro__text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <a href="#form" className="btn btn-center">
          Sign up
        </a>
      </div>
    </section>
  );
};

export default Intro;
