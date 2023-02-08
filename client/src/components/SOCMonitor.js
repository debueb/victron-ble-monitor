import React, { PureComponent } from 'react';
import { AreaChart, Area, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

export default class SOCMonitor extends PureComponent {
  
  render() {

    const {data} = this.props;

    const dateFormatter = date => {
      return moment(date).format('DD.MM HH:mm:ss');
    };

    return (
      <div style={{height: 400 + 'px'}}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis 
              dataKey="timestamp"
              interval="preserveStartEnd"
              scale="time" 
              type="number"
              tickFormatter={dateFormatter}
              domain={[data[0].timestamp, data[data.length - 1].timestamp]}
            />
            <YAxis
              type="number" 
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "SoC"]}
              labelFormatter={dateFormatter}
            />
            <Legend verticalAlign="top" height={36}/>
            <Area name="SoC (%)" type="monotone" dataKey="soc" stroke="#2E76B6" fill="#4790d0" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
