import React, { Component } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Ufo from "./science/ufo";
import posed from "react-pose";
import { tween, easing, styler } from "popmotion";

const PageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 50px;
  align-items: center;
  align-content: center;
  flex-direction: column;
  background-image: linear-gradient(45deg, #e4a788 0%, #f0e14a 100%);
  button {
    margin-top: 20px;
    background-color: #00a8ff; /* Green */
    border: none;
    color: #f5f6fa;
    padding: 15px 32px;
    text-align: center;
    border-radius: 10px;
    width: 50%;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
`;
const Zodiacs = styled(Dropdown)`
  width: 50%;
  background: papayawhip;
  border-radius: 5px;
  .Dropdown-control,
  .Dropdown-option {
    background: #b7e4f9ff;
    font-size: 23px;
  }
`;

const NameInput = styled.input`
  width: 50%;
  height: 45px;
  margin: 50px 0 25px 0;
  padding: 5px;
  color: "palevioletred";
  background: #b7e4f9ff;
  border: none;
  font-size: 23px;
  border-radius: 3px;
`;

const options = [
  "Aries: Mar 20 – Apr 20",
  "Taurus: Apr 20 – May 21",
  "Gemini: May 21 – Jun 21",
  "Cancer: Jun 21 – Jul 23",
  "Leo: Jul 23 – Aug 23",
  "Virgo: Aug 23 – Sep 23",
  "Libra: Sep 23 – Oct 23",
  "Scorpio: Oct 23 – Nov 22",
  "Sagittarius: Nov 22 – Dec 22",
  "Capricorn: Dec 22 – Jan 20",
  "Aquarius: Jan 20 – Feb 18",
  "Pisces:   Feb 18 – Mar 20"
];

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      zodiac: null
    };
  }

  beginButton = () => {
    const { name, zodiac } = this.state;
    const { start } = this.props;
    // if (name && zodiac) {
    if (name && zodiac) {
      const divStyler = styler(document.querySelector(".ufo"));
      tween({
        from: 0,
        to: { x: 1000, rotate: -30 },
        duration: 1500,
        ease: easing.backOut,
        flip: 1,
        yoyo: 1
      }).start(divStyler.set);

      return (
        <button
          onClick={() => {
            start(this.state);
          }}
        >
          Start
        </button>
      );
    }
  };

  render() {
    return (
      <PageContainer>
        <Ufo width="25%" className="ufo" />
        <NameInput
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
          placeholder="Name"
        />
        <Zodiacs
          options={options}
          onChange={e => {
            this.setState({ zodiac: e.value });
          }}
          value={"Zodiac"}
          placeholder="Select an option"
        />
        {this.beginButton()}
      </PageContainer>
    );
  }
}

export default Name;
