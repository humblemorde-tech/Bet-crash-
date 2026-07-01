export const MPESA_LIMITS = {
    DEPOSIT: { MIN: 50, MAX: 40000 },
    WITHDRAW: { MIN: 100, MAX: 300000 }
};

export function validateTransaction(amount, type) {
    const limits = type === 'deposit' ? MPESA_LIMITS.DEPOSIT : MPESA_LIMITS.WITHDRAW;
    return amount >= limits.MIN && amount <= limits.MAX;
}

