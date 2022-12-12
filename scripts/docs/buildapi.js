/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

'use strict';

const path = require( 'path' );
const ROOT_DIRECTORY = path.join( __dirname, '..', '..' );

module.exports = function buildApiDocs() {
	const ckeditor5Docs = require( '@ckeditor/ckeditor5-dev-docs' );

	return ckeditor5Docs
		.build( {
			cwd: ROOT_DIRECTORY,
			tsconfig: path.join( ROOT_DIRECTORY, 'tsconfig.docs.json' ),
			outputPath: path.join( ROOT_DIRECTORY, 'docs', 'api', 'output.json' ),
			// Patterns that do not start with '/' are mounted onto process.cwd() path by default.
			readmePath: 'README.md',
			sourceFiles: [
				'packages/ckeditor5-utils/src/**/*.ts'

				// 'packages/ckeditor5-utils/src/count.ts',
				// 'packages/ckeditor5-utils/src/nth.ts'

				// 'packages/@(ckeditor|ckeditor5)-*/src/**/*.@(js|jsdoc)',
				// 'packages/@(ckeditor|ckeditor5)-*/_src/**/*.@(js|jsdoc)',
				// '!packages/@(ckeditor|ckeditor5)-*/src/lib/**/*.js',
				// '!packages/ckeditor5-build-*/src/**/*.js',
				// 'external/@(ckeditor5-internal|collaboration-features)/packages/@(ckeditor|ckeditor5)-*/src/**/*.@(js|jsdoc)',
				// '!external/@(ckeditor5-internal|collaboration-features)/packages/@(ckeditor|ckeditor5)-*/src/lib/**/*.js',
				// '!external/@(ckeditor5-internal|collaboration-features)/packages/ckeditor5-build-*/src/**/*.js'
			],
			validateOnly: process.argv.includes( '--validate-only' ),
			strict: process.argv.includes( '--strict' )
		} );
};
