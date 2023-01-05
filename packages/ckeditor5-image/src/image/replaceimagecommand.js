/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { Command } from 'ckeditor5/src/core';

/**
 * @module image/image/replaceimagecommand
 */

/**
 * Replace image command.
 *
 * Changes image source to the one provided. Can be executed as follows:
 *
 *		editor.execute( 'replaceImage', imageElement, { source: 'http://url.to.the/image' } );
 *
 * @extends module:core/command~Command
 */
export default class ReplaceImageCommand extends Command {
	/**
	 * Executes the command.
	 *
	 * @fires execute
	 * @param {Object} options Options for the executed command.
	 * @param {String} [options.source] The image source to replace.
	 * @param {module:engine/model/element~Element} [options.image] The image that is affected by the replacement.
	 */
	execute( options ) {
		const image = options.image || this.editor.model.document.selection.getSelectedElement();
		this.editor.model.change( writer => {
			writer.setAttribute( 'src', options.source, image );
			writer.removeAttribute( 'srcset', image );
			writer.removeAttribute( 'sizes', image );
		} );
	}
}
