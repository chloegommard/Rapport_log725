__report = {
  info: {
    file: "src\\gameCanvas.js",
    fileShort: "src\\gameCanvas.js",
    fileSafe: "src_gameCanvas_js",
    link: "files/src_gameCanvas_js/index.html",
  },
  complexity: {
    methodAggregate: {
      cyclomatic: 118,
      cyclomaticDensity: 30.491,
      halstead: {
        bugs: 8.179,
        difficulty: 149.633,
        effort: 3671753.449,
        length: 3063,
        time: 203986.303,
        vocabulary: 258,
        volume: 24538.389,
        operands: { distinct: 218, total: 1631, identifiers: ["__stripped__"] },
        operators: { distinct: 40, total: 1432, identifiers: ["__stripped__"] },
      },
      params: 38,
      sloc: { logical: 387, physical: 658 },
    },
    settings: {
      commonjs: true,
      forin: false,
      logicalor: true,
      switchcase: true,
      trycatch: false,
      newmi: true,
    },
    classes: [],
    dependencies: [
      { line: 10, path: "./animationManager", type: "esm" },
      { line: 11, path: "./gameMap", type: "esm" },
      { line: 12, path: "./miscUtils", type: "esm" },
      { line: 13, path: "./mouseBox", type: "esm" },
      { line: 14, path: "./position", type: "esm" },
      { line: 15, path: "./tileSet", type: "esm" },
      { line: 16, path: "./tileValues", type: "esm" },
    ],
    errors: [],
    lineEnd: 658,
    lineStart: 1,
    maintainability: 57.342,
    methods: [
      {
        cyclomatic: 9,
        cyclomaticDensity: 30,
        halstead: {
          bugs: 0.371,
          difficulty: 21.354,
          effort: 23766.972,
          length: 190,
          time: 1320.387,
          vocabulary: 58,
          volume: 1113.016,
          operands: { distinct: 41, total: 103, identifiers: ["__stripped__"] },
          operators: { distinct: 17, total: 87, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 30, physical: 46 },
        errors: [],
        lineEnd: 63,
        lineStart: 18,
        name: "GameCanvas",
      },
      {
        cyclomatic: 6,
        cyclomaticDensity: 20.69,
        halstead: {
          bugs: 0.389,
          difficulty: 15.75,
          effort: 18401.345,
          length: 194,
          time: 1022.297,
          vocabulary: 65,
          volume: 1168.339,
          operands: { distinct: 50, total: 105, identifiers: ["__stripped__"] },
          operators: { distinct: 15, total: 89, identifiers: ["__stripped__"] },
        },
        params: 4,
        sloc: { logical: 29, physical: 54 },
        errors: [],
        lineEnd: 119,
        lineStart: 66,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.005,
          difficulty: 1,
          effort: 15.51,
          length: 6,
          time: 0.862,
          vocabulary: 6,
          volume: 15.51,
          operands: { distinct: 4, total: 4, identifiers: ["__stripped__"] },
          operators: { distinct: 2, total: 2, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 1, physical: 3 },
        errors: [],
        lineEnd: 109,
        lineStart: 107,
        name: "<anonymous>",
      },
      {
        cyclomatic: 6,
        cyclomaticDensity: 25,
        halstead: {
          bugs: 0.483,
          difficulty: 26.382,
          effort: 38247.755,
          length: 261,
          time: 2124.875,
          vocabulary: 47,
          volume: 1449.748,
          operands: { distinct: 34, total: 138, identifiers: ["__stripped__"] },
          operators: {
            distinct: 13,
            total: 123,
            identifiers: ["__stripped__"],
          },
        },
        params: 1,
        sloc: { logical: 24, physical: 38 },
        errors: [],
        lineEnd: 159,
        lineStart: 122,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.017,
          difficulty: 1.929,
          effort: 96.099,
          length: 15,
          time: 5.339,
          vocabulary: 10,
          volume: 49.829,
          operands: { distinct: 7, total: 9, identifiers: ["__stripped__"] },
          operators: { distinct: 3, total: 6, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 3, physical: 5 },
        errors: [],
        lineEnd: 167,
        lineStart: 163,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 75,
        halstead: {
          bugs: 0.026,
          difficulty: 5.833,
          effort: 453.304,
          length: 21,
          time: 25.184,
          vocabulary: 13,
          volume: 77.709,
          operands: { distinct: 6, total: 10, identifiers: ["__stripped__"] },
          operators: { distinct: 7, total: 11, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 4, physical: 7 },
        errors: [],
        lineEnd: 176,
        lineStart: 170,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 75,
        halstead: {
          bugs: 0.026,
          difficulty: 5.833,
          effort: 453.304,
          length: 21,
          time: 25.184,
          vocabulary: 13,
          volume: 77.709,
          operands: { distinct: 6, total: 10, identifiers: ["__stripped__"] },
          operators: { distinct: 7, total: 11, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 4, physical: 7 },
        errors: [],
        lineEnd: 185,
        lineStart: 179,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 75,
        halstead: {
          bugs: 0.026,
          difficulty: 5.833,
          effort: 453.304,
          length: 21,
          time: 25.184,
          vocabulary: 13,
          volume: 77.709,
          operands: { distinct: 6, total: 10, identifiers: ["__stripped__"] },
          operators: { distinct: 7, total: 11, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 4, physical: 7 },
        errors: [],
        lineEnd: 194,
        lineStart: 188,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 75,
        halstead: {
          bugs: 0.026,
          difficulty: 5.833,
          effort: 453.304,
          length: 21,
          time: 25.184,
          vocabulary: 13,
          volume: 77.709,
          operands: { distinct: 6, total: 10, identifiers: ["__stripped__"] },
          operators: { distinct: 7, total: 11, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 4, physical: 7 },
        errors: [],
        lineEnd: 203,
        lineStart: 197,
        name: "<anonymous>",
      },
      {
        cyclomatic: 7,
        cyclomaticDensity: 87.5,
        halstead: {
          bugs: 0.092,
          difficulty: 8.206,
          effort: 2275.704,
          length: 59,
          time: 126.428,
          vocabulary: 26,
          volume: 277.326,
          operands: { distinct: 17, total: 31, identifiers: ["__stripped__"] },
          operators: { distinct: 9, total: 28, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 8, physical: 14 },
        errors: [],
        lineEnd: 219,
        lineStart: 206,
        name: "<anonymous>",
      },
      {
        cyclomatic: 8,
        cyclomaticDensity: 42.105,
        halstead: {
          bugs: 0.219,
          difficulty: 17.42,
          effort: 11427.362,
          length: 125,
          time: 634.853,
          vocabulary: 38,
          volume: 655.991,
          operands: { distinct: 25, total: 67, identifiers: ["__stripped__"] },
          operators: { distinct: 13, total: 58, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 19, physical: 29 },
        errors: [],
        lineEnd: 250,
        lineStart: 222,
        name: "<anonymous>",
      },
      {
        cyclomatic: 2,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.035,
          difficulty: 6.667,
          effort: 707.988,
          length: 25,
          time: 39.333,
          vocabulary: 19,
          volume: 106.198,
          operands: { distinct: 9, total: 12, identifiers: ["__stripped__"] },
          operators: { distinct: 10, total: 13, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 6, physical: 8 },
        errors: [],
        lineEnd: 260,
        lineStart: 253,
        name: "<anonymous>",
      },
      {
        cyclomatic: 2,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.057,
          difficulty: 9,
          effort: 1526.793,
          length: 37,
          time: 84.822,
          vocabulary: 24,
          volume: 169.644,
          operands: { distinct: 12, total: 18, identifiers: ["__stripped__"] },
          operators: { distinct: 12, total: 19, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 6, physical: 8 },
        errors: [],
        lineEnd: 270,
        lineStart: 263,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 37.5,
        halstead: {
          bugs: 0.092,
          difficulty: 11.375,
          effort: 3149.793,
          length: 57,
          time: 174.989,
          vocabulary: 29,
          volume: 276.905,
          operands: { distinct: 16, total: 28, identifiers: ["__stripped__"] },
          operators: { distinct: 13, total: 29, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 8, physical: 10 },
        errors: [],
        lineEnd: 282,
        lineStart: 273,
        name: "<anonymous>",
      },
      {
        cyclomatic: 5,
        cyclomaticDensity: 50,
        halstead: {
          bugs: 0.136,
          difficulty: 13.929,
          effort: 5688.764,
          length: 79,
          time: 316.042,
          vocabulary: 36,
          volume: 408.424,
          operands: { distinct: 21, total: 39, identifiers: ["__stripped__"] },
          operators: { distinct: 15, total: 40, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 10, physical: 13 },
        errors: [],
        lineEnd: 297,
        lineStart: 285,
        name: "<anonymous>",
      },
      {
        cyclomatic: 9,
        cyclomaticDensity: 75,
        halstead: {
          bugs: 0.192,
          difficulty: 14.808,
          effort: 8510.991,
          length: 108,
          time: 472.833,
          vocabulary: 40,
          volume: 574.768,
          operands: { distinct: 26, total: 55, identifiers: ["__stripped__"] },
          operators: { distinct: 14, total: 53, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 12, physical: 19 },
        errors: [],
        lineEnd: 318,
        lineStart: 300,
        name: "<anonymous>",
      },
      {
        cyclomatic: 2,
        cyclomaticDensity: 50,
        halstead: {
          bugs: 0.035,
          difficulty: 5.4,
          effort: 573.47,
          length: 25,
          time: 31.859,
          vocabulary: 19,
          volume: 106.198,
          operands: { distinct: 10, total: 12, identifiers: ["__stripped__"] },
          operators: { distinct: 9, total: 13, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 4, physical: 6 },
        errors: [],
        lineEnd: 327,
        lineStart: 322,
        name: "<anonymous>",
      },
      {
        cyclomatic: 14,
        cyclomaticDensity: 93.333,
        halstead: {
          bugs: 0.275,
          difficulty: 28.88,
          effort: 23807.926,
          length: 151,
          time: 1322.663,
          vocabulary: 44,
          volume: 824.374,
          operands: { distinct: 25, total: 76, identifiers: ["__stripped__"] },
          operators: { distinct: 19, total: 75, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 15, physical: 24 },
        errors: [],
        lineEnd: 354,
        lineStart: 331,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 60,
        halstead: {
          bugs: 0.03,
          difficulty: 4.5,
          effort: 411.194,
          length: 24,
          time: 22.844,
          vocabulary: 14,
          volume: 91.377,
          operands: { distinct: 8, total: 12, identifiers: ["__stripped__"] },
          operators: { distinct: 6, total: 12, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 5, physical: 9 },
        errors: [],
        lineEnd: 366,
        lineStart: 358,
        name: "<anonymous>",
      },
      {
        cyclomatic: 4,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.172,
          difficulty: 13.095,
          effort: 6747.144,
          length: 104,
          time: 374.841,
          vocabulary: 31,
          volume: 515.236,
          operands: { distinct: 21, total: 55, identifiers: ["__stripped__"] },
          operators: { distinct: 10, total: 49, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 12, physical: 16 },
        errors: [],
        lineEnd: 385,
        lineStart: 370,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.005,
          difficulty: 1.5,
          effort: 23.265,
          length: 6,
          time: 1.292,
          vocabulary: 6,
          volume: 15.51,
          operands: { distinct: 3, total: 3, identifiers: ["__stripped__"] },
          operators: { distinct: 3, total: 3, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 1, physical: 3 },
        errors: [],
        lineEnd: 390,
        lineStart: 388,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.005,
          difficulty: 1.5,
          effort: 23.265,
          length: 6,
          time: 1.292,
          vocabulary: 6,
          volume: 15.51,
          operands: { distinct: 3, total: 3, identifiers: ["__stripped__"] },
          operators: { distinct: 3, total: 3, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 1, physical: 3 },
        errors: [],
        lineEnd: 395,
        lineStart: 393,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 0,
        halstead: {
          bugs: 0,
          difficulty: 0,
          effort: 0,
          length: 0,
          time: 0,
          vocabulary: 0,
          volume: 0,
          operands: { distinct: 0, total: 0, identifiers: ["__stripped__"] },
          operators: { distinct: 0, total: 0, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 0, physical: 3 },
        errors: [],
        lineEnd: 400,
        lineStart: 398,
        name: "<anonymous>",
      },
      {
        cyclomatic: 2,
        cyclomaticDensity: 12.5,
        halstead: {
          bugs: 0.432,
          difficulty: 29.25,
          effort: 37875.871,
          length: 222,
          time: 2104.215,
          vocabulary: 57,
          volume: 1294.902,
          operands: { distinct: 38, total: 117, identifiers: ["__stripped__"] },
          operators: {
            distinct: 19,
            total: 105,
            identifiers: ["__stripped__"],
          },
        },
        params: 2,
        sloc: { logical: 16, physical: 29 },
        errors: [],
        lineEnd: 431,
        lineStart: 403,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 16.667,
        halstead: {
          bugs: 0.023,
          difficulty: 4.286,
          effort: 301.322,
          length: 19,
          time: 16.74,
          vocabulary: 13,
          volume: 70.308,
          operands: { distinct: 7, total: 10, identifiers: ["__stripped__"] },
          operators: { distinct: 6, total: 9, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 6, physical: 44 },
        errors: [],
        lineEnd: 481,
        lineStart: 438,
        name: "<anonymous>",
      },
      {
        cyclomatic: 11,
        cyclomaticDensity: 37.931,
        halstead: {
          bugs: 0.44,
          difficulty: 39.267,
          effort: 51810.671,
          length: 235,
          time: 2878.371,
          vocabulary: 49,
          volume: 1319.457,
          operands: { distinct: 30, total: 124, identifiers: ["__stripped__"] },
          operators: {
            distinct: 19,
            total: 111,
            identifiers: ["__stripped__"],
          },
        },
        params: 1,
        sloc: { logical: 29, physical: 40 },
        errors: [],
        lineEnd: 480,
        lineStart: 441,
        name: "<anonymous>",
      },
      {
        cyclomatic: 1,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.036,
          difficulty: 4.5,
          effort: 492.268,
          length: 28,
          time: 27.348,
          vocabulary: 15,
          volume: 109.393,
          operands: { distinct: 10, total: 18, identifiers: ["__stripped__"] },
          operators: { distinct: 5, total: 10, identifiers: ["__stripped__"] },
        },
        params: 3,
        sloc: { logical: 3, physical: 5 },
        errors: [],
        lineEnd: 488,
        lineStart: 484,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 30,
        halstead: {
          bugs: 0.191,
          difficulty: 15.296,
          effort: 8768.725,
          length: 107,
          time: 487.151,
          vocabulary: 41,
          volume: 573.258,
          operands: { distinct: 27, total: 59, identifiers: ["__stripped__"] },
          operators: { distinct: 14, total: 48, identifiers: ["__stripped__"] },
        },
        params: 4,
        sloc: { logical: 10, physical: 15 },
        errors: [],
        lineEnd: 505,
        lineStart: 491,
        name: "<anonymous>",
      },
      {
        cyclomatic: 13,
        cyclomaticDensity: 36.111,
        halstead: {
          bugs: 0.428,
          difficulty: 43.75,
          effort: 56190.432,
          length: 243,
          time: 3121.691,
          vocabulary: 39,
          volume: 1284.353,
          operands: { distinct: 24, total: 140, identifiers: ["__stripped__"] },
          operators: {
            distinct: 15,
            total: 103,
            identifiers: ["__stripped__"],
          },
        },
        params: 2,
        sloc: { logical: 36, physical: 67 },
        errors: [],
        lineEnd: 574,
        lineStart: 508,
        name: "<anonymous>",
      },
      {
        cyclomatic: 19,
        cyclomaticDensity: 40.426,
        halstead: {
          bugs: 0.795,
          difficulty: 39.636,
          effort: 94557.998,
          length: 383,
          time: 5253.222,
          vocabulary: 75,
          volume: 2385.638,
          operands: { distinct: 55, total: 218, identifiers: ["__stripped__"] },
          operators: {
            distinct: 20,
            total: 165,
            identifiers: ["__stripped__"],
          },
        },
        params: 3,
        sloc: { logical: 47, physical: 76 },
        errors: [],
        lineEnd: 652,
        lineStart: 577,
        name: "<anonymous>",
      },
    ],
    methodAverage: {
      cyclomatic: 4.9,
      cyclomaticDensity: 50.381,
      halstead: {
        bugs: 0.169,
        difficulty: 13.4,
        effort: 13240.395,
        length: 93.1,
        time: 735.577,
        vocabulary: 28.633,
        volume: 506.068,
        operands: { distinct: 18.233, total: 49.867 },
        operators: { distinct: 10.4, total: 43.233 },
      },
      params: 1.267,
      sloc: { logical: 11.9, physical: 20.5 },
    },
    module: "src\\gameCanvas.js",
  },
  jshint: { messages: [] },
};
