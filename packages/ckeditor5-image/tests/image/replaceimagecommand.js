/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import VirtualTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/virtualtesteditor';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import { setData as setModelData } from '@ckeditor/ckeditor5-engine/src/dev-utils/model';

import ReplaceImageCommand from '../../src/image/replaceimagecommand';
import ImageBlockEditing from '../../src/image/imageblockediting';
import ImageInlineEditing from '../../src/image/imageinlineediting';

describe( 'ReplaceImageCommand', () => {
	let editor, command, model;

	beforeEach( () => {
		return VirtualTestEditor
			.create( {
				plugins: [ ImageBlockEditing, ImageInlineEditing, Paragraph ]
			} )
			.then( newEditor => {
				editor = newEditor;
				model = editor.model;

				command = new ReplaceImageCommand( editor );

				const schema = model.schema;
				schema.extend( 'imageBlock', { allowAttributes: 'uploadId' } );
			} );
	} );

	afterEach( () => {
		return editor.destroy();
	} );

	describe( 'execute()', () => {
		it( 'should change image source by passing options.image', () => {
			setModelData( model, '[<imageBlock src="foo/bar.jpg"></imageBlock>]' );

			const element = model.document.selection.getSelectedElement();

			command.execute( { image: element, source: 'bar/foo.jpg' } );

			expect( element.getAttribute( 'src' ) ).to.equal( 'bar/foo.jpg' );
		} );

		it( 'should change image source by using selection', () => {
			setModelData( model, '[<imageBlock src="foo/bar.jpg"></imageBlock>]' );

			const element = model.document.selection.getSelectedElement();

			command.execute( { source: 'bar/foo.jpg' } );

			expect( element.getAttribute( 'src' ) ).to.equal( 'bar/foo.jpg' );
		} );
	} );
} );
