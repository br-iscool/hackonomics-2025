import * as products from "./products";
import { Finance } from "@/game/types";

export class FinanceManager {
  public creditCard?: products.CreditCard;
  public loans: products.Loan[] = [];
  public savings: products.SavingsAccount;
  public mortgage?: products.Mortgage;
  public insurance?: products.Insurance;
  public summary: {
    income: number;
    expenses: number;
    budget: number;
    debt: number;
    netWorth: number;

    creditScore: number;
    paymentHistory: number;
    totalPayments: number;
    onTimePayments: number;
    yearsCredit: number;
  };
  //public investments: products.FinancialProduct[] = [];

  constructor(financeData: Finance) {
    const { products: financeProducts, summary: summary } = financeData;

    this.summary = summary;

    if (financeProducts.creditCard) {
      this.creditCard = new products.CreditCard(financeProducts.creditCard);
    }

    this.loans = financeProducts.loans.map((data) => new products.Loan(data));
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

    this.loans.forEach((loan) => loan.nextTurn());
    this.savings.nextTurn();
    if (this.mortgage) this.mortgage.nextTurn();
    if (this.insurance) this.insurance.nextTurn();

    this.updateCreditScore();
  }

  private updateCreditScore() {
    this.summary.paymentHistory = this.summary.onTimePayments / this.summary.totalPayments;
    const creditHistory = this.summary.yearsCredit / 10; // approximate

    this.summary.creditScore =
      (this.summary.paymentHistory * 0.7 + creditHistory * 0.3) * 600 + 300;
  }
}
