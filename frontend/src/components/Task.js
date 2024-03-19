import React from 'react'

function Task(props) {
  return (
    <div>
      {props.task.status}
      {props.task.gamename}
      {props.task.deadline}

    </div>
  )
}

export default Task
