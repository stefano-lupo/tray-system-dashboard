import React from 'react';
import  { Chart } from 'react-google-charts'

import objectToArray from '../../Util'

const options = {
    title: "Food Waste by Ingredient",
    legend: "none"
};

const dataset = data => {
    let withHeaders = [["Menu Item", "Waste (KG)"]]
    data.forEach(d => withHeaders.push(d));
    return withHeaders
}

export default class WasteByIngredientScan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: objectToArray(props.data)
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps == this.props) {
            return;
        }

        const data = objectToArray(this.props.data)
        this.setState({
            data
        });
    }

    render() {
        const { data } = this.state;
        
        if (!data) {
            return null;
        }

        return <Chart
            chartType="PieChart"
            data={dataset(data)}
            options={options}
            width="80%"
            height="100%"
            legendToggle 
    />
    }
}