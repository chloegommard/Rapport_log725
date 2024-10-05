__report = {
  info: {
    file: "src\\traffic.js",
    fileShort: "src\\traffic.js",
    fileSafe: "src_traffic_js",
    link: "files/src_traffic_js/index.html",
  },
  complexity: {
    methodAggregate: {
      cyclomatic: 30,
      cyclomaticDensity: 31.25,
      halstead: {
        bugs: 1.708,
        difficulty: 70.713,
        effort: 362332.213,
        length: 732,
        time: 20129.567,
        vocabulary: 128,
        volume: 5124,
        operands: { distinct: 94, total: 391, identifiers: ["__stripped__"] },
        operators: { distinct: 34, total: 341, identifiers: ["__stripped__"] },
      },
      params: 15,
      sloc: { logical: 96, physical: 186 },
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
      { line: 10, path: "./direction", type: "esm" },
      { line: 11, path: "./miscUtils", type: "esm" },
      { line: 12, path: "./position", type: "esm" },
      { line: 13, path: "./random", type: "esm" },
      { line: 14, path: "./spriteConstants", type: "esm" },
      { line: 15, path: "./spriteUtils", type: "esm" },
      { line: 16, path: "./tileUtils", type: "esm" },
      { line: 17, path: "./tileValues", type: "esm" },
    ],
    errors: [],
    lineEnd: 186,
    lineStart: 1,
    maintainability: 60.855,
    methods: [
      {
        cyclomatic: 1,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.018,
          difficulty: 2.5,
          effort: 134.722,
          length: 17,
          time: 7.485,
          vocabulary: 9,
          volume: 53.889,
          operands: { distinct: 6, total: 10, identifiers: ["__stripped__"] },
          operators: { distinct: 3, total: 7, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 3, physical: 5 },
        errors: [],
        lineEnd: 23,
        lineStart: 19,
        name: "Traffic",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.072,
          difficulty: 7.8,
          effort: 1680.847,
          length: 47,
          time: 93.38,
          vocabulary: 24,
          volume: 215.493,
          operands: { distinct: 15, total: 26, identifiers: ["__stripped__"] },
          operators: { distinct: 9, total: 21, identifiers: ["__stripped__"] },
        },
        params: 4,
        sloc: { logical: 9, physical: 16 },
        errors: [],
        lineEnd: 41,
        lineStart: 26,
        name: "<anonymous>",
      },
      {
        cyclomatic: 8,
        cyclomaticDensity: 50,
        halstead: {
          bugs: 0.273,
          difficulty: 16.5,
          effort: 13502.926,
          length: 145,
          time: 750.163,
          vocabulary: 50,
          volume: 818.359,
          operands: { distinct: 35, total: 77, identifiers: ["__stripped__"] },
          operators: { distinct: 15, total: 68, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 16, physical: 30 },
        errors: [],
        lineEnd: 73,
        lineStart: 44,
        name: "<anonymous>",
      },
      {
        cyclomatic: 4,
        cyclomaticDensity: 40,
        halstead: {
          bugs: 0.107,
          difficulty: 10,
          effort: 3220.928,
          length: 67,
          time: 178.94,
          vocabulary: 28,
          volume: 322.093,
          operands: { distinct: 18, total: 36, identifiers: ["__stripped__"] },
          operators: { distinct: 10, total: 31, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 10, physical: 16 },
        errors: [],
        lineEnd: 94,
        lineStart: 79,
        name: "<anonymous>",
      },
      {
        cyclomatic: 6,
        cyclomaticDensity: 31.579,
        halstead: {
          bugs: 0.156,
          difficulty: 14.609,
          effort: 6849.299,
          length: 90,
          time: 380.517,
          vocabulary: 37,
          volume: 468.851,
          operands: { distinct: 23, total: 48, identifiers: ["__stripped__"] },
          operators: { distinct: 14, total: 42, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 19, physical: 28 },
        errors: [],
        lineEnd: 126,
        lineStart: 99,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 33.333,
        halstead: {
          bugs: 0.062,
          difficulty: 10,
          effort: 1872.961,
          length: 42,
          time: 104.053,
          vocabulary: 22,
          volume: 187.296,
          operands: { distinct: 11, total: 20, identifiers: ["__stripped__"] },
          operators: { distinct: 11, total: 22, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 9, physical: 24 },
        errors: [],
        lineEnd: 152,
        lineStart: 129,
        name: "<anonymous>",
      },
      {
        cyclomatic: 3,
        cyclomaticDensity: 100,
        halstead: {
          bugs: 0.036,
          difficulty: 3.75,
          effort: 406.568,
          length: 26,
          time: 22.587,
          vocabulary: 18,
          volume: 108.418,
          operands: { distinct: 12, total: 15, identifiers: ["__stripped__"] },
          operators: { distinct: 6, total: 11, identifiers: ["__stripped__"] },
        },
        params: 1,
        sloc: { logical: 3, physical: 6 },
        errors: [],
        lineEnd: 140,
        lineStart: 135,
        name: "<anonymous>",
      },
      {
        cyclomatic: 9,
        cyclomaticDensity: 69.231,
        halstead: {
          bugs: 0.17,
          difficulty: 18.769,
          effort: 9563.089,
          length: 116,
          time: 531.283,
          vocabulary: 21,
          volume: 509.509,
          operands: { distinct: 13, total: 61, identifiers: ["__stripped__"] },
          operators: { distinct: 8, total: 55, identifiers: ["__stripped__"] },
        },
        params: 2,
        sloc: { logical: 13, physical: 23 },
        errors: [],
        lineEnd: 177,
        lineStart: 155,
        name: "<anonymous>",
      },
    ],
    methodAverage: {
      cyclomatic: 4.625,
      cyclomaticDensity: 48.851,
      halstead: {
        bugs: 0.112,
        difficulty: 10.491,
        effort: 4653.917,
        length: 68.75,
        time: 258.551,
        vocabulary: 26.125,
        volume: 335.488,
        operands: { distinct: 16.625, total: 36.625 },
        operators: { distinct: 9.5, total: 32.125 },
      },
      params: 1.875,
      sloc: { logical: 10.25, physical: 18.5 },
    },
    module: "src\\traffic.js",
  },
  jshint: { messages: [] },
};
