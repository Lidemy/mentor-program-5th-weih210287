import styled from "styled-components";

const Manual = styled.div`
  display: block;
  padding: 3px;
  font-size: 0.8em;
  font-weight: bold;
  letter-spacing: 1px;
  color: #fffdec;
  background: #ff8d00;
  border: 2px outset #5f8985;
  cursor: pointer;
  border-radius: 3px;

  &:active {
    border-style: inset;
  }

  & ~ & {
    margin-top: 10px;
  }
`;

export default function Menu({ showManual, onClick }) {
  const show = showManual ? "HIDE" : "SHOW";

  return (
    <div>
      <Manual onClick={() => onClick()}>
        {show}
        <br />
        MANUAL
      </Manual>
      <Manual onClick={() => window.location.reload()}>RESTART</Manual>
    </div>
  );
}
