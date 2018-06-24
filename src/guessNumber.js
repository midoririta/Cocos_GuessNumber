var MainLayer = cc.Layer.extend({
    sprite:null,
    nums: new Array(10),
    rects: new Array(10),
    back: null,
    enter: null,
    input: null,
    inputNum: "",
    mesg: null,
    dx:4,
    ctor:function () {

        this._super();
        var title = new cc.LabelTTF("猜數字遊戲", "", 48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height *7/8;
        title.setColor(cc.color(255,255,0));
        this.addChild(title,0,"mytitle");

        this.initLayout(); //initLayout是自定義 update是內建的
        this.setUpmymouse(this);//setUpmymouse是自定義

        this.scheduleUpdate(); //有這行title才會有動畫

        return true;
    },

    setUpmymouse: function(layer){ //layer just a var
        if ('mouse' in cc.sys.capabilities){

            //define listener obj
            var mouseListener = { //mouseListener is obj not function
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                  var x = event.getLocationX();
                  var y = event.getLocationY();
                  //console.log(x + "x" + y);

                  var point = new cc.Point(x,y);

                  for(i=0; i < layer.rects.length; i++){
                      if(cc.rectContainsPoint(layer.rects[i],point)){
                          console.log("press: " + i);



                          layer.inputNum += i;
                          layer.input.setString(layer.inputNum);


                          break;
                      }
                  }

                },

            };
            cc.eventManager.addListener(mouseListener, this);
        }
    },

    initLayout: function(){
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        var px, py;
        for( i = 0; i < this.nums.length ; i++){
            this.nums[i] = new cc.Sprite("#number" + i + ".png");

            if(i==0){
                px = 3;
                py = 1;
            }
            else{
                px = (i-1) % 3 + 2;
                py = parseInt((i-1)/3) +2;
            }


            // 789
            // 456
            // 123

            this.nums[i].x = cc.winSize.width * px /6 ;
            this.nums[i].y = cc.winSize.height * py /8 ;


            //define every number's click rects
            this.rects[i] = new cc.Rect(
              this.nums[i].x - this.nums[i].width/2, //bec img's (0,0) is center nedd change
              this.nums[i].y - this.nums[i].height/2,
              this.nums[i].width ,
              this.nums[i].height
            );

            this.addChild(this.nums[i]);
        }

        //enter key
        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width *4 /6;
        this.enter.y = cc.winSize.height *1 /8;
        this.addChild(this.enter);

        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width *2 /6;
        this.back.y = cc.winSize.height *1 /8;
        this.addChild(this.back);

        // var n0 = new cc.Sprite("#number7.png"); //用＃存取
        // n0.x = cc.winSize.width /2;
        // n0.y = cc.winSize.height /2;
        // this.addChild(n0);

        this.input = new cc.LabelTTF("","", 48);
        this.input.x = cc.winSize.width *3 /6;
        this.input.y = cc.winSize.height *6 /8;
        this.addChild(this.input);

        this.mesg = new cc.LabelTTF("輸入三位數","", 48);
        this.mesg.x = cc.winSize.width *3 /6;
        this.mesg.y = cc.winSize.height *5 /8;
        this.addChild(this.mesg);
    },

    update:function () { //define update method
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

