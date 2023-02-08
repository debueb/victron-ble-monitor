import React, { PureComponent } from 'react';
import { AreaChart, Area, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

export default class ConsumptionMonitor extends PureComponent {
  
  render() {

    const {data} = this.props;

    const dateFormatter = date => {
      return moment(date).format('DD.MM.YY HH:mm:ss');
    };

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={350}
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
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            formatter={(value) => [`${value}W`, "Consumption"]}
            labelFormatter={dateFormatter}
          />
          <Legend verticalAlign="top" height={36}/>
          <Area name="Consumption (W)" type="monotone" dataKey="consumption" stroke="#0452c7" fill="#4790d0" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
