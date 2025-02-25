import { Hash256 } from './types/hash-256';
import { BytesList } from './serdes/binary-serializer';
import { Buffer } from 'buffer/';
/**
 * Abstract class describing a SHAMapNode
 */
declare abstract class ShaMapNode {
    abstract hashPrefix(): Buffer;
    abstract isLeaf(): boolean;
    abstract isInner(): boolean;
    abstract toBytesSink(list: BytesList): void;
    abstract hash(): Hash256;
}
/**
 * Class describing a Leaf of SHAMap
 */
declare class ShaMapLeaf extends ShaMapNode {
    index: Hash256;
    item?: ShaMapNode | undefined;
    constructor(index: Hash256, item?: ShaMapNode | undefined);
    /**
     * @returns true as ShaMapLeaf is a leaf node
     */
    isLeaf(): boolean;
    /**
     * @returns false as ShaMapLeaf is not an inner node
     */
    isInner(): boolean;
    /**
     * Get the prefix of the this.item
     *
     * @returns The hash prefix, unless this.item is undefined, then it returns an empty Buffer
     */
    hashPrefix(): Buffer;
    /**
     * Hash the bytes representation of this
     *
     * @returns hash of this.item concatenated with this.index
     */
    hash(): Hash256;
    /**
     * Write the bytes representation of this to a BytesList
     * @param list BytesList to write bytes to
     */
    toBytesSink(list: BytesList): void;
}
/**
 * Class defining an Inner Node of a SHAMap
 */
declare class ShaMapInner extends ShaMapNode {
    private depth;
    private slotBits;
    private branches;
    constructor(depth?: number);
    /**
     * @returns true as ShaMapInner is an inner node
     */
    isInner(): boolean;
    /**
     * @returns false as ShaMapInner is not a leaf node
     */
    isLeaf(): boolean;
    /**
     * Get the hash prefix for this node
     *
     * @returns hash prefix describing an inner node
     */
    hashPrefix(): Buffer;
    /**
     * Set a branch of this node to be another node
     *
     * @param slot Slot to add branch to this.branches
     * @param branch Branch to add
     */
    setBranch(slot: number, branch: ShaMapNode): void;
    /**
     * @returns true if node is empty
     */
    empty(): boolean;
    /**
     * Compute the hash of this node
     *
     * @returns The hash of this node
     */
    hash(): Hash256;
    /**
     * Writes the bytes representation of this node to a BytesList
     *
     * @param list BytesList to write bytes to
     */
    toBytesSink(list: BytesList): void;
    /**
     * Add item to the SHAMap
     *
     * @param index Hash of the index of the item being inserted
     * @param item Item to insert in the map
     * @param leaf Leaf node to insert when branch doesn't exist
     */
    addItem(index?: Hash256, item?: ShaMapNode, leaf?: ShaMapLeaf): void;
}
declare class ShaMap extends ShaMapInner {
}
export { ShaMap, ShaMapNode, ShaMapLeaf };
