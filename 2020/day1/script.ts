const script = async() => {
    const target = 2020;
    const expenseRapport: string = await Deno.readTextFile("./day1/input.txt");
    const expenses = expenseRapport
        .split(/\r?\n/)
        .filter(expense => expense !== "")
        .sort((previous, current) => parseInt(previous) - parseInt(current))
        .map(expense => parseInt(expense));

    let currentIndex = 0;
    let compareIndex = expenses.length - 1;

    const expenseSum = () => expenses[currentIndex] + expenses[compareIndex];

    while (expenseSum() !== target) {
        if (expenseSum() < target) currentIndex += 1;
        if (expenseSum() > target) compareIndex -= 1;
    }

    const expenseMultiplication = expenses[currentIndex] * expenses[compareIndex];

    console.log(`The multiplication of the two expenses are ${expenseMultiplication}`);
}

export default script;