import ascii from "rollup-plugin-ascii";
import node from "rollup-plugin-node-resolve";
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import json from 'rollup-plugin-json';

let pkg = require('./package.json');

export default {
    entry: 'index.js',
    plugins: [
        json({
            exclude: [ 'node_modules' ],
            preferConst: true,
        }),
        node({
            module: true,
            jsnext: true,
            main: true,
            browser: true,
            extensions: ['.js','.mjs']
        }),
        ascii(),
        postcss({
            extensions: ['.css'],
            extract: 'dist/vizart.css',
            plugins: [cssnano({discardDuplicates: true})]
        })
    ],
    external: (id)=> {
        return id !== 'index.js'
            && !id.startsWith('./')
            && !id.includes('vizart');
    },
    targets: [
        {
            dest: pkg.main,
            format: 'umd',
            moduleName: 'VizArt',
            sourceMap: true
        },
        {
            dest: pkg.module,
            format: 'es',
            sourceMap: true
        }
    ]
};
