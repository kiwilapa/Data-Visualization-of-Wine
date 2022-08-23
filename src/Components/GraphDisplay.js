import React from 'react';
import ReactECharts from 'echarts-for-react';
import data from '../Wine-Data.json'

const GraphDisplay = () => {

    // extracting data from dataset 
    const colorIntensity = data.map(e => e['Color intensity'])
    const hue = data.map(e => e['Hue'])
    const alcohol = data.map(e => e['Alcohol'])

    // creating set to remove duplicate elements from alcohol array
    const noRepeatition = new Set(alcohol)
    
    // pushing those non duplicate element in a new array
    // new alcohol array initially empty
    const uniqueAlcohol = [] 

    // this will contain the average malic acid data 
    const averageMalicAcid = [] 
    for (let value of noRepeatition) {
        uniqueAlcohol.push(value)
        // below calculating the average malic acid value
        /*filtering the dataset corressponds to the value of alcohol and using map method to
        create new array consisting only malic acid values */
        const malicAcidArr = data.filter(e => e['Alcohol'] === value)
            .map(e => e['Malic Acid']) 
        // calculating the average of malic acid
        const sumOfMalicAcid = malicAcidArr.reduce((total, current) => {
            return total + current
        })
        const avgMalicValue = sumOfMalicAcid/malicAcidArr.length
        averageMalicAcid.push(avgMalicValue.toFixed(2))
    }


    // graph configuration for colorIntensity vs hue
    const colorIntensityVsHue = {
        xAxis: {
            type: 'category',
            data: colorIntensity,
            name : 'Color Intensity',
            nameLocation : 'middle',
            nameGap : 40            
        },
        yAxis: {
            type: 'value',
            name : 'Hue',
            nameLocation : 'middle',
            nameGap : 20
            
        },
        series: [
        {
            data: hue,
            type: 'scatter',
            smooth: true,
        },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };

    // graph configuration for malic acid vs alcohol
    const malicAcidVsAlcohol = {
        xAxis: {
            type: 'category',
            data: uniqueAlcohol,
            name: 'Alcohol',
            nameLocation : 'middle',
            nameGap : 40
        },
        yAxis: {
            type: 'value',
            name : 'Malic Acid',
            nameLocation : 'middle',
            nameGap : 20
        },
        series: [
        {
            data: averageMalicAcid,
            type: 'bar',
            smooth: true,
        },
        ],
        tooltip: {
            trigger: 'axis',
        },
    };


    return (
        <div style = {{marginTop : 50}}>
            <div style = {{marginBottom : 50}}>
                <h3 className = 'graphTitle'>
                    Scatter plot of Color intensity Vs Hue
                </h3>
                <ReactECharts option={colorIntensityVsHue} />
            </div>
            <div>
                <h3 className = 'graphTitle' >
                    Bar graph of Malic Acid vs Alcohol
                </h3>
                <ReactECharts option={malicAcidVsAlcohol} />
            </div>

        </div>
    )
}

export default GraphDisplay