export default function isSettingsEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
};
