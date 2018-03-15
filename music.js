// var clubber = new Clubber();
// var updater = cl_1520891704964(clubber);
// clubber.update();
// updater(arrayToFillWithModulatorValues);

function cl_1520891704964(clubber) {
    var bands = [
     clubber.band({"from":24,"to":48,"low":32,"high":128,"template":"0101","smooth":[0.1,0.1,-0.1,-0.1],"adapt":[0,1,0.7,1]}),clubber.band({"from":36,"to":60,"low":12,"high":128,"template":"0101","smooth":[0.1,0.1,-0.1,-0.1],"adapt":[0.2,1,0.5,1]}),clubber.band({"from":60,"to":84,"low":24,"high":128,"template":"0101","smooth":[0.1,0.1,-0.1,-0.1],"adapt":[0,1,0.5,1]}),clubber.band({"from":24,"to":48,"low":24,"high":128,"template":"0101","smooth":[-0.1,-0.1,-0.1,0.1],"adapt":[0.33,1,0.5,1]})
      ];
      var uniforms = {
        iTemp: new Float32Array(4),
        iMusic_0: new Float32Array(4),
        iMusic_1: new Float32Array(4),
        iMusic_2: new Float32Array(4),
        iMusic_3: new Float32Array(4)
      };
      function fn(output, _offset){
     function abs(x){if(x.length)return x.map(abs);return Math.abs(x)}
   function smoothstep(edge0,edge1,x){if(x.length){if(edge0.length)return x.map(function(x,i){return smoothstep(edge0[i],edge1[i],x)});return x.map(function(x,i){return smoothstep(edge0,edge1,x)})}var t=Math.min(Math.max((x-edge0)/(edge1-edge0),0),1);return t*t*(3-2*t)}
   function length(x){var sum=0;for(var i=0;i<x.length;i++){sum+=x[i]*x[i]}return Math.sqrt(sum)}
   function mix(x,y,a){if(x.length){if(a.length)return x.map(function(x,i){return mix(x,y[i],a[i])});return x.map(function(x,i){return mix(x,y[i],a)})}return x*(1-a)+y*a}
   function min(x,y){if(x.length){if(y.length)return x.map(function(x,i){return Math.min(x,y[i])});return x.map(function(x,i){return Math.min(x,y)})}return Math.min(x,y)}
   var iTemp = uniforms.iTemp;
   var iGlobalTime = uniforms.iGlobalTime;
   var iMusic_0 = uniforms.iMusic_0;
   var iMusic_1 = uniforms.iMusic_1;
   var iMusic_2 = uniforms.iMusic_2;
   var iMusic_3 = uniforms.iMusic_3;
   function fred () {
       return mix(iTemp[0], length([smoothstep(0., 0.1 + 0.1 * iTemp[0], abs(iMusic_0[0] - iMusic_0[2])), smoothstep(0., 0.1 + 0.1 * iTemp[0], abs(iMusic_0[1] - iMusic_0[3]))]), 0.16);
   };
   function fgreen () {
       return mix(iTemp[1], length([smoothstep(0., 0.1 + 0.1 * iTemp[1], abs(iMusic_1[0] - iMusic_1[2])), smoothstep(0., 0.1 + 0.1 * iTemp[1], abs(iMusic_1[1] - iMusic_1[3]))]), 0.16);
   };
   function fblue () {
       return mix(min(1., iTemp[2]), smoothstep(0.1, 0.3 + 0.2 * iTemp[2], abs(iMusic_3[0] - iMusic_3[1])), 0.16);
   };
   function falpha () {
       return mix(iTemp[3], length([smoothstep(0., 0.1 + 0.1 * iTemp[3], abs(iMusic_2[0] - iMusic_2[2])), smoothstep(0., 0.1 + 0.1 * iTemp[3], abs(iMusic_2[1] - iMusic_2[3]))]), 0.16);
   };  
    output[0 + _offset ] = iTemp[0] = fred();  
    output[1 + _offset ] = iTemp[1] = fgreen();  
    output[2 + _offset ] = iTemp[2] = fblue();  
    output[3 + _offset ] = iTemp[3] = falpha();
      }
      var ret = { bounds: new Array(4), bands: new Array(4) }, currentTime = -1;
      var update = function(output, offset) {
        uniforms.iGlobalTime = uniforms.iTime = clubber.time / 1000;
        bands.forEach(function (b,i) { ret.bounds[i] = b(uniforms['iMusic_'+i]); ret.bands[i] = uniforms['iMusic_'+i]; });
        for(var step=1000/clubber.fps; currentTime < clubber.time; currentTime += step){ fn(output, offset || 0); }
      }
      update.internal = ret;
      return update;
}

AFRAME.registerSystem("music", {
    schema: {
        src: {type: "selector"}
    },

    init: function () {
        this.clubber = new Clubber();
        this.modsFn =  cl_1520891704964(this.clubber);
        this.mods = [0, 0, 0, 0];
        this.lastTime = -1;
    },

    update: function () {
        if(this.data.src) {
            this.clubber.listen(this.data.src);
        }
    },

    getData: function(time) {
        if(time !== this.lastTime) {
            this.clubber.update();
             this.modsFn(this.mods);
            time = this.lastTime;
        }
        return this.mods;
    }
});