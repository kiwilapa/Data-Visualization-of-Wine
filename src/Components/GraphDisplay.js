import React from 'react';
import ReactECharts from 'echarts-for-react';
import data from '../Wine-Data.json'

const GraphDisplay = () => {

    // extracting data from dataset 
    const colorIntensity = data.map(e => e['Color intensity'])
    const hue = data.map(e => e['Hue'])
    const alcohol = data.map(e => e['Alcohol'])
    const malicAcid = data.map(e => e['Malic Acid'])


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
            data: alcohol,
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
            data: malicAcid,
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