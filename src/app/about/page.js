import React from "react";

const About = () => {
  return (
    <div
      style={{
        textAlign: "left",
        width: "75%",
        margin: "auto",
        lineHeight: "2rem",
      }}
    >
      <h1 style={{ textAlign: "center" }}>About Us</h1>
      <div style={{ marginTop: "2rem" }}>
        Welcome to Coder Blog Center, a dynamic platform where ideas find their
        voice and minds converge. Dive into a diverse tapestry of articles,
        essays, and stories crafted by a global community of thought leaders,
        writers, and creators. With a focus on quality content and meaningful
        connections, Coder Blog Center invites you to embark on a journey of
        discovery, insight, and inspiration.
      </div>
      <h3 style={{ textAlign: "left", marginTop: "2rem" }}>Features:</h3>
      <ul style={{ listStyle: "none" }}>
        <li>
          <strong>Thoughtful Curation :</strong> Our team of editors tirelessly
          scours the platform to bring you the best and most relevant content on
          a wide range of topics. From technology trends to personal
          development, there's something for everyone.
        </li>
        <br />
        <li>
          <strong>Authorship and Contribution :</strong> Have a story to tell or
          an idea to share? Medium provides a welcoming space for writers of all
          levels to publish and be heard. Contribute to the global conversation.
        </li>
        <br />
        <li>
          <strong>Accessibility and Inclusivity :</strong> We're committed to
          making content accessible to all. Our platform is designed with
          features that prioritize inclusivity, ensuring everyone can engage
          with ideas.
        </li>
      </ul>
    </div>
  );
};

export default About;

export const generateMetadata = () => {
  return {
    title: "Coder Blog Center - About",
  };
};
