/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module engine/model/liveposition
 */

import Position, { type PositionStickiness } from './position';

import type { ModelApplyOperationEvent } from './model';
import type DocumentFragment from './documentfragment';
import type Item from './item';
import type Operation from './operation/operation';
import type RootElement from './rootelement';

import { CKEditorError, EmitterMixin } from '@ckeditor/ckeditor5-utils';

/**
 * `LivePosition` is a type of {@link module:engine/model/position~Position Position}
 * that updates itself as {@link module:engine/model/document~Document document}
 * is changed through operations. It may be used as a bookmark.
 *
 * **Note:** Contrary to {@link module:engine/model/position~Position}, `LivePosition` works only in roots that are
 * {@link module:engine/model/rootelement~RootElement}.
 * If {@link module:engine/model/documentfragment~DocumentFragment} is passed, error will be thrown.
 *
 * **Note:** Be very careful when dealing with `LivePosition`. Each `LivePosition` instance bind events that might
 * have to be unbound.
 * Use {@link module:engine/model/liveposition~LivePosition#detach} whenever you don't need `LivePosition` anymore.
 *
 * @extends module:engine/model/position~Position
 */
export default class LivePosition extends EmitterMixin( Position ) {
	declare public readonly root: RootElement;

	/**
	 * Creates a live position.
	 *
	 * @see module:engine/model/position~Position
	 * @param {module:engine/model/rootelement~RootElement} root
	 * @param {Array.<Number>} path
	 * @param {module:engine/model/position~PositionStickiness} [stickiness]
	 */
	constructor( root: RootElement, path: Array<number>, stickiness: PositionStickiness = 'toNone' ) {
		super( root, path, stickiness );

		if ( !this.root.is( 'rootElement' ) ) {
			/**
			 * LivePosition's root has to be an instance of RootElement.
			 *
			 * @error model-liveposition-root-not-rootelement
			 */
			throw new CKEditorError( 'model-liveposition-root-not-rootelement', root );
		}

		bindWithDocument.call( this );
	}

	/**
	 * Unbinds all events previously bound by `LivePosition`. Use it whenever you don't need `LivePosition` instance
	 * anymore (i.e. when leaving scope in which it was declared or before re-assigning variable that was
	 * referring to it).
	 */
	public detach(): void {
		this.stopListening();
	}

	/**
	 * Creates a {@link module:engine/model/position~Position position instance}, which is equal to this live position.
	 *
	 * @returns {module:engine/model/position~Position}
	 */
	public toPosition(): Position {
		return new Position( this.root, this.path.slice(), this.stickiness );
	}

	/**
	 * Creates a `LivePosition` instance that is equal to position.
	 *
	 * @param {module:engine/model/position~Position} position
	 * @param {module:engine/model/position~PositionStickiness} [stickiness]
	 * @returns {module:engine/model/liveposition~LivePosition}
	 */
	public static fromPosition( position: Position, stickiness: PositionStickiness ): LivePosition {
		return new this( position.root as RootElement, position.path.slice(), stickiness ? stickiness : position.stickiness );
	}

	/**
	 * @static
	 * @internal
	 * @protected
	 * @method module:engine/model/liveposition~LivePosition._createAfter
	 * @see module:engine/model/position~Position._createAfter
	 * @param {module:engine/model/node~Node} node
	 * @param {module:engine/model/position~PositionStickiness} [stickiness='toNone']
	 * @returns {module:engine/model/liveposition~LivePosition}
	 */

	declare public static readonly _createAfter: ( item: Item | DocumentFragment, stickiness?: PositionStickiness ) => LivePosition;

	/**
	 * @static
	 * @internal
	 * @protected
	 * @method module:engine/model/liveposition~LivePosition._createBefore
	 * @see module:engine/model/position~Position._createBefore
	 * @param {module:engine/model/node~Node} node
	 * @param {module:engine/model/position~PositionStickiness} [stickiness='toNone']
	 * @returns {module:engine/model/liveposition~LivePosition}
	 */

	declare public static readonly _createBefore: ( item: Item | DocumentFragment, stickiness?: PositionStickiness ) => LivePosition;

	/**
	 * @static
	 * @internal
	 * @protected
	 * @method module:engine/model/liveposition~LivePosition._createAt
	 * @see module:engine/model/position~Position._createAt
	 * @param {module:engine/model/item~Item|module:engine/model/position~Position} itemOrPosition
	 * @param {Number|'end'|'before'|'after'} [offset]
	 * @param {module:engine/model/position~PositionStickiness} [stickiness='toNone']
	 * @returns {module:engine/model/liveposition~LivePosition}
	 */

	declare public static readonly _createAt: (
		itemOrPosition: Item | Position | DocumentFragment,
		offset?: number | 'before' | 'after' | 'end',
		stickiness?: PositionStickiness
	) => LivePosition;

	/**
	 * Fired when `LivePosition` instance is changed due to changes on {@link module:engine/model/document~Document}.
	 *
	 * @event module:engine/model/liveposition~LivePosition#change
	 * @param {module:engine/model/position~Position} oldPosition Position equal to this live position before it got changed.
	 */
}

/**
 * Checks whether this object is of the given.
 *
 *		livePosition.is( 'position' ); // -> true
 *		livePosition.is( 'model:position' ); // -> true
 *		livePosition.is( 'liveposition' ); // -> true
 *		livePosition.is( 'model:livePosition' ); // -> true
 *
 *		livePosition.is( 'view:position' ); // -> false
 *		livePosition.is( 'documentSelection' ); // -> false
 *
 * {@link module:engine/model/node~Node#is Check the entire list of model objects} which implement the `is()` method.
 *
 * @param {String} type
 * @returns {Boolean}
 */
LivePosition.prototype.is = function( type: string ): boolean {
	return type === 'livePosition' || type === 'model:livePosition' ||
		// From super.is(). This is highly utilised method and cannot call super. See ckeditor/ckeditor5#6529.
		type == 'position' || type === 'model:position';
};

// Binds this `LivePosition` to the {@link module:engine/model/document~Document document} that owns
// this position's {@link module:engine/model/position~Position#root root}.
//
// @private
function bindWithDocument( this: LivePosition ) {
	this.listenTo<ModelApplyOperationEvent>(
		this.root.document!.model,
		'applyOperation',
		( event, args ) => {
			const operation = args[ 0 ];

			if ( !operation.isDocumentOperation ) {
				return;
			}

			transform.call( this, operation );
		},
		{ priority: 'low' }
	);
}

// Updates this position accordingly to the updates applied to the model. Bases on change events.
//
// @private
// @param {module:engine/model/operation/operation~Operation} operation Executed operation.
function transform( this: LivePosition, operation: Operation ) {
	const result = this.getTransformedByOperation( operation );

	if ( !this.isEqual( result ) ) {
		const oldPosition = this.toPosition();

		this.path = result.path;
		( this as any ).root = result.root;

		this.fire<LivePositionChangeEvent>( 'change', oldPosition );
	}
}

export type LivePositionChangeEvent = {
	name: 'change';
	args: [ oldPosition: Position ];
};
