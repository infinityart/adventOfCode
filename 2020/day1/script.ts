const target = 2020;

const expenseRapport: string = Deno.readTextFileSync("./day1/input.txt");
const expenses = expenseRapport
    .split(/\r?\n/)
    .filter(expense => expense !== "")
    .sort((previous, current) => parseInt(previous) - parseInt(current))
    .map(expense => parseInt(expense));

const expenseSum = (...expenses: number[]) => expenses.reduce((expenseTotal, expense) => expenseTotal + expense, 0);

export const partOne = async () => {
    let currentIndex = 0;
    let compareIndex = expenses.length - 1;

    const currentExpenseSum = () => expenseSum(expenses[currentIndex], expenses[compareIndex]);

    while (currentExpenseSum() !== target) {
        if (currentExpenseSum() < target) currentIndex += 1;
        if (currentExpenseSum() > target) compareIndex -= 1;
    }

    const expenseMultiplication = expenses[currentIndex] * expenses[compareIndex];

    console.log(`The multiplication of the two expenses are ${expenseMultiplication}`);
}

export const partTwo = async () => {
    for (let firstExpenseIndex = 0; firstExpenseIndex < expenses.length; firstExpenseIndex++) {
        const firstExpense = expenses[firstExpenseIndex];
        const currentTarget = target - firstExpense;

        let secondExpenseIndex = 0;
        let thirdExpenseIndex = expenses.length - 1;

        const secondExpense = () => expenses[secondExpenseIndex];
        const thirdExpense = () => expenses[thirdExpenseIndex];

        const currentExpenseSum = () => expenseSum(secondExpense(), thirdExpense());
        const expenseSumIsTarget = () => currentExpenseSum() === currentTarget;

        const firstExpenseLoopCondition = () => {
            if (expenseSumIsTarget()) return false;
            return secondExpenseIndex < thirdExpenseIndex;
        }

        while (firstExpenseLoopCondition()) {
            if (currentExpenseSum() < currentTarget) secondExpenseIndex += 1;
            if (currentExpenseSum() > currentTarget) thirdExpenseIndex -= 1;
        }

        if (expenseSumIsTarget()) {
            const expenseMultiplication = firstExpense * secondExpense() * thirdExpense();

            console.log(`The multiplication of the three expenses are ${expenseMultiplication}`);
            break;
        }
    }
}