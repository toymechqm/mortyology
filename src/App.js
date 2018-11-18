import React, { Component } from "react";
import styled from "styled-components";
import Name from "./name";
import regular from "./fonts/regular.ttf";
import schwifty from "./fonts/schwifty.ttf";
import beth from "./chars/beth.png";
import Jerry from "./chars/Jerry.png";
import bird from "./chars/beth.png";
import gas from "./chars/gas.png";
import hammer from "./chars/hammer.png";
import seek from "./chars/seek.png";
import Squanchy from "./chars/Squanchy.png";
import pickle from "./chars/pickle.png";
import morty from "./chars/beth.png";
import summer from "./chars/summer.png";
import gum from "./chars/gum.png";
import slow from "./chars/slow.png";

const NameContainer = styled.div`
  font-family: "schwifty";
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  text-shadow: -1px 0 #44bd32, 0 1px #4cd137, 1px 0 #4cd137, 0 -1px #4cd137;
  .char {
    display: block;
    width: auto;
    max-width: 100%;
    max-height: 250px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: -webkit-linear-gradient(
    -23deg,
    rgb(162, 220, 220),
    rgb(43, 156, 199)
  );
  background: linear-gradient(-23deg, rgb(162, 220, 220), rgb(43, 156, 199));
  @font-face {
    font-family: "regular";
    src: url(${regular}) format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "schwifty";
    src: url(${schwifty}) format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "regular";
`;

const Horoscope = styled.ul`
  color: #dcdde1;
  font-size: 23px;
  text-align: center;
  padding: 25px;
  list-style: none;
  .date {
    margin: 10px 0;
  }
  .color {
    border: 3px dashed #7f8fa6;
    padding: 5px;
    margin: 10px;
  }
  .lucky-time {
    margin: 10px 0;
    display: flex;
  }
`;

const Bubble = styled.div`
  position: relative;
  background: #cdff00;
  border-radius: 0.4em;
  width: 60%;
  padding: 10px;
  margin: 20px;
  font-size: 19px;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 73px solid transparent;
    border-top-color: #cdff00;
    border-bottom: 0;
    border-right: 0;
    margin-left: -36.5px;
    margin-bottom: -73px;
  }
`;

const Description = styled.div`
  .gum {
    float: right;
    right: 0;
    bottom: 0;
  }
`;

const ColorBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => (props.color ? props.color : null)};
  border: 2px solid black;
  border-radius: 50px;
  margin: 0 auto;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      json: {}
    };
  }

  apiCall(name, zodiac) {
    zodiac = zodiac.split(":")[0];

    const URL = `https://aztro.sameerkumar.website/?sign=${zodiac}&day=today`;
    fetch(URL, {
      method: "POST"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ json, name, zodiac });
      });
  }

  getHoroscope = userInfo => {
    this.apiCall(userInfo.name, userInfo.zodiac);
  };

  getImage = userInfo => {
    const images = [
      beth,
      Jerry,
      bird,
      gas,
      hammer,
      seek,
      Squanchy,
      pickle,
      morty,
      summer
    ];
    const image = images[Math.floor(Math.random() * images.length)];
    return <img src={image} alt="character" className="char" />;
  };

  randomImage = () => {
    const greetings = [
      "Hello",
      "Peace on all worlds",
      "Squanchy squanch",
      "Greetings",
      "Greetings Earthling"
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    return greeting;
  };

  randomGreeting = () => {
    const greetings = [
      "Hello",
      "Peace on all worlds",
      "Squanchy squanch",
      "Greetings",
      "Greetings Earthling"
    ];
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    return greeting;
  };

  render() {
    console.log(this.state);
    const { name, zodiac, json } = this.state;
    if (!name && !zodiac) {
      return <Name start={this.getHoroscope} />;
    }
    return (
      <PageContainer>
        <NameContainer>
          {this.getImage()}
          <h1>
            {this.randomGreeting()} Earth-{json.lucky_number} {name}!
          </h1>
        </NameContainer>
        <Horoscope>
          <div className="date">
            It is currently {json.current_date} on Earth-{json.lucky_number}.
          </div>
          <div>
            Intergalactic beings birthed between {json.date_range} should feel a
            certain feeling of '{json.mood}' caused by their moon's
            gravitational pull. Your ideal mate would be a {json.compatibility}{" "}
            from Earth-
            {(Math.floor(Math.random() * 10) + 2) * json.lucky_number}.
          </div>

          <div className="lucky-time">
            <img src={slow} alt="slow" width={150} height={150} />
            <br />
            In Birdculture {json.lucky_time}, would be an important time for
            you.
          </div>

          <div className="color">
            The color <ColorBox color={json.color} /> will shield you from the
            intergalactic federation and bring peace among worlds.
          </div>
        </Horoscope>
        <Description>
          <Bubble>{json.description}</Bubble>
          <img src={gum} className="gum" alt="gum" />
        </Description>
      </PageContainer>
    );
  }
}

export default Main;
