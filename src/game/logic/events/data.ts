import { state } from "@/game/state";
import { CreditCard } from "@/game/logic/products"
import { GameChoice, GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { chooseRandom, randomInterval, randomDecimal } from "@/utils";

export const gameEvents: GameEvent[] = [
  new RandomEvent(
    "Part-time Job",
    () => 0.1, //gets employability from state
    null,
    `You have been offered the position of a <b>{eventData.role}</b>
    at the local {eventData.location}
    for a starting salary of <b>\${eventData.salary}</b>. Do you accept?`,
    () => state.job == null && state.education.inSchooling,
    [
      {
        label: "Accept",
        execute: (eventData) => {
          state.job = { role: eventData.role, salary: eventData.salary, yearsEmployed: 0 };
          return `Congrats! You are now employed as a <b>${eventData.role}.</b>`
        }
      },
      {
        label: "Decline",
      },
    ],
    () => {
      const roles = ["Cashier", "Janitor", "Security Guard"];
      const locations = ["IHoP", "MacDennys", "Sofaway"];

      return {
        role: chooseRandom(roles),
        location: chooseRandom(locations),
        salary: randomInterval(6, 12) * 1000,
      }
    },
    true // repeatable
  ),
  new ScheduledEvent(
    "Choose an educational path",
    18,
    () => {
      state.money += 1000;
    },
    `Congratulations on surviving 18 years of primary schooling! Now,
    it's time for you to choose an education pathway all for yourself.
    \nDo you:\n
    <ol>
      <li><h3>go to university 🏫</h3>
      Attend {eventData.university}, with a tuition cost of \${eventData.uniTuition}
      </li>
      <li><h3>enter a trade school 🔧</h3>
      Attend {eventData.tradeSchool}, with a tuition cost of \${eventData.tradeTuition}
      </li>
      <li><h3>go straight into the workforce 🤷‍♂️</h3></li>
    </ol>`,
    undefined,
    [
      {
        label: "University",
        execute: (eventData) => {
          state.education = { inSchooling: true, tuition: eventData.uniTuition, level: "Undergrad", yearsUntilGrad: 4 };
          return `Congratulations! You are now an undergraduate studying at ${eventData.university}`
        }
      },
      {
        label: "Trade School",
        execute: (eventData) => {
          state.education = { inSchooling: true, tuition: eventData.uniTuition, level: "Vocational", yearsUntilGrad: 2 };
          return `Congratulations! You are now studying to be an
          <b>${eventData.tradeProfession}</b> at ${eventData.tradeSchool}.`
        }
      },
      {
        label: "Neither!",
        execute: (eventData) => {
          state.education.inSchooling = false;
          return `Oh well, maybe university isn't for everyone.
          There are plenty of ways to succeed without higher education!`
        }
      }
    ],
    () => {
      const tradeSchools = ["Polytechnic Institute", "Abraham Tech", "Minnesota Tech"];
      const universities = ["Rutgers University", "Cambrodge College", "McHarvard University"];

      return {
        tradeSchool: chooseRandom(tradeSchools),
        university: chooseRandom(universities),
        uniTuition: randomInterval(4, 6) * 1000,
        tradeTuition: randomInterval(2, 4) * 1000,
      }
    }
  ),
  new RandomEvent(
    "Open a Savings Account",
    () => state.products.savings ? 0.2 : 0.4,
    null,
    `You hear knocking at the door and are approached by a representative of {eventData.bank}.
    He offers you a deal to open a High Interest Savings Account, with an annual interest rate of
    {eventData.rate}%. Do you:`,
    () => state.age > 17,
    [
      {
        label: "Accept the deal?",
        execute: (eventData) => {
          state.products.savings = {
            active: true,
            name: eventData.bank,
            interestRate: eventData.rate / 100,
          }
          return `You are now the proud owner of a bank account with a rate of ${eventData.rate}% yearly.</b>`
        }
      },
      {
        label: "Decline",
      },
    ],
    () => {
      const banks = ["TDBank", "the National Bank"];
      return { bank: chooseRandom(banks), rate : randomInterval(3,7) }
    },
    true // repeatable
  ),
  new RandomEvent(
    "Get a Credit Card",
    0.2,
    null,
    `It's about time you got a credit card! Getting a credit card gives you access to
    having a <b>credit score</b>, which may be used to evaluate your eligibility in applying for loans,
    owning cars, and getting a mortgage for a house. Do you`,
    () => state.age > 17 && state.products.savings,
    [
      {
        label: "Get a credit card now?",
        execute: (eventData) => {
          state.products.creditCard = new CreditCard({
            active: true,
            balance: 100, //placeholder, prob will remove this value later
            interestRate: 1.05,
            creditLimit: 1000,
            interestFreePeriod: 1, //idk
          })
          return `You now have a credit card! But be careful, with great power comes great responsibility...`
        }
      },
      {
        label: "Wait for later",
      },
    ],
  ),
  /*new RandomEvent(
    "Purchase a car",
    0.2,
    
  )*/
];
