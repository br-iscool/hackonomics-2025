import * as products from "./products";
import { Finance } from "@/game/types";

export class FinanceManager {
    public creditCard?: products.CreditCard;
    public loans: products.Loan[] = [];
    public savings: products.SavingsAccount;
    public mortgage?: products.Mortgage;
    public insurance?: products.Insurance;
    //public investments: products.FinancialProduct[] = [];

    constructor(financeData: Finance) {
        const { products: financeProducts } = financeData;

        if (financeProducts.creditCard) {
            this.creditCard = new products.CreditCard(financeProducts.creditCard);
        }

        this.loans = financeProducts.loans.map(data => new products.Loan(data));
        this.savings = new products.SavingsAccount(financeProducts.savings);

        if (financeProducts.mortgage) {
            this.mortgage = new products.Mortgage(financeProducts.mortgage);
        }

        if (financeProducts.insurance) {
            this.insurance = new products.Insurance(financeProducts.insurance);
        }
    }

    nextTurn() {
        if (this.creditCard) this.creditCard.nextTurn();

        this.loans.forEach(loan => loan.nextTurn());
        this.savings.nextTurn();
        if (this.mortgage) this.mortgage.nextTurn();
        if (this.insurance) this.insurance.nextTurn();

        this.updateCreditScore();
    }

    private updateCreditScore() {
        // Placeholder for real logic
        console.log("Updating credit score...");
    }
}
