import styled from "styled-components";

const Copyright = styled.span`
  font-weight: normal;
  color: var(--black-text-color);
  background: none;
`;

const Author = styled.span`
  padding: 0 5px;
  font-style: italic;
  color: #fffdec;
  background: #ff8d00;

  &:hover {
    cursor: pointer;
  }
`;

export default function Footer({ copyright, author }) {
  return (
    <footer>
      <Copyright>{copyright}</Copyright> Made by <Author>{author}</Author>
    </footer>
  );
}
