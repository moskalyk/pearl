// MIT License

// Copyright (c) 2022

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Blueberry X Technologies Inc. 

// Modified for use with Blueberry test unit devices

import React, { useState, useEffect } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
// import logo from './ic_blueberry_logo.png';

var s1 = [0.0];
var s2 = [0.0];
var s3 = [0.0];
var s4 = [0.0];
var s5 = [0.0];
var s6 = [0.0];

var state10mm = {s1,s2,s3,s4,s5,s6};
var state27mm = {s1,s2,s3,s4,s5,s6};
var stateSync10mm27mm = {s1,s2,s3};

var arrayHeader = ["timestamp","ambient","740nm10mm","940nm10mm","850nm10mm","740nm27mm","940nm27mm","850nm27mm"];
var arrayHeader2021 = ["timestamp","740nm10mm","940nm10mm","850nm10mm","740nm27mm","940nm27mm","850nm27mm"];
var deviceVersion = "2021";
let arrayData = [];
let arrayData10mm = [];
let arrayData27mm = [];
var windowLength = 102;
var writeCharacteristic = ""; 

function Blueberry(props) {

  var labelsData = [];
  var labelsData10mm = [];
  var labelsData27mm = [];
  var dataAmbient10mm = [];
  var dataAmbient27mm = [];
  var data740nm10mm = [];
  var data940nm10mm = [];
  var data850nm10mm = [];
  var data740nm27mm = [];
  var data940nm27mm = [];
  var data850nm27mm = [];

  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);

  const [chartData10mm, setChartData10mm] =  React.useState({
   labels: labelsData10mm,
   datasets: [
     {
      data:[],
      label: 'ambient10mm',
      backgroundColor: 'rgba(50, 99, 50, 0.5)',
      borderColor: 'rgb(50, 99, 50)',
      fill: false,
      strokeWidth: 2,
      hidden: true
    },
    {
      data:[],
      label: '740nm10mm',
      backgroundColor: 'rgba(200, 99, 50, 0.5)',
      borderColor: 'rgb(200, 99, 50)',
      fill: false,
      strokeWidth: 2,
      hidden: true
    },
    {
      data:[],
      label: '940nm10mm',
      backgroundColor: 'rgba(99, 200, 50, 0.5)',
      borderColor: 'rgb(99, 200, 50)',
      fill: false,
      strokeWidth: 2,
      hidden: true
    },
    {
      data:[],
      label: '850nm10mm',
      backgroundColor: 'rgba(50, 99, 200, 0.5)',
      borderColor: 'rgb(50, 99, 200)',
      fill: false,
      strokeWidth: 2
    }
   ] 
  })

  const [chartData27mm, setChartData27mm] = React.useState({
   labels: labelsData27mm,
   datasets: [
    {
      data:[],
      label: 'ambient27mm',
      backgroundColor: 'rgba(50, 99, 50, 0.5)',
      borderColor: 'rgb(50, 99, 50)',
      fill: false,
      strokeWidth: 2,
      hidden: true
    },
    {
      data:[],
      label: '740nm27mm',
      backgroundColor: 'rgba(200, 99, 50, 0.5)',
      borderColor: 'rgb(200, 99, 50)',
      fill: false,
      strokeWidth: 2,
      hidden: true
    },
    {
      data:[],
      label: '940nm27mm',
      backgroundColor: 'rgba(99, 200, 50, 0.5)',
      borderColor: 'rgb(99, 200, 50)',
      fill: false,
      strokeWidth: 2,
      hidden: true
    },
    {
      data:[],
      label: '850nm27mm',
      backgroundColor: 'rgba(50, 99, 200, 0.5)',
      borderColor: 'rgb(50, 99, 200)',
      fill: false,
      strokeWidth: 2
    }
   ]
  })

  /**
   * Let the user know when their device has been disconnected.
   */
  const onDisconnected = (event) => {
    alert(`Blueberry disconnected - please reconnect`);
    setIsDisconnected(true);
  }

/**
   * Update the value shown on the web page when a notification is
   * received.
   */
  const handleCharacteristicValueChanged10mm = (event) => {
      let fNIRSData = event.target.value;

      var time = Date.now();

      let s1 = [
        time,
        fNIRSData.getInt32(2),
        fNIRSData.getInt32(6),
        fNIRSData.getInt32(10)
      ]

      let s2 = [
        time+40,
        fNIRSData.getInt32(16),
        fNIRSData.getInt32(20),
        fNIRSData.getInt32(24)
      ]

      let s3 = [
        time+80,
        fNIRSData.getInt32(30),
        fNIRSData.getInt32(34),
        fNIRSData.getInt32(38)
      ]

      let s4 = [
        time+120,
        fNIRSData.getInt32(44),
        fNIRSData.getInt32(48),
        fNIRSData.getInt32(52)
      ]

      let s5 = [
        time+160,
        fNIRSData.getInt32(58),
        fNIRSData.getInt32(62),
        fNIRSData.getInt32(66)
      ]

      let s6 = [
        time+200,
        fNIRSData.getInt32(72),
        fNIRSData.getInt32(76),
        fNIRSData.getInt32(80)
      ]

      state10mm = {s1, s2, s3, s4, s5, s6};

      arrayData10mm.push(s1);
      arrayData10mm.push(s2);
      arrayData10mm.push(s3);
      arrayData10mm.push(s4);
      arrayData10mm.push(s5);
      arrayData10mm.push(s6);
      // console.log(s1 + s2 + s3 + s4 + s5 + s6);
      updateChart10mm();
  }
  
  /**
   * Update the value shown on the web page when a notification is
   * received.
   */
  const handleCharacteristicValueChanged27mm = (event) => {
      let fNIRSData = event.target.value;

      let s1 = [
        fNIRSData.getInt32(2),
        fNIRSData.getInt32(6),
        fNIRSData.getInt32(10)
      ]

      let s2 = [
        fNIRSData.getInt32(16),
        fNIRSData.getInt32(20),
        fNIRSData.getInt32(24)
      ]

      let s3 = [
        fNIRSData.getInt32(30),
        fNIRSData.getInt32(34),
        fNIRSData.getInt32(38)
      ]

      let s4 = [
        fNIRSData.getInt32(44),
        fNIRSData.getInt32(48),
        fNIRSData.getInt32(52)
      ]

      let s5 = [
        fNIRSData.getInt32(58),
        fNIRSData.getInt32(62),
        fNIRSData.getInt32(66)
      ]

      let s6 = [
        fNIRSData.getInt32(72),
        fNIRSData.getInt32(76),
        fNIRSData.getInt32(80)
      ]

      state27mm = {s1, s2, s3, s4, s5, s6};
      arrayData27mm.push(s1);
      arrayData27mm.push(s2);
      arrayData27mm.push(s3);
      arrayData27mm.push(s4);
      arrayData27mm.push(s5);
      arrayData27mm.push(s6);
      // console.log(s1 + s2 + s3 + s4 + s5 + s6);
      updateChart27mm();
  }

  /**
   * Update the value shown on the web page when a notification is
   * received.
   */
  const handleCharacteristicValueChangedSync10mm27mm = (event) => {
      let fNIRSData = event.target.value;
      // console.log(fNIRSData);

      let s1 = [
        fNIRSData.getInt32(0),
        fNIRSData.getInt32(4),
        fNIRSData.getInt32(8),
        fNIRSData.getInt32(12),
        fNIRSData.getInt32(16),
        fNIRSData.getInt32(20),
        fNIRSData.getInt32(24),
        fNIRSData.getInt32(28)
      ]

      let s2 = [
        fNIRSData.getInt32(32),
        fNIRSData.getInt32(36),
        fNIRSData.getInt32(40),
        fNIRSData.getInt32(44),
        fNIRSData.getInt32(48),
        fNIRSData.getInt32(52),
        fNIRSData.getInt32(56),
        fNIRSData.getInt32(60)
      ]

      let s3 = [
        fNIRSData.getInt32(64),
        fNIRSData.getInt32(68),
        fNIRSData.getInt32(72),
        fNIRSData.getInt32(76),
        fNIRSData.getInt32(80),
        fNIRSData.getInt32(84),
        fNIRSData.getInt32(88),
        fNIRSData.getInt32(92)
      ]

      stateSync10mm27mm = {s1, s2, s3};
      arrayData.push(s1);
      arrayData.push(s2);
      arrayData.push(s3);
      // console.log(s1 + "," + s2 + "," + s3);
      updateChart();
  }

  /**
   * Attempts to connect to a Bluetooth device and subscribe to
   * readings using the service.
   * https://github.com/GoogleChrome/samples/tree/gh-pages/web-bluetooth
   */
  const connectToDeviceAndSubscribeToUpdates = async () => {
    try {
      // Search for Bluetooth devices that advertise a battery service
      const device = await navigator.bluetooth
        .requestDevice({
          filters: [{ namePrefix: 'blueberry' }],
          optionalServices: ['0f0e0d0c-0b0a-0908-0706-050403020100']
        });

      setIsDisconnected(false);

      // Add an event listener to detect when a device disconnects
      device.addEventListener('gattserverdisconnected', onDisconnected);

      // Try to connect to the remote GATT Server running on the Bluetooth device
      const server = await device.gatt.connect();

      // Get the service from the Bluetooth device
      const service = await server.getPrimaryService('0f0e0d0c-0b0a-0908-0706-050403020100');

      const characteristics = await service.getCharacteristics();

      // const decoder = new TextDecoder('utf-8');
      for (const characteristic of characteristics) {
          //console.log(characteristic);

          if ('1f1e1d1c-1b1a-1918-1716-151413121110' == characteristic.uuid){
            //write characteristic
            //console.log(characteristic);
            writeCharacteristic = await service.getCharacteristic('1f1e1d1c-1b1a-1918-1716-151413121110');
          }

          if ('4f4e4d4c-4b6a-6968-6766-656463426160' == characteristic.uuid){

            const characteristic10mm = await service.getCharacteristic('4f4e4d4c-4b6a-6968-6766-656463426160');
            // Subscribe to notifications
            characteristic10mm.startNotifications();

            // When there are changes, call a function
            characteristic10mm.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged10mm);

            deviceVersion = "2021"
          }

          if('4f4e4d4c-4b5a-5958-5756-555453425150' == characteristic.uuid){

            const characteristic27mm = await service.getCharacteristic('4f4e4d4c-4b5a-5958-5756-555453425150');
            // Subscribe to notifications
            characteristic27mm.startNotifications();

            // When there are changes, call a function
            characteristic27mm.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged27mm);
          } 

          if('4f4e4d4c-4b8a-8988-8786-858483428180' == characteristic.uuid){

            const characteristicSync10mm27mm = await service.getCharacteristic('4f4e4d4c-4b8a-8988-8786-858483428180');
            // Subscribe to notifications
            characteristicSync10mm27mm.startNotifications();

            // When there are changes, call a function
            characteristicSync10mm27mm.addEventListener('characteristicvaluechanged', handleCharacteristicValueChangedSync10mm27mm);

            deviceVersion = "2022";
          }
      }
    } catch(error) {
      console.log(`There was an error: ${error}`);
    }
  };

  const updateDataset = () => {

      if (labelsData.length == windowLength){
        labelsData.shift();
        labelsData.shift();
        labelsData.shift();

        dataAmbient10mm.shift();
        dataAmbient10mm.shift();
        dataAmbient10mm.shift();

        data740nm10mm.shift();
        data740nm10mm.shift();
        data740nm10mm.shift();

        data940nm10mm.shift();
        data940nm10mm.shift();
        data940nm10mm.shift();

        data850nm10mm.shift();
        data850nm10mm.shift();
        data850nm10mm.shift();

        dataAmbient27mm.shift();
        dataAmbient27mm.shift();
        dataAmbient27mm.shift();

        data740nm27mm.shift();
        data740nm27mm.shift();
        data740nm27mm.shift();

        data940nm27mm.shift();
        data940nm27mm.shift();
        data940nm27mm.shift();

        data850nm27mm.shift();
        data850nm27mm.shift();
        data850nm27mm.shift();
      }

      var time = Date.now();
      millisToMinutesAndSeconds(time);

      labelsData.push(millisToMinutesAndSeconds(time));
      dataAmbient10mm.push(stateSync10mm27mm.s1[1]); //firmware outputs magnitude of ambient values
      dataAmbient27mm.push(stateSync10mm27mm.s1[1]); //firmware outputs magnitude of ambient values
      data740nm10mm.push(stateSync10mm27mm.s1[2]);
      data940nm10mm.push(stateSync10mm27mm.s1[3]);
      data850nm10mm.push(stateSync10mm27mm.s1[4]);
      data740nm27mm.push(stateSync10mm27mm.s1[5]);
      data940nm27mm.push(stateSync10mm27mm.s1[6]);
      data850nm27mm.push(stateSync10mm27mm.s1[7]);

      labelsData.push(millisToMinutesAndSeconds(time+40));
      dataAmbient10mm.push(stateSync10mm27mm.s2[1]);
      dataAmbient27mm.push(stateSync10mm27mm.s2[1]);
      data740nm10mm.push(stateSync10mm27mm.s2[2]);
      data940nm10mm.push(stateSync10mm27mm.s2[3]);
      data850nm10mm.push(stateSync10mm27mm.s2[4]);
      data740nm27mm.push(stateSync10mm27mm.s2[5]);
      data940nm27mm.push(stateSync10mm27mm.s2[6]);
      data850nm27mm.push(stateSync10mm27mm.s2[7]);

      labelsData.push(millisToMinutesAndSeconds(time+80));
      dataAmbient10mm.push(stateSync10mm27mm.s3[1]);
      dataAmbient27mm.push(stateSync10mm27mm.s3[1]);
      data740nm10mm.push(stateSync10mm27mm.s3[2]);
      data940nm10mm.push(stateSync10mm27mm.s3[3]);
      data850nm10mm.push(stateSync10mm27mm.s3[4]);
      data740nm27mm.push(stateSync10mm27mm.s3[5]);
      data940nm27mm.push(stateSync10mm27mm.s3[6]);
      data850nm27mm.push(stateSync10mm27mm.s3[7]);

      refreshChart10mm27mm();
  };

  const updateDataset10mm = () => {

      if (labelsData10mm.length == (windowLength+6)){
        data740nm10mm.shift();
        data940nm10mm.shift();
        data850nm10mm.shift();
        labelsData10mm.shift();
        data740nm10mm.shift();
        data940nm10mm.shift();
        data850nm10mm.shift();
        labelsData10mm.shift();
        data740nm10mm.shift();
        data940nm10mm.shift();
        data850nm10mm.shift();
        labelsData10mm.shift();
        data740nm10mm.shift();
        data940nm10mm.shift();
        data850nm10mm.shift();
        labelsData10mm.shift();
        data740nm10mm.shift();
        data940nm10mm.shift();
        data850nm10mm.shift();
        labelsData10mm.shift();
        data740nm10mm.shift();
        data940nm10mm.shift();
        data850nm10mm.shift();
        labelsData10mm.shift();
      }

      var time = Date.now();
      millisToMinutesAndSeconds(time);

      labelsData10mm.push(millisToMinutesAndSeconds(time));
      data740nm10mm.push(state10mm.s1[1]);
      data940nm10mm.push(state10mm.s1[2]);
      data850nm10mm.push(state10mm.s1[3]);

      labelsData10mm.push(millisToMinutesAndSeconds(time+40));
      data740nm10mm.push(state10mm.s2[1]);
      data940nm10mm.push(state10mm.s2[2]);
      data850nm10mm.push(state10mm.s2[3]);

      labelsData10mm.push(millisToMinutesAndSeconds(time+80));
      data740nm10mm.push(state10mm.s3[1]);
      data940nm10mm.push(state10mm.s3[2]);
      data850nm10mm.push(state10mm.s3[3]);

      labelsData10mm.push(millisToMinutesAndSeconds(time+120));
      data740nm10mm.push(state10mm.s4[1]);
      data940nm10mm.push(state10mm.s4[2]);
      data850nm10mm.push(state10mm.s4[3]);

      labelsData10mm.push(millisToMinutesAndSeconds(time+160));
      data740nm10mm.push(state10mm.s5[1]);
      data940nm10mm.push(state10mm.s5[2]);
      data850nm10mm.push(state10mm.s5[3]);

      labelsData10mm.push(millisToMinutesAndSeconds(time+200));
      data740nm10mm.push(state10mm.s6[1]);
      data940nm10mm.push(state10mm.s6[2]);
      data850nm10mm.push(state10mm.s6[3]);

      refreshChart10mm();
  };

  const updateDataset27mm = () => {

      if (labelsData27mm.length == 108){
        data740nm27mm.shift();
        data940nm27mm.shift();
        data850nm27mm.shift();
        labelsData27mm.shift();
        data740nm27mm.shift();
        data940nm27mm.shift();  
        data850nm27mm.shift();
        labelsData27mm.shift();
        data740nm27mm.shift();
        data940nm27mm.shift();  
        data850nm27mm.shift();
        labelsData27mm.shift();
        data740nm27mm.shift();
        data940nm27mm.shift();  
        data850nm27mm.shift();
        labelsData27mm.shift();
        data740nm27mm.shift();
        data940nm27mm.shift();  
        data850nm27mm.shift();
        labelsData27mm.shift();
        data740nm27mm.shift();
        data940nm27mm.shift();
        data850nm27mm.shift();
        labelsData27mm.shift();
      }

      var time = Date.now();
      millisToMinutesAndSeconds(time);

      labelsData27mm.push(millisToMinutesAndSeconds(time));
      data740nm27mm.push(state27mm.s1[0]);
      data940nm27mm.push(state27mm.s1[1]); 
      data850nm27mm.push(state27mm.s1[2]);

      labelsData27mm.push(millisToMinutesAndSeconds(time+40));
      data740nm27mm.push(state27mm.s2[0]);
      data940nm27mm.push(state27mm.s2[1]); 
      data850nm27mm.push(state27mm.s2[2]);

      labelsData27mm.push(millisToMinutesAndSeconds(time+80));
      data740nm27mm.push(state27mm.s3[0]);
      data940nm27mm.push(state27mm.s3[1]);
      data850nm27mm.push(state27mm.s3[2]);

      labelsData27mm.push(millisToMinutesAndSeconds(time+120));
      data740nm27mm.push(state27mm.s4[0]);
      data940nm27mm.push(state27mm.s4[1]);
      data850nm27mm.push(state27mm.s4[2]);

      labelsData27mm.push(millisToMinutesAndSeconds(time+160));
      data740nm27mm.push(state27mm.s5[0]);
      data940nm27mm.push(state27mm.s5[1]);   
      data850nm27mm.push(state27mm.s5[2]);

      labelsData27mm.push(millisToMinutesAndSeconds(time+200));
      data740nm27mm.push(state27mm.s6[0]);
      data940nm27mm.push(state27mm.s6[1]);   
      data850nm27mm.push(state27mm.s6[2]);

      refreshChart27mm();
  };

  const refreshChart10mm27mm = () => {

        setChartData10mm({
                      ...chartData10mm,
                      labels: labelsData,
                      datasets:[
                          {
                              ...chartData10mm.datasets[0],
                              data: dataAmbient10mm
                          },
                          {
                              ...chartData10mm.datasets[1],
                              data: data740nm10mm
                          },
                          {
                              ...chartData10mm.datasets[2],
                              data: data940nm10mm
                          },
                          {
                              ...chartData10mm.datasets[3],
                              data: data850nm10mm
                          }
                      ]})

       setChartData27mm({
                      ...chartData27mm,
                      labels: labelsData,
                      datasets:[
                          {
                              ...chartData27mm.datasets[0],
                              data: dataAmbient27mm
                          },
                          {
                              ...chartData27mm.datasets[1],
                              data: data740nm27mm
                          },
                          {
                              ...chartData27mm.datasets[2],
                              data: data940nm27mm
                          },
                          {
                              ...chartData27mm.datasets[3],
                              data: data850nm27mm
                          }
                      ]})
  };

  const refreshChart10mm = () => {

        setChartData10mm({
                      labels: labelsData10mm,
                      datasets:[
                          {
                              label: 'ambient10mm',
                              backgroundColor: 'rgba(50, 99, 50, 0.5)',
                              borderColor: 'rgb(50, 99, 50)',
                              fill: false,
                              strokeWidth: 2,
                              hidden: true,
                              data: dataAmbient10mm
                          },
                          {
                              label: '740nm10mm',
                              backgroundColor: 'rgba(200, 99, 50, 0.5)',
                              borderColor: 'rgb(200, 99, 50)',
                              fill: false,
                              strokeWidth: 2,
                              hidden: true,
                              data: data740nm10mm
                          },
                          {
                              data:[],
                              label: '940nm10mm',
                              backgroundColor: 'rgba(99, 200, 50, 0.5)',
                              borderColor: 'rgb(99, 200, 50)',
                              fill: false,
                              strokeWidth: 2,
                              hidden: true
                          },
                          {
                              label: '850nm10mm',
                              backgroundColor: 'rgba(50, 99, 200, 0.5)',
                              borderColor: 'rgb(50, 99, 200)',
                              fill: false,
                              strokeWidth: 2,
                              data: data850nm10mm
                          }
                      ]})
  };

  const refreshChart27mm = () => {

        setChartData27mm({
                      labels: labelsData27mm,
                      datasets:[
                          {
                              label: 'ambient27mm',
                              backgroundColor: 'rgba(50, 99, 50, 0.5)',
                              borderColor: 'rgb(50, 99, 50)',
                              fill: false,
                              strokeWidth: 2,
                              hidden: true,
                              data: dataAmbient27mm
                          },
                          {
                              label: '740nm27mm',
                              backgroundColor: 'rgba(200, 99, 50, 0.5)',
                              borderColor: 'rgb(200, 99, 50)',
                              fill: false,
                              strokeWidth: 2,
                              hidden: true,
                              data: data740nm27mm
                          },
                          {
                              data:[],
                              label: '940nm27mm',
                              backgroundColor: 'rgba(99, 200, 50, 0.5)',
                              borderColor: 'rgb(99, 200, 50)',
                              fill: false,
                              strokeWidth: 2,
                              hidden: true
                          },
                          {
                              label: '850nm27mm',
                              backgroundColor: 'rgba(50, 99, 200, 0.5)',
                              borderColor: 'rgb(50, 99, 200)',
                              fill: false,
                              strokeWidth: 2,
                              data: data850nm27mm
                          }
                      ]})
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var millisStr = millis % 1000;
    return (seconds < 10 ? '0' : '') + seconds + ":" + millisStr;
  };

  const updateChart = () => {
      updateDataset();
  };

  const updateChart10mm = () => {
      updateDataset10mm();
  };

  const updateChart27mm = () => {
      updateDataset27mm();
  };

  const export_csv = () => {
    if (deviceVersion == "2022"){
      let header = arrayHeader.join(",") + '\n';
      let csv = header;
      arrayData.forEach( array => {
          csv += array.join(",")+"\n";
      });

      let csvData = new Blob([csv], { type: 'text/csv' });  
      let csvUrl = URL.createObjectURL(csvData);

      const now = Date.now();
      const nowDate = new Date(now);
      var csvTime = nowDate.toISOString(); // "2020-06-13T18:30:00.000Z"
      let hiddenElement = document.createElement('a');
      hiddenElement.href = csvUrl;
      hiddenElement.target = '_blank';
      hiddenElement.download = csvTime + '.csv';
      hiddenElement.click();
      console.log("csv saved v2022");
    }
    if (deviceVersion == "2021"){
      let header = arrayHeader2021.join(",") + '\n';
      let csv = header;

      var minSize = arrayData10mm.length;
      if (arrayData27mm.length < minSize){
        minSize = arrayData27mm.length
      }

      for (let i = 0; i < minSize; i++) {
        csv += arrayData10mm[i].join(",") + "," + arrayData27mm[i].join(",") + "\n";
      }

      let csvData = new Blob([csv], { type: 'text/csv' });  
      let csvUrl = URL.createObjectURL(csvData);

      const now = Date.now();
      const nowDate = new Date(now);
      var csvTime = nowDate.toISOString(); // "2020-06-13T18:30:00.000Z"
      let hiddenElement = document.createElement('a');
      hiddenElement.href = csvUrl;
      hiddenElement.target = '_blank';
      hiddenElement.download = csvTime + '.csv';
      hiddenElement.click();
      console.log("csv saved v2021");
    }
  }

  const clear_data = () => {
      windowLength = 102;
      arrayData = [];
      arrayData10mm = [];
      arrayData27mm = [];
      labelsData = [];
      labelsData10mm = [];
      labelsData27mm = [];
      dataAmbient10mm = [];
      dataAmbient27mm = [];
      data740nm10mm = [];
      data940nm10mm = [];
      data850nm10mm = [];
      data740nm27mm = [];
      data940nm27mm = [];
      data850nm27mm = [];
      refreshChart10mm();
      refreshChart27mm();
      console.log('manual refresh post clear');
  }

  const set_Red = () => {
      // [0xA1, R1,G1,B1, R2,G2,B2, R3,G3,B3]
      // convert values to 0 to 255
      try {
          // console.log('Setting Characteristic User Description...');
          var ledCtrlBuffer = new Uint8Array([161, 255, 0, 0, 255, 0, 0, 255, 0, 0]);
          var arrayBuffer = ledCtrlBuffer.buffer;
          writeCharacteristic.writeValue(arrayBuffer);
          // console.log('> Characteristic User Description changed to: ' + ledCtrlBuffer);
      } catch(error) {
          console.log(error);
      }
  }

  const set_Green = () => {
      try {
          // console.log('Setting Characteristic User Description...');
          var ledCtrlBuffer = new Uint8Array([161, 0, 255, 0, 0, 255, 0, 0, 255, 0]);
          var arrayBuffer = ledCtrlBuffer.buffer;
          writeCharacteristic.writeValue(arrayBuffer);
          // console.log('> Characteristic User Description changed to: ' + ledCtrlBuffer);
      } catch(error) {
          console.log(error);
      }
  }

  const set_Blue = () => {
      try {
          // console.log('Setting Characteristic User Description...');
          var ledCtrlBuffer = new Uint8Array([161, 0, 0, 255, 0, 0, 255, 0, 0, 255]);
          var arrayBuffer = ledCtrlBuffer.buffer;
          writeCharacteristic.writeValue(arrayBuffer);
          // console.log('> Characteristic User Description changed to: ' + ledCtrlBuffer);
      } catch(error) {
          console.log(error);
      }
  }

  const set_4seconds = () => {
      windowLength = 102;
      refreshChart10mm();
      refreshChart27mm();
  }

  const set_8seconds = () => {
      windowLength = 204;
      refreshChart10mm();
      refreshChart27mm();
  }

  const set_12seconds = () => {
      windowLength = 306;
      refreshChart10mm();
      refreshChart27mm();
  }

  const refreshCharts = () => {
    refreshChart10mm();
    refreshChart27mm();
    console.log('manual refresh');
  }  

  // When the component mounts, check that the browser supports Bluetooth
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
    }
    if(props.led < 0.3 && props.led > 0){
      set_Red()
    }else if(props.led > 0.3 && props.led < .60){
      set_Green()
    } else {
      set_Blue()
    }
    refreshChart10mm();
    refreshChart27mm();
  }, [props.led]);

  return (
    <div className="app">
      <div className="row">
          <a href="https://www.blueberryx.com/" target="_blank">{/*<img className="app-logo" src={logo} alt="logo"/>*/}blueberry</a>
          <button className="greenButton" onClick={refreshCharts}>Refresh</button>
          <button className="blueButton" onClick={connectToDeviceAndSubscribeToUpdates}>Connect Blueberry</button>
          <button className="blueButton" onClick={export_csv}>Download CSV</button>
          <button className="blueButton" onClick={clear_data}>Clear</button>
          <button className="greenButton" onClick={set_4seconds}>4 seconds</button>
          <button className="greenButton" onClick={set_8seconds}>8 seconds</button>
          <button className="greenButton" onClick={set_12seconds}>12 seconds</button> 
      </div>
      <div className="row">
          <button className="redButton" onClick={set_Red}>Red LED</button>
          <button className="greenButton" onClick={set_Green}>Green LED</button>
          <button className="blueButton" onClick={set_Blue}>Blue LED</button>
      </div>
      <div>

      </div>
      {!supportsBluetooth &&
        <p>This browser doesn't support the Web Bluetooth API</p>
      }
    </div>
  );
}

export default Blueberry;