__report = {
  info: {
    file: "src\\disasterManager.js",
    fileShort: "src\\disasterManager.js",
    fileSafe: "src_disasterManager_js",
    link: "files/src_disasterManager_js/index.html",
  },
  complexity: {
    methodAggregate: {
      cyclomatic: 59,
      cyclomaticDensity: 35.542,
      halstead: {
        bugs: 2.965,
        difficulty: 93.536,
        effort: 832086.734,
        length: 1212,
        time: 46227.041,
        vocabulary: 162,
        volume: 8895.898,
        operands: { distinct: 125, total: 632, identifiers: ["__stripped__"] },
        operators: { distinct: 37, total: 580, identifiers: ["__stripped__"] },
      },
      params: 12,
      sloc: { logical: 166, physical: 275 },
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
      { line: 10, path: "./eventEmitter", type: "esm" },
      { line: 11, path: "./messages", type: "esm" },
      { line: 12, path: "./miscUtils", type: "esm" },
      { line: 13, path: "./random", type: "esm" },
      { line: 14, path: "./spriteConstants", type: "esm" },
      { line: 15, path: "./tileUtils", type: "esm" },
      { line: 16, path: "./tileValues", type: "esm" },
      { line: 17, path: "./zoneUtils", type: "esm" },
    ],
    errors: [],
    lineEnd: 275,
    lineStart: 1,
    maintainability: 57.659,
    methods: [
      {
        cyclomatic: 1,
        cyclomaticDensity: 20,
        halstead: {
          bugs: 0.035,
          difficulty: 1.636,
          effort: 169.547,
          length: 28,
          time: 9.419,
          vocabulary: 13,
          volume: 103.612,
          operands: { distinct: 11, total: 18, identifiers: ["__stripped__"] },
          operators: { distinct: 2, total: 10, identifiers: ["__stripped__"] },
        },
        params: 3,
        sloc: { logical: 5, physical: 8 },
        errors: [],
        lineEnd: 26,
        lineStart: 19,
        name: "<anonymous>",
      },
      {
        cyclomatic: 14,
        cyclomaticDensity: 53.846,
        halstead: {
          bugs: 0.139,
          difficulty: 7.708,
          effort: 3215.7,
          length: 82,
          time: 178.65,
          vocabulary: 34,
          volume: 417.172,
          operands: { distinct: 24, total: 37, identifiers: ["__stripped__"] },
          operators: { distinct: 10, total: 45, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 26, physical: 41 },
        errors: [],
        lineEnd: 71,
        lineStart: 31,
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
        lineEnd: 76,
        lineStart: 74,
        name: "<anonymous>",
      },
      {
        cyclomatic: 4,
        cyclomaticDensity: 57.143,
        halstead: {
          bugs: 0.078,
          difficulty: 12.375,
          effort: 2910.912,
          length: 52,
          time: 161.717,
          vocabulary: 23,
          volume: 235.225,
          operands: { distinct: 12, total: 27, identifiers: ["__stripped__"] },
          operators: { distinct: 11, total: 25, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 7, physical: 10 },
        errors: [],
        lineEnd: 89,
        lineStart: 80,
        name: "<anonymous>",
      },
      {
        cyclomatic: 4,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.04,
          difficulty: 7,
          effort: 846.495,
          length: 29,
          time: 47.027,
          vocabulary: 18,
          volume: 120.928,
          operands: { distinct: 9, total: 14, identifiers: ["__stripped__"] },
          operators: { distinct: 9, total: 15, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 4, physical: 8 },
        errors: [],
        lineEnd: 99,
        lineStart: 92,
        name: "<anonymous>",
      },
      {
        cyclomatic: 5,
        cyclomaticDensity: 31.25,
        halstead: {
          bugs: 0.234,
          difficulty: 20.339,
          effort: 14297.647,
          length: 128,
          time: 794.314,
          vocabulary: 45,
          volume: 702.957,
          operands: { distinct: 28, total: 67, identifiers: ["__stripped__"] },
          operators: { distinct: 17, total: 61, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 16, physical: 21 },
        errors: [],
        lineEnd: 123,
        lineStart: 103,
        name: "<anonymous>",
      },
      {
        cyclomatic: 9,
        cyclomaticDensity: 47.368,
        halstead: {
          bugs: 0.254,
          difficulty: 19.969,
          effort: 15214.602,
          length: 135,
          time: 845.256,
          vocabulary: 50,
          volume: 761.921,
          operands: { distinct: 32, total: 71, identifiers: ["__stripped__"] },
          operators: { distinct: 18, total: 64, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 19, physical: 24 },
        errors: [],
        lineEnd: 149,
        lineStart: 126,
        name: "<anonymous>",
      },
      {
        cyclomatic: 2,
        cyclomaticDensity: 22.222,
        halstead: {
          bugs: 0.104,
          difficulty: 8.75,
          effort: 2728.053,
          length: 68,
          time: 151.558,
          vocabulary: 24,
          volume: 311.777,
          operands: { distinct: 16, total: 35, identifiers: ["__stripped__"] },
          operators: { distinct: 8, total: 33, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 9, physical: 13 },
        errors: [],
        lineEnd: 165,
        lineStart: 153,
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
        params: 0,
        sloc: { logical: 1, physical: 3 },
        errors: [],
        lineEnd: 171,
        lineStart: 169,
        name: "<anonymous>",
      },
      {
        cyclomatic: 10,
        cyclomaticDensity: 41.667,
        halstead: {
          bugs: 0.345,
          difficulty: 23.333,
          effort: 24158.054,
          length: 176,
          time: 1342.114,
          vocabulary: 59,
          volume: 1035.345,
          operands: { distinct: 39, total: 91, identifiers: ["__stripped__"] },
          operators: { distinct: 20, total: 85, identifiers: ["__stripped__"] },
        },
        params: 0,
        sloc: { logical: 24, physical: 30 },
        errors: [],
        lineEnd: 206,
        lineStart: 177,
        name: "<anonymous>",
      },
      {
        cyclomatic: 11,
        cyclomaticDensity: 68.75,
        halstead: {
          bugs: 0.266,
          difficulty: 17.727,
          effort: 14157.88,
          length: 143,
          time: 786.549,
          vocabulary: 48,
          volume: 798.65,
          operands: { distinct: 33, total: 78, identifiers: ["__stripped__"] },
          operators: { distinct: 15, total: 65, identifiers: ["__stripped__"] },
        },
        params: 3,
        sloc: { logical: 16, physical: 27 },
        errors: [],
        lineEnd: 235,
        lineStart: 209,
        name: "<anonymous>",
      },
      {
        cyclomatic: 8,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.372,
          difficulty: 22.526,
          effort: 25149.464,
          length: 194,
          time: 1397.192,
          vocabulary: 54,
          volume: 1116.448,
          operands: { distinct: 38, total: 107, identifiers: ["__stripped__"] },
          operators: { distinct: 16, total: 87, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 24, physical: 35 },
        errors: [],
        lineEnd: 272,
        lineStart: 238,
        name: "<anonymous>",
      },
    ],
    methodAverage: {
      cyclomatic: 5.833,
      cyclomaticDensity: 47.965,
      halstead: {
        bugs: 0.156,
        difficulty: 11.864,
        effort: 8571.989,
        length: 86.75,
        time: 476.222,
        vocabulary: 31.167,
        volume: 468.295,
        operands: { distinct: 20.5, total: 45.75 },
        operators: { distinct: 10.667, total: 41 },
      },
      params: 1,
      sloc: { logical: 12.583, physical: 18.583 },
    },
    module: "src\\disasterManager.js",
  },
  jshint: { messages: [] },
};
