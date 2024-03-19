import React from "react";
import { Link } from "react-router-dom";

const LinkTask = (props) => {
  return (
    // <div>
    //     <Link to={`/game/${props.task.gamename}`}>{props.task.gamename}</Link>
    // </div>

    <div className="text-center mt-4">
      <Link
        to={`/game/${props.task.gamename}`}
        className="text-blue-500 hover:underline"
      >
        {props.task.gamename}
      </Link>
    </div>
  );
};

export default LinkTask;
