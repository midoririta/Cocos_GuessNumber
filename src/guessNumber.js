var MainLayer = cc.Layer.extend({
    sprite:null,
    dx:4,
    ctor:function () {

        this._super();
        var title = new cc.LabelTTF("猜數字遊戲", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height *7/8;
        title.setColor(cc.color(255,255,0));
        this.addChild(title,0,"mytitle");

        this.initLayout(); //initLayout是自定義 update是內建的

        this.scheduleUpdate();

        return true;
    },

    initLayout: function(){

    },

    update:function () { //define update method
        console.log("OK");
        var title = this.getChildByName("mytitle"); //上面已addChild 所以可以get
        if(title.x + title.width/2 >= cc.winSize.width ||
        title.x - title.width/2 <= 0){
            this.dx *= -1;
        }

        title.x += this.dx;
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

