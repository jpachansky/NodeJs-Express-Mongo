var Service = require('node-windows').Service;
 
// Create a new service object
var svc = new Service({
  name:'my-jobs',
  description: '',
  script: require('path').join(__dirname,'server.js'),
  env: {
    name: "NODE_ENV",
    value: 'development'
  }
});
 
// Listen for the 'install' event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
// install the service
svc.install();