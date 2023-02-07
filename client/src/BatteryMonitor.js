import React, { PureComponent } from 'react';
import { AreaChart, Area, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

export default class BatteryMonitor extends PureComponent {
  
  render() {

    const {data} = this.props;

    const dateFormatter = date => {
      return moment(date).format('DD.MM.YY HH:mm:ss');
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
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
          <Area name="SoC (%)" type="monotone" dataKey="soc" stroke="#272622" fill="#4790d0" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
