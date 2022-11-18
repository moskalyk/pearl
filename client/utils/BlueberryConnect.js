
/**
* @modified by Blueberry
* @author Charlie Gerard / http://charliegerard.github.io reference
*/

const services = {
  fnirsService: {
    name: 'fnirs service',
    uuid: '0f0e0d0c-0b0a-0908-0706-050403020100' 
  }
}

const characteristics = {
  commandCharacteristic: {
    name: 'write characteristic',
    uuid: '1f1e1d1c-1b1a-1918-1716-151413121110'
  },
  fnirsCharacteristic: {
    name: 'read fnirs data characteristic',
    uuid: '3f3e3d3c-3b3a-3938-3736-353433323130'
  }
}

// 3f3e3d3c-3b3a-3938-3736-353433323130
// 4f4e4d4c-4b4a-4948-4746-454443424140

var _thisA;
var stateA = {};
var writeCharac;

class BlueberryConnect {
  constructor(name){
    _thisA = this;
    this.name = name;
    this.services = services;
    this.characteristics = characteristics;
    this.standardServer = null;
  }

  connect(){
    return navigator.bluetooth.requestDevice({
      filters: [
        {name: this.name},
        {
          services: [services.fnirsService.uuid]
        }
      ]
    })
    .then(device => {
      console.log('Device discovered', device.name);
      return device.gatt.connect();
    })
    .then(server => {
      console.log('server device: '+ Object.keys(server.device));

      this.getServices([services.fnirsService], [characteristics.commandCharacteristic, characteristics.fnirsCharacteristic], server);
    })
    .catch(error => {console.log('error',error)})
  }

  getServices(requestedServices, requestedCharacteristics, server){
    this.standardServer = server;

    requestedServices.filter((service) => {

      //start up control command service
      if(service.uuid == services.fnirsService.uuid){
        _thisA.getControlService(requestedServices, requestedCharacteristics, this.standardServer);
      }
    })
  }

  getControlService(requestedServices, requestedCharacteristics, server){
      let controlService = requestedServices.filter((service) => { return service.uuid == services.fnirsService.uuid});
      let commandChar = requestedCharacteristics.filter((char) => {return char.uuid == characteristics.commandCharacteristic.uuid});

      // Before having access to fNIRS data, we need to indicate to the Blueberry that we want to receive this data.
      return server.getPrimaryService(controlService[0].uuid)
      .then(service => {
        console.log('getting service: ', controlService[0].name);
        return service.getCharacteristic(commandChar[0].uuid);
      })
      .then(characteristic => {
        writeCharac = characteristic;
      })
      // .then(descriptor => {
      //   writeDescriptor = descriptor;
      //   console.log('Reading Descriptor...');
      //   //return descriptor.readValue();
      //   return;
      // })
      .then(_ => {
        let fnirsService = requestedServices.filter((service) => {return service.uuid == services.fnirsService.uuid});

        if(fnirsService.length > 0){
          console.log('getting service: ', fnirsService[0].name);
          _thisA.getfNIRSData(fnirsService[0], characteristics.fnirsCharacteristic, server);
        }
      })
      .catch(error =>{
        console.log('error: ', error);
      })
  }

   //    RGB Controller
    //    0xA0FF0000
    //    example 0xA0FF0000 //RED ON
    //    example 0xA0FFFF00 //RED ON GREEN ON BLUE OFF
    //    0xA0 = RGB control flag 

  ctrlCommand(hexValue, redValue, greenValue, blueValue){
      //console.log('getting characteristic: ', commandChar[0].name);
      //let commandChar = characteristics.commandCharacteristic.uuid;
      let commandValue = new Uint8Array([0xA0],[redValue], [greenValue], [blueValue]);
      writeCharac.writeValue(commandValue)
      .then(_ => {
        console.log('> Characteristic User Description changed to: ' + value);
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });

  }

  handlefNIRSDataChanged(event){
    //byteLength of fNIRSdata
    let fNIRSData = event.target.value
    // console.log(fNIRSData);
    
    let valueHemo1 = event.target.value.getInt32(2);    
    let valueHemo2 = event.target.value.getInt32(6);
    let valueHemo3 = event.target.value.getInt32(10);

    var data = {
      fNIRS: {
        L1: valueHemo1,
        L2: valueHemo2,
        L3: valueHemo3
      }
    }

    //console.log(data);

    stateA = {
      fNIRS: data.fNIRS
    }

    _thisA.onStateChangeCallback(stateA);
  }

  little2big(i) {
    return (i&0xff)<<24 | (i&0xff00)<<8 | (i&0xff0000)>>8 | (i>>24)&0xff;
  }

  onStateChangeCallback() {}

  getfNIRSData(service, characteristic, server){
    return server.getPrimaryService(service.uuid)
    .then(newService => {
      console.log('getting characteristic: ', characteristic.name);
      return newService.getCharacteristic(characteristic.uuid)
    })
    .then(char => {
      char.startNotifications().then(res => {
        char.addEventListener('characteristicvaluechanged', _thisA.handlefNIRSDataChanged);
      })
    })
  }

  onStateChange(callback){
    _thisA.onStateChangeCallback = callback;
  }
}

export default BlueberryConnect;