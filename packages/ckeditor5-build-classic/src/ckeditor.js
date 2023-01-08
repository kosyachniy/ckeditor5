/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strike from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
// import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';


export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	Essentials,
	Autoformat,
	Bold,
	Italic,
    Strike,
    Highlight,
    Underline,
	BlockQuote,
	// CloudServices,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	PictureEditing,
	Table,
	TableToolbar,
	TextTransformation,
    HorizontalLine,
    Code,
    CodeBlock,
    SimpleUploadAdapter,
    MathType,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'highlight',
			'|',
			'bulletedList',
			'numberedList',
			'|',
			'uploadImage',
			'mediaEmbed',
            '|',
			'blockQuote',
            'code',
            'codeBlock',
			'MathType',
			// 'ChemType',
            '|',
			'link',
			'horizontalLine',
			'insertTable',
		]
	},
	image: {
		toolbar: [
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'|',
			'toggleImageCaption',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en',
    codeBlock: {
        languages: [
            { language: 'bash', label: 'Bash', class: '' },
            { language: 'python', label: 'Python' },
            { language: 'javascript', label: 'JavaScript' },
            // { language: 'typescript', label: 'TypeScript' },
            { language: 'cpp', label: 'C++' },
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' },
            // { language: 'c', label: 'C' },
            // { language: 'cs', label: 'C#' },
            // { language: 'diff', label: 'Diff' },
            // { language: 'java', label: 'Java' },
            // { language: 'php', label: 'PHP' },
            // { language: 'ruby', label: 'Ruby' },
            { language: 'xml', label: 'XML' }
        ],
    },
};
