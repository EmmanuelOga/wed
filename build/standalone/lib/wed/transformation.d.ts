import { Subject } from "rxjs";
import { Action } from "./action";
import { DLoc } from "./dloc";
import { EditorAPI } from "./mode-api";
import { TreeUpdater } from "./tree-updater";
/**
 * Data passed to the transformation handler. The transformation types expect
 * the following values for the parameters passed to a handler.
 *
 * Transformation Type | `node` is | `name` is the name of the:
 * --------------------|-----------|---------------------------
 * insert | undefined (we insert at caret position) | element to insert
 * delete-element | element to delete | element to delete
 * delete-parent | element to delete | element to delete
 * wrap | undefined (we wrap the current selection) | wrapping element
 * merge-with-next | element to merge | element to merge
 * merge-with-previous | element to merge | element to merge
 * swap-with-next | element to swap | element to swap
 * swap-with-previous | element to swap | element to swap
 * append | element after which to append | element after which to append
 * prepend | element before which to prepend | element before which to append
 * unwrap | node to unwrap | node to unwrap
 * add-attribute | node to which an attribute is added | attribute to add
 * delete-attribute | attribute to delete | attribute to delete
 * insert-text | node to which text is added | text to add
 */
export interface TransformationData {
    /**
     * The JavaScript event that triggered the transformation, if any.
     */
    readonly e?: Event;
    /**
     * The node to operate on. Should be set by the code that invokes the
     * transformation. This may be undefined if the transformation should rely on
     * the caret position.
     */
    node?: Node;
    /**
     * The name of the node to add, remove, etc. Should be set by the code that
     * invokes the transformation.
     */
    name?: string;
    /**
     * A position to which the caret is moved before the transformation is fired.
     * **Wed performs the move.** Should be set by the code that invokes the
     * transformation.
     */
    moveCaretTo?: DLoc;
}
export interface NamedTransformationData extends TransformationData {
    name: string;
}
/**
 * @param editor The editor.
 *
 * @param data The data for the transformation.
 */
export declare type TransformationHandler<Data extends TransformationData> = (editor: EditorAPI, data: Data) => void;
/**
 * An operation that transforms the data tree.
 */
export declare class Transformation<Data extends TransformationData, Handler extends TransformationHandler<Data> = TransformationHandler<Data>> extends Action<Data> {
    readonly handler: Handler;
    readonly transformationType: string;
    readonly kind: string;
    readonly nodeType: string;
    /**
     * @param editor The editor for which this transformation is created.
     *
     * @param transformationType The type of transformation.
     *
     * @param desc The description of this transformation. A transformation's
     * [[getDescriptionFor]] method will replace ``<name>`` with the name of the
     * node actually being processed. So a string like ``Remove <name>`` would
     * become ``Remove foo`` when the transformation is called for the element
     * ``foo``.
     *
     * @param abbreviatedDesc An abbreviated description of this transformation.
     *
     * @param iconHtml An HTML representation of the icon associated with this
     * transformation.
     *
     * @param needsInput Defaults to ``false`` for signatures that do not contain
     * this parameter. Indicates whether this action needs input from the
     * user. For instance, an action which brings up a modal dialog to ask
     * something of the user must have this parameter set to ``true``. It is
     * important to record whether an action needs input because, to take one
     * example, the ``autoinsert`` logic will try to insert automatically any
     * element it can. However, doing this for elements that need user input will
     * just confuse the user (or could cause a crash). Therefore, it is important
     * that the insertion operations for such elements be marked with
     * ``needsInput`` set to ``true`` so that the ``autoinsert`` logic backs off
     * from trying to insert these elements.
     *
     * @param handler The handler to call when this transformation is executed.
     */
    constructor(editor: EditorAPI, transformationType: string, desc: string, handler: Handler);
    constructor(editor: EditorAPI, transformationType: string, desc: string, abbreviatedDesc: string | undefined, handler: Handler);
    constructor(editor: EditorAPI, transformationType: string, desc: string, abbreviatedDesc: string | undefined, iconHtml: string | undefined, handler: Handler);
    constructor(editor: EditorAPI, transformationType: string, desc: string, abbreviatedDesc: string | undefined, iconHtml: string | undefined, needsInput: boolean, handler: Handler);
    getDescriptionFor(data: Data): string;
    /**
     * Calls the ``fireTransformation`` method on this transformation's editor.
     *
     * @param data The data object to pass.
     */
    execute(data: Data): void;
}
/**
 * Transformation events are generated by an editor before and after a
 * transformation is executed. The ``StartTransformation`` event is generated
 * before, and the ``EndTransformation`` is generated after. These events allow
 * modes to perform additional processing before or after a transformation, or
 * to abort a transformation while it is being processed.
 */
export declare class TransformationEvent {
    readonly name: "StartTransformation" | "EndTransformation";
    readonly transformation: Transformation<TransformationData>;
    private _aborted;
    private _abortMessage?;
    /**
     * @param name The name of the event.
     * @param transformation The transformation to which the event pertains.
     */
    constructor(name: "StartTransformation" | "EndTransformation", transformation: Transformation<TransformationData>);
    /** Whether the transformation is aborted. */
    readonly aborted: boolean;
    /**
     * Mark the transformation as aborted. Once aborted, a transformation cannot
     * be unaborted.
     */
    abort(message: string): void;
    /**
     * Raise an [[AbortTransformationException]] if the event was marked as
     * aborted.
     */
    throwIfAborted(): void;
}
/**
 * A subject that emits [[TransformationEvent]] objects and immediately stops
 * calling subscribers when the [[TransformationEvent]] object it is processing
 * is aborted.
 */
export declare class TransformationEventSubject extends Subject<TransformationEvent> {
    next(value: TransformationEvent): void;
}
export declare type AttributeTable = Record<string, string>;
/**
 * Makes an element appropriate for a wed data tree.
 *
 * @param doc The document for which to make the element.
 *
 * @param ns The URI of the namespace to use for the new element.
 *
 * @param name The name of the new element.
 *
 * @param attrs An object whose fields will become attributes for the new
 * element.
 *
 * @returns The new element.
 */
export declare function makeElement(doc: Document, ns: string, name: string, attrs?: AttributeTable): Element;
/**
 * Insert an element in a wed data tree.
 *
 * @param dataUpdater A tree updater through which to update the DOM tree.
 *
 * @param parent The parent of the new node.
 *
 * @param index Offset in the parent where to insert the new node.
 *
 * @param ns The URI of the namespace to use for the new element.
 *
 * @param name The name of the new element.
 *
 * @param attrs An object whose fields will become attributes for the new
 * element.
 *
 * @returns The new element.
 */
export declare function insertElement(dataUpdater: TreeUpdater, parent: Node, index: number, ns: string, name: string, attrs?: AttributeTable): Element;
/**
 * Wraps a span of text in a new element.
 *
 * @param dataUpdater A tree updater through which to update the DOM tree.
 *
 * @param node The DOM node where to wrap. Must be a text node.
 *
 * @param offset The offset in the node. This parameter specifies where to start
 * wrapping.
 *
 * @param endOffset Offset in the node. This parameter specifies where to end
 * wrapping.
 *
 * @param ns The URI of the namespace to use for the new element.
 *
 * @param name The name of the wrapping element.
 *
 * @param attrs An object whose fields will become attributes for the new
 * element.
 *
 * @returns The new element.
 */
export declare function wrapTextInElement(dataUpdater: TreeUpdater, node: Text, offset: number, endOffset: number, ns: string, name: string, attrs?: AttributeTable): Element;
/**
 * Wraps a well-formed span in a new element. This span can contain text and
 * element nodes.
 *
 * @param dataUpdater A tree updater through which to update the DOM tree.
 *
 * @param startContainer The node where to start wrapping.
 *
 * @param startOffset The offset where to start wrapping.
 *
 * @param endContainer The node where to end wrapping.
 *
 * @param endOffset The offset where to end wrapping.
 *
 * @param ns The URI of the namespace to use for the new element.
 *
 * @param name The name of the new element.
 *
 * @param [attrs] An object whose fields will become attributes for the new
 * element.
 *
 * @returns The new element.
 *
 * @throws {Error} If the range is malformed or if there is an internal error.
 */
export declare function wrapInElement(dataUpdater: TreeUpdater, startContainer: Node, startOffset: number, endContainer: Node, endOffset: number, ns: string, name: string, attrs?: AttributeTable): Element;
/**
 * Replaces an element with its contents.
 *
 * @param dataUpdater A tree updater through which to update the DOM tree.
 *
 * @param node The element to unwrap.
 *
 * @returns The contents of the element.
 */
export declare function unwrap(dataUpdater: TreeUpdater, node: Element): Node[];
/**
 * This function splits a node at the position of the caret. If the caret is not
 * inside the node or its descendants, an exception is raised.
 *
 * @param editor The editor on which we are to perform the transformation.
 *
 * @param node The node to split.
 *
 * @throws {Error} If the caret is not inside the node or its descendants.
 */
export declare function splitNode(editor: EditorAPI, node: Node): void;
/**
 * This function merges an element with a previous element of the same name. For
 * the operation to go forward, the element must have a previous sibling and
 * this sibling must have the same name as the element being merged.
 *
 * @param editor The editor on which we are to perform the transformation.
 *
 * @param node The element to merge with previous.
 */
export declare function mergeWithPreviousHomogeneousSibling(editor: EditorAPI, node: Element): void;
/**
 * This function merges an element with a next element of the same name. For the
 * operation to go forward, the element must have a next sibling and this
 * sibling must have the same name as the element being merged.
 *
 * @param editor The editor on which we are to perform the transformation.
 *
 * @param node The element to merge with next.
 */
export declare function mergeWithNextHomogeneousSibling(editor: EditorAPI, node: Element): void;
/**
 * This function swaps an element with a previous element of the same name. For
 * the operation to go forward, the element must have a previous sibling and
 * this sibling must have the same name as the element being merged.
 *
 * @param editor The editor on which we are to perform the transformation.
 *
 * @param node The element to swap with previous.
 */
export declare function swapWithPreviousHomogeneousSibling(editor: EditorAPI, node: Element): void;
/**
 * This function swaps an element with a next element of the same name. For the
 * operation to go forward, the element must have a next sibling and this
 * sibling must have the same name as the element being merged.
 *
 * @param editor The editor on which we are to perform the transformation.
 *
 * @param node The element to swap with next.
 */
export declare function swapWithNextHomogeneousSibling(editor: EditorAPI, node: Element): void;
/**
 * Remove markup from the current selection. This turns mixed content into pure
 * text. The selection must be well-formed, otherwise the transformation is
 * aborted.
 *
 * @param editor The editor for which we are doing the transformation.
 */
export declare function removeMarkup(editor: EditorAPI): void;
