import { state } from "@/game/state";
import { CreditCard } from "@/game/logic/products"
import { GameChoice, GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { chooseRandom, randomInterval, randomDecimal } from "@/utils";
import { eventNames } from "process";

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
    <br />
    <br />
    <ol>
      <h3>1. Enter university 📚</h3>
      <li>
      Attend {eventData.university}, with a tuition cost of \${eventData.uniTuition}
      </li>
      <h3>2. Enter a trade school 🔧</h3>
      <li>
      Attend {eventData.tradeSchool}, with a tuition cost of \${eventData.tradeTuition}
      </li>
      <h3>3. Don't attend higher education 🤷‍♂️</h3>
    </ol>`,
    () => true,
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
          return `Oh well, university isn't for everyone.
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
      const banks = ["TDBank", "The National Bank"];
      return { bank: chooseRandom(banks), rate: randomInterval(3, 7) }
    },
    true // repeatable
  ),
  new RandomEvent(
    "Get a Credit Card",
    0.2,
    null,
    `It's about time you got a credit card! Getting a credit card gives you access to
    having a <b>credit score</b>, which may be used to evaluate your eligibility in applying for loans,
    owning cars, and getting a mortgage for a house.`,
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
  new RandomEvent(
    "Purchase a car",
    0.2,
    null,
    `You hear knocking at the door and are approached by a car salesman at your local auto.
    He says that purchasing a car will make transportation in your life significantly more convenient than public transport,
    and presents you with a list of vehicles to purchase from. Do you:
    \nDo you:\n
    <ol>
      <li><h3>buy a cheap, used car 🚐</h3>
      Buy a {eventData.car}, with a markup cost of \${eventData.cheapCost}.
      However, because it's so cheap, you may <b>frequently have to spend money on repairs</b> and it
      definitely <b>doesn't seem like it'll last very long</b>...
      </li>
      <li><h3>buy an average car 🚗</h3>
      Buy a {eventData.car}, with a markup cost of \${eventData.averageCost}.
      It's not the prettiest car, but it looks reliable, durable, and sturdy enough to drive you around.
      </li>
      <li><h3>buy a luxury vehicle 🏎️</h3>
      Buy a {eventData.car}, with a markup cost of \${eventData.luxuryCost}.
      For it's hefty price, it's quality is definitely something to dream of.
      </li>
      <li><h3>stick with public transport 🤷‍♂️</h3></li>
    </ol>`,
    () => state.age > 21, //check if has car
    //you dont have money -- apply for a loan.
    [
      {
        label: "Cheap car",
        execute: (eventData) => {
          // gets a car
          return `Well- you're not here to buy a showpiece- and if it can be driven, you're sure you can work something out.
          You are now the proud owner of a ${eventData.cheapCar}`
        }
      },
      {
        label: "Average car",
        execute: (eventData) => {
          // gets a car
          return `Well- you're not here to buy a showpiece- and this car will definitely get you the best mileage.
          You are now the proud owner of a ${eventData.averageCar}`
        }
      },
      {
        label: "Luxury car",
        execute: (eventData) => {
          // gets a car
          return `Bracing your wallet, you purchase the car your eyes have always been set on,
          hoping your future self will thank you for this.
          You are now the proud owner of a ${eventData.luxuryCar}`
        }
      },
      {
        label: "None",
        execute: (eventData) => {
          return `Oh well, a car isn't for everyone.
          You'll get by with a cheaper options for now`
        }
      }
    ],
    () => {
      const cheapCars = ["Honda X", "Subaru V", "Toyota"];
      const averageCars = ["Ford Ranger", "Subaru VI"];
      const luxuryCars = ["Mustard", "Limouseine"];
      return {
        cheapCar: chooseRandom(cheapCars),
        averageCar: chooseRandom(averageCars),
        luxuryCar: chooseRandom(luxuryCars),
        cheapPrice: randomInterval(25, 30) * 1000,
        averagePrice: randomInterval(35, 45) * 1000,
        luxuryPrice: randomInterval(100, 120) * 1000,
      }
    }
  ),
  new RandomEvent(
    "Rent an apartment",
    0.6,
    null,
    `Your parents have had enough of you staying in their house. It's time you became your own man!
    But where to begin? You figure you should look around for some apartments to rent, and luckily find 2 suitable candidates.
    <br />
    <br />
    <ol>
      <h3>1. Room with strangers 🤔</h3>
      <li>
      For \${eventData.cheapCost} a month, The room looks... kinda dingy to be honest. And it definitely can fit 3 other roommates, but it won't be 
      comfortable for sure. But, you get what you get for the price, right?
      </li>
      <h3>2. Live by yourself 🤞🏼</h3>
      <li>
      For \${eventData.averageCost} a month, this apartment complex has a lot more amenities, and you won't be sharing. But it costs a bit more.
      Is the added comfort worth the cost?
      </li>
    </ol>`,
    () => state.age > 21, //check if has car
    //you dont have money -- apply for a loan.
    [
      {
        label: "Room with others 👥",
        execute: (eventData) => {
          // gets an apartment
          return `Well- you're not looking for something luxurious to live in,
          and this will definitely suffice until you get yourself back up.
          \nCongratulations! You're now renting an apartment with roommates!`
        }
      },
      {
        label: "Live alone 🧑",
        execute: (eventData) => {
          // gets an apartment
          return `Well- you've always been particular about living spaces, and
          living with other people is just not your style.
          \nCongratulations! You're now renting an apartment by yourself!`
        }
      },
    ],
    () => ({
      averageCost: randomInterval(12, 15) * 100,
      cheapCost: randomInterval(7, 9) * 90,
    })
  ),
  new ScheduledEvent(
    "Choose a career path",
    22,
    () => {
      state.education.inSchooling = false;
    },
    `Now that you've finished with undergraduate schooling, it's time to decide a career path!
    <br>
    <br>
    <ol>
      <h3>1. Apply for med school 🩺</h3>
      <li>
      For a hefty annual tuition of \${eventData.medCost} for 10 years, you will be able 
      to become a doctor. This guarantees high pay, but potentially high stress and lots of school fees. 
      Is this something you can handle?
      </li>
      <h3>2. Apply for law school ⚖️</h3>
      <li>
      For the hefty annual tuition of \${eventData.lawCost} for 3 years, you will be able 
      to become a lawyer. This guarantees high pay, but potentially high stress and lots of school fees. 
      Is this something you can handle?
      </li>
      <h3>Go straight to the workforce 💪</h3>
      <li>
      With an undergraduate degree, you will be able to find a decent job with good wages. Most importantly,
      you'll be able to avoid paying years of costly tuition.
      </li>
    </ol>`,
    () => state.education.level === "Grad" && state.education.yearsUntilGrad === 4,
    [
      {
        label: "Med School",
        execute: (eventData) => {
          state.education = {
            inSchooling: true,
            level: "Grad",
            tuition: eventData.medCost,
            yearsUntilGrad: 10,
            field: "Medicine"
          }
          return `Congratulations on being accepted into med school! For the next 10 years, you will
          work towards becoming a doctor!`
        }
      },
      {
        label: "Law School",
        execute: (eventData) => {
          state.education = {
            inSchooling: true,
            level: "Grad",
            tuition: eventData.lawCost,
            yearsUntilGrad: 4,
            field: "Law"
          }
          return `Congratulations on being accepted into law school! For the next 4 years, you will
          work towards becoming a lawyer!`
        }
      },
      {
        label: "Find a job",
        execute: (eventData) => {
          state.education.field = "Computer Science";
          return `Higher education isn't for everyone - and you know what you're really after - getting the money early.
          Good luck on finding a job!`
        }
      }
    ],
    () => {
      return {
        medCost: randomInterval(16, 20) * 1000,
        lawCost: randomInterval(22, 24) * 1000,
      }
    }
  ),
  new RandomEvent(
    "Own a home!",
    () => 0.3,
    null,
    `Now that you have a family and are getting settled into independent living,
    you feel that now is the time to purchase a home. However, owning a house, much less
    the process of buying a house, can be a tedious, expensive, and time-consuming process.
    Do you go ahead with the search?`,
    () => state.age > 30 &&(!!state.family.children?.length) && state.creditScore > 680 && state.income > 50000 && !state.housing, //be married
    [
      {
        label: "Accept",
        execute: (eventData) => {
          //50 50 chance or something for house hunting
        }
      },
      {
        label: "Decline",
      },
    ],
    undefined,
    true // repeatable
  ),
  new RandomEvent(
    "Insurance Offer",
    0.1,
    null,
    `You hear knocking at the door and are approached by an insurance salesman. 
    He says that purchasing a <b>Term Life Insurance Plan</b> will give you financial security. If you purchase 
    now, you will pay annual premiums amounting to \${eventData.premium} for the next 30 years, and a payment will be given
    to your family in the case of an untimely death. If the 30 years expires, you get to collect <b>all of the money you paid, 
    and some extra.</b> This seems like an extremely lucrative deal, especially if you're looking for financial security. 
    Do you take it?`,
    () => state.age > 30 && (!!state.family.children?.length) && !state.products.insurance, //check if family
    [
      {
        label: "Get insurance",
        execute: (eventData) => {
          /*state.products.insurance = new Insurance({
            active: true,
            balance: 100, //placeholder, prob will remove this value later
            interestRate: 1.05,
            creditLimit: 1000,
            interestFreePeriod: 1, //idk
          })*/
          return `Your next 30 years are now insured!`
        }
      },
      {
        label: "Maybe later",
      },
    ],
    () => ({
      premium: randomInterval(13, 20) * 100
    }),
    true //repeatable
  ),


  // All the random, lifestyle events

  new RandomEvent(
    "Good deal or not?",
    0.05,
    null,
    `Your friends have been telling you about the latest model of {eventData.product}, 
    a product which is all the rage. It's starting to get to you too, but you know it's too
    expensive for you. However, you just saw an advert online for a limited deal for 50% off
    for \${eventData.price}. This might be your only chance. Do you buy it?`,
    () => true, //always
    [
      {
        label: "Purchase",
        execute: (eventData) => {
          state.stress -= 20;
          state.money -= eventData.price;
          return `You buy it, feeling a flood of satisfaction fill your brain. Surely,
          this won't affect your budgeting in the long run, will it?`
        }
      },
      {
        label: "Decline",
        execute: (eventData) => {
          return `Maybe sometime later, but you know that buying this product will
          throw the rest of your budget off of balance.`
        }
      },
    ],
    () => ({
      product: chooseRandom(["iPhone X", "Samsung TV", "Louis Vutton"]),
      price: randomInterval(3, 5) * 1000,
    }),
    true, //repeats
  ),
  new RandomEvent(
    "Unexpected breakdown",
    0.075,
    null,
    `Uh oh! Your {eventData.product} just broke down, and it'll cost {eventData.price} to repair it.
    Not paying for repairs now may have consequences for your quality of life. What do you do?`,
    () => true, //always
    [
      {
        label: "Repair",
        execute: (eventData) => {
          state.money -= eventData.price;
          return `You pay for the repairs at the nearest shop, knowing that you need your ${eventData.product} to live.`
        }
      },
      {
        label: "Don't repair",
        execute: (eventData) => {
          state.qualityOfLife -= 10;
          return `Well- it isn't a choice you can afford right now. Better to tough it out,
          even if it makes life a bit more difficult without it.`
        }
      },
    ],
    () => ({
      product: chooseRandom(["cellphone", "car"]),
      price: randomInterval(20, 80) * 100,
    }),
    true, //repeats
  ),
  new RandomEvent(
    "Flu season!",
    0.12,
    null,
    `Uh oh! Looks like it's that time of the year again, and you caught an unfortunate case 
    of the flu. It looks pretty serious, maybe it's time to get it checked out just to make sure it's okay.
    Do you pay a visit to the doctor?`,
    () => true, //always
    [
      {
        label: "Go",
        execute: (eventData) => {
          state.qualityOfLife += 5;
          state.money -= 100;
          return `You get checked out by the doctor, he prescribes some medicine, and your flu appears cured.`
        }
      },
      {
        label: "Don't go",
        execute: (eventData) => {
          state.qualityOfLife -= 15;
          return `Unluckily, the flu didn't get any better by itself, and your health 
          got a bit worse.`
        }
      },
    ],
    () => { },
    true, //repeats
  ),
  new RandomEvent(
    "Unexpected emergency",
    0.05,
    null,
    `Uh oh! Looks like it's that time of the year again, and your child caught an unfortunate case 
    of the flu. It looks pretty serious, maybe it's time to get it checked out just to make sure it's okay.
    Do you pay a visit to the doctor?`,
    () => (!!state.family.children?.length), //if has kids
    [
      {
        label: "Go",
        execute: (eventData) => {
          state.family.value += 5;
          state.money -= 100;
          return `Your child gets checked out by the doctor, he prescribes some medicine, and their flu appears cured.`
        }
      },
      {
        label: "Don't go",
        execute: (eventData) => {
          state.family.value -= 15;
          return `Unluckily, the flu didn't get any better by itself, and your child's health 
          got a bit worse. Was the money you saved worth it?`
        }
      },
    ],
    () => { },
    true, //repeats
  ),
  new RandomEvent(
    "To buy or not?",
    0.05,
    null,
    `While on a walk, your child has been eyeing the {eventData.product} behind the shop window for a while now,
    but it looks pretty expensive. They ask you if you could purchase for them.
    Do you buy it for them?`,
    () => (!!state.family.children?.length), //if has kids
    [
      {
        label: "Yes",
        execute: (eventData) => {
          state.family.value += 5;
          state.money -= 150;
          return `Your child loves the ${eventData.product} which you bought, and they come home with a bright
          gleaming smile on their face.`
        }
      },
      {
        label: "No",
        execute: (eventData) => {
          state.family.value -= 5;
          return `You don't want to spoil your child. Sometimes, they have to learn that not everything
          in life is guaranteed.`
        }
      },
    ],
    () => ({
      product: chooseRandom(["Nutcracker", "Hot Wheels", "Lego"])
    }),
    true, //repeats
  ),
  new RandomEvent(
    "Surprise vacation",
    0.05,
    null,
    `At your workplace, you won the raffle for a trip to the Bahamas! It covers the airplane flight fees for
    all of your family, and your boss has agreed to give you leave for those days. However, going might mean missing out
    on some work days, and you would still have to pay for the other expenses. Do you go?`,
    () => ( !!state.family.children?.length), //if has kids
    [
      {
        label: "Go",
        execute: (eventData) => {
          state.family.value += 15;
          state.stress -= 20;
          state.money -= 5000;
          return `You seize the opportunity and make the most of it. The trip is a blast
          and you come back feeling refreshed, and ready to slough through anything life
          puts in your way.`
        }
      },
      {
        label: "Don't",
        execute: (eventData) => {
          state.family.value -= 5;
        }
      },
    ],
    () => { },
    true, //repeats
  ),
  new RandomEvent(
    "Dating",
    0.1,
    null,
    `Feeling sick of your singleness, you decide that it might be time to enter the dating
    market. Although there may be added responsibility and stress, this may be a good opportunity
    to find new human connection. What do you do?`,
    () => !state.family.spouse, //if single
    [
      {
        label: "Search for a potential date",
        execute: (eventData) => {
          //Activates date looking thing, 50 50 chance of finding one
        }
      },
      {
        label: "No",
        execute: (eventData) => {
          return `You value being a bachelor. After all, you get more time for yourself, and
          for your hobbies.`
        }
      },
    ],
    () => { },
    true, //repeats
  ),
  new RandomEvent(
    "Proposal",
    0.1,
    null,
    `Having sufficient time to get to know you, your partner asks youif you would like to get engaged.
    What do you do?`,
    () => state.family.spouse?.relationship=="Dating", //if dating
    [
      {
        label: "Yes",
        execute: (eventData) => {
          //Changes family state to marriage
          return `You get happily married!`
        }
      },
      {
        label: "No",
      },
    ],
    () => { },
    true, //repeats
  ),
  new RandomEvent(
    "Kids?",
    0.1,
    null,
    `Your partner asks if you if you would like to have kids. What do you say?`,
    () => state.family.spouse?.relationship=="Spouse", //if married
    [
      {
        label: "Yes",
        execute: (eventData) => {
          //Adds kids to family, n stuff
        }
      },
      {
        label: "No",
      },
    ],
    () => { },
    true, //repeats
  ),
  new RandomEvent(
    "Promotion",
    () => 0.05 * (state.job ? Math.max(state.job?.yearsEmployed, 4) : 1),
    (eventData) => {
      if (state.job) state.job.salary += eventData.raise;
    },
    `Seeing the good work you've done for the company, your boss rewards you with a raise of
    \${eventData.raise}. He then pats you on the back and tells you to keep up your efforts.`,
    () => state.job != null, //has a job
    [
      {
        label: "Continue",
      },
    ],
    () => ({
      raise: randomInterval(4, 5) * 1000
    }),
    true, //repeats
  ),



  // Illnesses and Stuff
  new RandomEvent(
    "Major Illness",
    () => 0.1 * (1 / state.qualityOfLife),
    (eventData) => {
      state.qualityOfLife -= 40;
    },
    `Oh no! You've developed a serious case of {eventData.illness}, and needed to be hospitalized for the 
    next few weeks. Your doctor says that the symptoms are not persistent, but you may require 
    to undergo special treatment in order to fully cure of it. However, it will cost you \${eventData.cost}. 
    Do you take it?`,
    () => state.age > 30, //always can happen
    [
      {
        label: "Yes",
        execute: (eventData) => {
          state.qualityOfLife += 45;
          state.money -= eventData.cost;
        }
      },
      {
        label: "No"
      }
    ],
    () => ({
      illness: chooseRandom(["Lymphoma", "Kidney Disease", "Type 1 Diabetes"]),
      cost: randomInterval(10, 20) * 1000
    }),
    true, //repeats
  ),
 
];
