import React from "react";

const OpenGraphTags = () => {
  return (
    <React.Fragment>
      <meta
        property="og:url"
        content="https://bazar-react.vercel.app/landing"
      />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Fabmerce is a global marketplace for unique and creative goods." />
      <meta
        property="og:description"
        content="Fabmerce is a global marketplace for unique and creative goods. It's home to a universe of products like fashion and lifestyle."
      />
      <meta property="og:image" content="/assets/images/landing/preview.png" />
    </React.Fragment>
  );
};

export default OpenGraphTags;
