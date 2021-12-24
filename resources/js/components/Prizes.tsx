import React from "react";
import styled from "styled-components";
import prizes from "../lib/prizes";

const PrizesContainer = styled.div`
  display: flex;
  border: 2px solid #ffffff30;
  margin-top: 30px;

  & > div:first-child {
    border-right: 2px solid #ffffff30;
    width: 20%;
    min-width: 150px;

    > div {
      padding: 10px 20px;
      font-size: 1rem;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      &.selected {
      }
    }
  }
  > div > p {
    margin: 0 15px;
    margin-top: 10px;
    font-size: 1.1rem;
  }

  ul {
    margin-left: 30px;
    padding: 25px 15px;
    padding-left: 10px;
    padding-top: 0;
    font-size: 1.3rem;
  }
  li {
    line-height: 2.5rem;
    list-style-type: disc;
  }
  img {
    height: 2rem;
    width: auto;
    margin-bottom: -5px;
    display: inline;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    & > div:first-child {
      border: none;
      border-bottom: 2px solid #ffffff30;
      width: 100%;
    }
  }
`;

const Highlight = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 25px 15px;
  margin-bottom: 0;
`;

function Prizes() {
  const [selected, setSelected] = React.useState(0);

  return (
    <PrizesContainer>
      <div>
        {prizes.map(({ tier, color }, i) => (
          <div
            key={i}
            className={selected === i ? "selected" : ""}
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? color + "10" : "",
              color,
            }}
          >
            {tier}
          </div>
        ))}
      </div>
      <div>
        {prizes[selected].highlight && (
          <>
            <Highlight
              dangerouslySetInnerHTML={{
                __html: prizes[selected].highlight || "",
              }}
            />
            <p>In addition to</p>
          </>
        )}
        <ul style={{ paddingTop: !prizes[selected].highlight ? "15px" : "" }}>
          {prizes[selected].content.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>
    </PrizesContainer>
  );
}

export default Prizes;
