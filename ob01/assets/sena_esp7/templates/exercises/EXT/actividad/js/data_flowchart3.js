var DataFlowchart3 = {
  firstMessage : "This flowchart includes some of the basic operations in programming, that is,",
  lastMessage : "Very good!",
  goodAnimation : {
    x : 0,
    y : 0,
    atlas : 'goodAnimation',
    spriteName : 'selection_good0005.png',
  },
  scriptedAnimation : [
    {
      message : "This flowchart includes some of the basic operations in programming, that is,",
      timeNextEvent : 4100,
      highlightData : []
    },
    {
      message : "input, when entering the option for a beverage;",
      timeNextEvent : 3000,
      highlightData : [2]
    },
    {
      message : "output, when receiving the beverage;",
      timeNextEvent : 2800,
      highlightData : [6, 9]
    },
    {
      message : "arithmetic, in the decision moment, when the machine receives the input for the kind of beverage for the machine user.",
      timeNextEvent : 8000,
      highlightData : [3]
    }
  ],
  clickableData : [
    {
      x : 903,
      y : 600,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0010.png',
      text : '"EndProcess"',
      textOffsetX : 0,
      textOffsetY : 50,
      scale : 1
    },
    {
      x : 900,
      y : 240,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0001.png',
      text : 'Process: Beverage Machine',
      textOffsetX : 0,
      textOffsetY : -10,
      scale : 1
    },
    {
      x : 900,
      y : 295,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0002.png',
      text : '"Choose 1 for coffee another num for juice"',
      textOffsetX : 0,
      textOffsetY : -5,
      scale : 1
    },
    {
      x : 900,
      y : 353,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0004.png',
      text : 'num',
      textOffsetX : 0,
      textOffsetY : 0,
      scale : 1
    },
    {
      x : 900,
      y : 420,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0007.png',
      text : 'num=1',
      textOffsetX : 0,
      textOffsetY : -5,
      scale : 1
    },
    {
      x : 745,
      y : 470,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0005.png',
      text : '"You have chosen juice"',
      textOffsetX : 0,
      textOffsetY : 3,
      scale : 1
    },
    {
      x : 745,
      y : 520,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0005.png',
      text : '"The machine dispenses juice"',
      textOffsetX : 0,
      textOffsetY : 3,
      scale : 1
    },
    {
      x : 745,
      y : 570,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0005.png',
      text : '"Take your product"',
      textOffsetX : 0,
      textOffsetY : 3,
      scale : 1
    },
    {
      x : 1060,
      y : 470,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0005.png',
      text : '"You have chosen coffee"',
      textOffsetX : 0,
      textOffsetY : 3,
      scale : 1
    },
    {
      x : 1060,
      y : 520,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0005.png',
      text : '"The machine dispenses coffee"',
      textOffsetX : 0,
      textOffsetY : 3,
      scale : 1
    },
    {
      x : 1060,
      y : 570,
      atlas : 'flowchart1',
      spriteName : 'flowchart_chartLarge_0005.png',
      text : '"Take your product"',
      textOffsetX : 0,
      textOffsetY : 3,
      scale : 1
    }
  ]
};