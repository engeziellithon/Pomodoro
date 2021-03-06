import React from "react";
import PropTypes from "prop-types";

import { Text } from "./styles";

function FormattedTime(props: any) {
  const { time } = props;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const clockTime = `${minutes < 10 ? `0${minutes}` : minutes} : ${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return <Text style={{ color: "#fff" }}>{clockTime}</Text>;
}

FormattedTime.propTypes = {
  time: PropTypes.number.isRequired,
};

export default FormattedTime;
