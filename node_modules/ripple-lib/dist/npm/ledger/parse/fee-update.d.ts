declare function parseFeeUpdate(tx: any): {
    memos: import("../../common/types/objects").Memo[];
    baseFeeXRP: string;
    referenceFeeUnits: any;
    reserveBaseXRP: string;
    reserveIncrementXRP: string;
};
export default parseFeeUpdate;
//# sourceMappingURL=fee-update.d.ts.map