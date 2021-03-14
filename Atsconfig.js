{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": [
      "dom",
      "es6",
      "es2017",
      "esnext.asynciterable"
    ],
    "sourceMap": true,
    "outDir": "./dist",
    "moduleResolution": "node",
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "resolveJsonModule": true,
    "baseUrl": "."
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "./src/**/*.tsx",
    "./src/**/*.ts"
  ]
}