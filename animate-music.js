AFRAME.registerComponent("animate", {
    schema: {
        rotSpeed: {type: "number", default: 0},
        posSpeed: {type: "number", default: 0},
        posPhase: {type: "number", default: 0},
        rotPhase: {type: "number", default: 0},
        radius: {type: "number", default: 30},
        rotMod: {type: "int", default: -1},
        posMod: {type: "int", default: -1}
    },

    init: function () {

    },

    update: function (oldData) {
        
    },

    tick: function (time) {
        var system = this.el.sceneEl.systems["music"];
        var mods = system.getData(time);

        var pm = this.data.posMod > -1 ? mods[this.data.posMod] * 0.5 : 0;
        var rm = this.data.rotMod > -1 ? mods[this.data.rotMod] * 0.5 : 0;

        var rt = pt = time/1000;
        
        pt = (pt + pm) * this.data.posSpeed + this.data.posPhase * Math.PI * 2;
        
        rt = (rt + rm) * this.data.rotSpeed + this.data.rotPhase * Math.PI * 2;
        
        this.el.object3D.position.x = Math.sin(pt) * this.data.radius; 
        this.el.object3D.position.z = Math.cos(pt) * this.data.radius;
        this.el.object3D.rotation.y = rt;
    }
});