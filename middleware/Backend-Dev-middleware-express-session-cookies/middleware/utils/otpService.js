export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Temporary in-memory store (for practice)
const otpStore = new Map();

export const saveOTP = (userId, otp) => {
    otpStore.set(userId, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins
    });
};

export const verifyOTP = (userId, otp) => {
    const record = otpStore.get(userId);

    if (!record) return false;
    if (record.expiresAt < Date.now()) return false;

    return record.otp === otp;
};