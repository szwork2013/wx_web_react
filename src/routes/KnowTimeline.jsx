import React from 'react'
import {Timeline} from 'antd'

function KnowTimeline() {
  let items = [
    {
      content: "11111",
      time: "2016-08-08 10:10:10"
    }, {
      content: "22222",
      time: "2016-08-08 10:10:10"
    }, {
      content: "33333",
      time: "2016-08-08 10:10:10"
    }, {
      content: "44444",
      time: "2016-08-08 10:10:10"
    }
  ]

  return (
    <Timeline>
      <Timeline.Item>hahahahha</Timeline.Item>
    </Timeline>
  )
}

KnowTimeline.propTypes = {}

export default KnowTimeline
