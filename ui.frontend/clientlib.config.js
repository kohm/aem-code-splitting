/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const path = require('path');

const BUILD_DIR = path.join(__dirname, 'dist');
const CLIENTLIB_DIR = path.join(
    __dirname,
    '..',
    'ui.apps',
    'src',
    'main',
    'content',
    'jcr_root',
    'apps',
    'mysite',
    'clientlibs'
);

const libsBaseConfig = {
    allowProxy: true,
    serializationFormat: 'xml',
    cssProcessor: ['default:none', 'min:none'],
    jsProcessor: ['default:none', 'min:none']
};

// Config for `aem-clientlib-generator`
module.exports = {
    context: BUILD_DIR,
    clientLibRoot: CLIENTLIB_DIR,
    libs: [
        {
            ...libsBaseConfig,
            name: 'clientlib-dynamic-modules',
            categories: ['mysite.site.dynamic-modules'],
            dependencies: [],
            assets: {
                resources: [
                    "clientlib-dynamic-modules/resources/*.js"
                ]
            },
        },
        {
            ...libsBaseConfig,
            name: 'clientlib-loader',
            categories: ['mysite.loader'],
            assets: {
                js: {
                    cwd: 'clientlib-loader',
                    files: ['**/*.js'],
                    flatten: false
                },
                css: {
                    cwd: 'clientlib-loader',
                    files: ['**/*.css'],
                    flatten: false
                },

                // Copy all other files into the `resources` ClientLib directory
                resources: {
                    cwd: 'clientlib-site',
                    files: ['**/*.*'],
                    flatten: false,
                    ignore: ['**/*.js', '**/*.css']
                }
            }
        }
    ]
};
