import { state } from "@/game/logic/game-state";
import { GameEvent, ScheduledEvent, RandomEvent } from "./event-classes";
import { chooseRandom, randomInterval } from "@/lib/utils";
import { canPurchase } from "@/game/logic/game-loop";
import Color from "@/components/ui/color"

export const gameEvents: GameEvent[] = [
  // University
  new ScheduledEvent(
    "Higher Education",
    18,
    () => {
      state.money += 1000;
    },
    (eventData) => (
      <>
        Congratulations on surviving 18 years of primary schooling! Now, it's time for you to choose an education pathway all for yourself.
        <br />
        <br />
        <ol>
          <li>
            <h3>1. Enter university 📚</h3>
            Attend {eventData.university}, with a tuition cost of <Color>${eventData.uniTuition}</Color> annually
          </li>
          <li>
            <h3>2. Enter a trade school 🔧</h3>
            Attend {eventData.tradeSchool}, with a tuition cost of <Color>${eventData.tradeTuition}</Color> annually
          </li>
          <li>
            <h3>3. Don't attend higher education 🤷‍♂️</h3>
          </li>
        </ol>
      </>
    ),
    () => true,
    [
      {
        label: "University",
        execute: (eventData) => {
          state.education = {
            inSchooling: true,
            tuition: eventData.uniTuition,
            level: "Undergrad",
            yearsUntilGrad: 4,
          };
          state.expenses["education"] = eventData.uniTuition;
          return (
            <>
              Congratulations! You are now an undergraduate studying at <b>{eventData.university}</b>!
            </>
          );
        },
      },
      {
        label: "Trade School",
        execute: (eventData) => {
          state.education = {
            inSchooling: true,
            tuition: eventData.tradeTuition,
            level: "Vocational",
            yearsUntilGrad: 2,
          };
          state.expenses["education"] = eventData.uniTuition;
          return (
            <>
              Congratulations! You are now studying to be an <Color>{eventData.tradeProfession}</Color> at {eventData.tradeSchool}.
            </>
          );
        },
      },
      {
        label: "Neither!",
        execute: (eventData) => {
          state.education.inSchooling = false;
          return (
            <>
              Oh well, university isn't for everyone. There are plenty of ways to succeed without higher education!
            </>
          );
        },
      },
    ],
    () => {
      const tradeSchools = ["Polytechnic Institute", "Abraham Tech", "Minnesota Tech"];
      const universities = ["Rutgers University", "Cambrodge College", "McHarvard University"];

      return {
        tradeSchool: chooseRandom(tradeSchools),
        university: chooseRandom(universities),
        uniTuition: randomInterval(8, 12) * 1000,
        tradeTuition: randomInterval(5, 7) * 1000,
      };
    }
  ),

  // Graduate school
  new ScheduledEvent(
    "Choose a higher education path",
    22,
    () => {
      state.education.inSchooling = false;
    },
    (eventData) => (
      <div>
        Now that you've finished with undergraduate schooling, it's time to decide a career path!
        <br />
        <br />
        <ol>
          <li>
            <h3>1. Apply for med school 🩺</h3>
            For a hefty annual tuition of <Color>${eventData.medCost}</Color> for 10 years, you will be able
            to become a doctor. This guarantees high pay, but potentially high stress and lots of school fees.
            Is this something you can handle?
          </li>
          <li>
            <h3>2. Apply for law school ⚖️</h3>
            For the hefty annual tuition of <Color>${eventData.lawCost}</Color> for 4 years, you will be able
            to become a lawyer. This guarantees high pay, but potentially high stress and lots of school fees.
            Is this something you can handle?
          </li>
          <li>
            <h3>Go straight to the workforce 💪</h3>
            With an undergraduate degree, you will be able to find a decent job with good wages. Most importantly,
            you'll be able to avoid paying years of costly tuition.
          </li>
        </ol>
      </div>
    ),
    () => state.education.level === "Undergrad" && state.education.yearsUntilGrad === 0,
    [
      {
        label: "Med School",
        execute: (eventData) => {
          state.education = {
            inSchooling: true,
            level: "Grad",
            tuition: eventData.medCost,
            yearsUntilGrad: 10,
            field: "Medicine",
          };
          state.expenses["education"] = eventData.medCost;
          return (
            <>
              Congratulations on being accepted into med school! For the next 10 years, you will
              work towards becoming a doctor!
            </>
          );
        },
      },
      {
        label: "Law School",
        execute: (eventData) => {
          state.education = {
            inSchooling: true,
            level: "Grad",
            tuition: eventData.lawCost,
            yearsUntilGrad: 4,
            field: "Law",
          };
          state.expenses["education"] = eventData.lawCost;
          return (
            <>
              Congratulations on being accepted into law school! For the next 4 years, you will
              work towards becoming a lawyer!
            </>
          );
        },
      },
      {
        label: "Find a job",
        execute: (eventData) => {
          return (
            <>
              Higher education isn't for everyone - and you know what you're really after - getting the money early.
              Good luck on finding a job!
            </>
          );
        },
      },
    ],
    () => {
      return {
        medCost: randomInterval(20, 24) * 1000,
        lawCost: randomInterval(25, 30) * 1000,
      };
    }
  ),

  // Savings account
  new RandomEvent(
    "Open a Savings Account",
    () => (state.products.savings ? 0 : 0.4), // Doesn't repeat if the player already has an account
    null,
    (eventData) => (
      <>
        You hear knocking at the door and are approached by a representative of {eventData.bank}.
        He offers you a deal to open a High Interest Savings Account, with an annual interest rate of{" "}
        {eventData.rate}%. Do you accept the deal?
      </>
    ),
    () => state.age > 17 && !state.products.savings,
    [
      {
        label: "Accept the deal?",
        execute: (eventData) => {
          state.products.savings = {
            active: true,
            name: eventData.bank,
            interestRate: eventData.rate / 100,
            yearsElapsed: 0,
          };
          return (
            <div>
              You are now the proud owner of a bank account with a rate of {eventData.rate}% yearly.
            </div>
          );
        },
      },
      {
        label: "Decline",
      },
    ],
    () => {
      const banks = ["TD Bank", "The National Bank"];
      return { bank: chooseRandom(banks), rate: randomInterval(3, 7) };
    },
    true
  ),

  // Credit card
  new RandomEvent(
    "Get a Credit Card",
    () => (state.products.creditCard ? 0 : 0.5),
    null,
    (eventData) => (
      <>
        It's about time you got a credit card! Getting a credit card gives you access to
        having a <b>credit score</b>, which may be used to evaluate your eligibility in applying for loans,
        owning cars, and getting a mortgage for a house.
      </>
    ),
    () => state.age > 17 && !!state.products.savings && !state.products.creditCard,
    [
      {
        label: "Get a credit card now?",
        execute: (eventData) => {
          state.products.creditCard = true
          return (
            <>
              You now have a credit card! But be careful, with great power comes great responsibility...
            </>
          );
        },
      },
      {
        label: "Wait for later",
      },
    ],
    undefined,
    true
  ),

  // Car
  new RandomEvent(
    "Purchase a car",
    () => (state.car ? 0 : 0.2),
    null,
    (eventData) => (
      <>
        You hear knocking at the door and are approached by a car salesman at your local auto.
        He says that purchasing a car will make transportation in your life significantly more convenient than public transport,
        and presents you with a list of vehicles to purchase from.
        <br />
        <br />
        <ol>
          <li>
            <h3>Buy a cheap, used car 🚐</h3>
            Buy a {eventData.cheapCar}, with a markup cost of <Color>${eventData.cheapPrice}</Color>.
            However, because it's so cheap, you may <b>frequently have to spend money on repairs</b> and it
            definitely <b>doesn't seem like it'll last very long</b>...
          </li>
          <li>
            <h3>Buy an average car 🚗</h3>
            Buy a {eventData.averageCar}, with a markup cost of <Color>${eventData.averagePrice}</Color>.
            It's not the prettiest car, but it looks reliable, durable, and sturdy enough to drive you around.
          </li>
          <li>
            <h3>Buy a luxury car 🏎️</h3>
            Buy a {eventData.luxuryCar}, with a markup cost of <Color>${eventData.luxuryPrice}</Color>.
            For it's hefty price, it's quality is definitely something to dream of.
          </li>
          <li>
            <h3>Stick with public transport 🤷‍♂️</h3>
            It's not as convenient, but it's definitely cheap.
          </li>
        </ol>
      </>),
    () => state.age > 21 && !state.car, // Only show if they don't have a car
    [
      {
        label: "Cheap car",
        condition: (eventData) => canPurchase(eventData.cheapPrice),
        execute: (eventData) => {
          state.car = {
            type: "Cheap",
            name: eventData.cheapCar,
            value: eventData.cheapPrice,
            reliability: "low",
          };
          state.money -= eventData.cheapPrice;
          return (
            <>
              Well- you're not here to buy a showpiece- and if it can be driven, you're sure you can work something out.
              You are now the proud owner of a {eventData.cheapCar}
            </>
          );
        },
      },
      {
        label: "Average car",
        condition: (eventData) => canPurchase(eventData.averagePrice),
        execute: (eventData) => {
          state.car = {
            type: "Average",
            name: eventData.averageCar,
            value: eventData.averagePrice,
            reliability: "medium",
          };
          state.money -= eventData.averagePrice;
          return (
            <>
              Well- you're not here to buy a showpiece- and this car will definitely get you the best mileage.
              You are now the proud owner of a {eventData.averageCar}
            </>
          );
        },
      },
      {
        label: "Luxury car",
        condition: (eventData) => canPurchase(eventData.luxuryPrice),
        execute: (eventData) => {
          state.car = {
            type: "Luxury",
            name: eventData.luxuryCar,
            value: eventData.luxuryPrice,
            reliability: "high",
          };
          state.money -= eventData.luxuryPrice;
          return (
            <>
              Bracing your wallet, you purchase the car your eyes have always been set on,
              hoping your future self will thank you for this.
              You are now the proud owner of a {eventData.luxuryCar}
            </>);
        },
      },
      {
        label: "None",
        execute: (eventData) => {
          return (
            <>
              Oh well, a car isn't for everyone.
              You'll get by with a cheaper options for now
            </>
          );
        },
      },
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
      };
    },
    true
  ),

  // Apartment
  new ScheduledEvent(
    "Rent an apartment",
    25,
    null,
    (eventData) => (
      <>
        Your parents have had enough of you staying in their house. It's time you became independent!
        But where to begin? You figure you should look around for some apartments to rent, and luckily find 2 suitable candidates.
        <br />
        <br />
        <ol>
          <li>
            <h3>1. Room with strangers 🤔</h3>
            For <Color>${eventData.cheapCost}</Color> a month, you can room with strangers. The room looks... kinda dingy to be honest. And it definitely can fit 3 other roommates, but it won't be
            comfortable for sure. But, you get what you get for the price, right?
          </li>
          <li>
            <h3>2. Live by yourself 🤞🏼</h3>
            For <Color>${eventData.averageCost}</Color> a month, this apartment complex has a lot more amenities, and you won't be sharing. But it costs a bit more.
            Is the added comfort worth the cost?
          </li>
        </ol>
      </>
    ),
    () => state.age > 21 && state.housing.type === "Parents",
    //you dont have money -- apply for a loan.
    [
      {
        label: "Room with others 👥",
        execute: (eventData) => {
          // gets an apartment
          state.expenses["housing"] = (eventData.cheapCost * 12);
          return (
            <div>
              Well- you're not looking for something luxurious to live in,
              and this will definitely suffice until you get yourself back up.
              Congratulations! You're now renting an apartment with roommates!
            </div>
          );
        },
      },
      {
        label: "Live alone 🧑",
        execute: (eventData) => {
          // gets an apartment
          state.expenses["housing"] = (eventData.averageCost * 12);
          return (
            <div>
              Well - you've always been particular about living spaces, and
              living with other people is just not your style.
              Congratulations! You're now renting an apartment by yourself!
            </div>
          );
        },
      },
    ],
    () => ({
      cheapCost: randomInterval(15, 18) * 100,
      averageCost: randomInterval(25, 30) * 100, 
    })
  ),

  // House
  new ScheduledEvent(
    "Own a home!",
    35,
    null,
    (eventData) => (
      <>
        Now that you have a family and are getting settled into independent living,
        you feel that now is the time to purchase a home. However, owning a house, much less
        the process of buying a house, can be a tedious, expensive, and time-consuming process. Luckily, you find three good options. 
        <br />
        <br />
        <ol>
          <li>
            <h3>1. Small Home 🏚️</h3>
            For <Color>${eventData.cheapPrice.toLocaleString()}</Color> in total with a down payment of <Color>${eventData.cheapPayment.toLocaleString()}</Color> and monthly payments of ${eventData.cheapMonthly.toLocaleString()}, you can afford a small home. The amenities aren't the best, and the condition isn't great, but it will probably be enough to raise a family.
          </li>
          <li>
            <h3>2. Regular Home 🏡</h3>
            For <Color>${eventData.regularPrice.toLocaleString()}</Color> in total with a down payment of <Color>${eventData.regularPayment.toLocaleString()}</Color> and monthly payments of ${eventData.regularMonthly.toLocaleString()}, you can buy a regular home. This house has a lot more amenities, and it will definitely be enough to raise a family comfortably.
          </li>
          <li>
            <h3>3. Luxury Home 🏘️</h3>
            For <Color>${eventData.luxuryPrice.toLocaleString()}</Color> in total with a down payment of <Color>${eventData.luxuryPayment.toLocaleString()}</Color> and monthly payments of ${eventData.luxuryMonthly.toLocaleString()}, you can buy a luxury home. This home is one of the best homes money can buy. It features several luxury amenities, and your family will be the happiest.
          </li>
        </ol>
      </>
    ),
    () => state.family.spouse?.spouseStatus === "Married", // Only if married
    [
      {
        label: "Small Home 🏚️",
        condition: (eventData) => canPurchase(eventData.cheapPayment),
        execute: (eventData) => {
          state.housing = {
            type: "House",
          };
          state.expenses["housing"] = eventData.cheapMonthly * 12;
          state.money -= eventData.cheapPayment;
          state.stress -= 15;
          
          return (
            <>
              Congratulations! You've purchased the small home for a total price of ${eventData.cheapPrice.toLocaleString()}! 
              With a down payment of ${eventData.cheapPayment.toLocaleString()} and monthly payments of ${eventData.cheapMonthly.toLocaleString()}, 
              you're now a homeowner!
            </>
          );
        },
      },
      {
        label: "Regular Home 🏡",
        condition: (eventData) => canPurchase(eventData.regularPayment),
        execute: (eventData) => {
          state.housing = {
            type: "House",
          };
          state.expenses["housing"] = eventData.regularMonthly * 12;
          state.money -= eventData.regularPayment;
          
          return (
            <>
              Congratulations! You've purchased the regular home for ${eventData.regularPrice.toLocaleString()}! 
              With a down payment of ${eventData.regularPayment.toLocaleString()} and monthly payments of ${eventData.regularMonthly.toLocaleString()}, 
              you're now a homeowner!
            </>
          );
        },
      },
      {
        label: "Luxury Home 🏘️",
        condition: (eventData) => canPurchase(eventData.luxuryPayment),
        execute: (eventData) => {
          state.housing = {
            type: "House",
          };
          state.expenses["housing"] = eventData.luxuryMonthly * 12;
          state.money -= eventData.luxuryPayment;
          state.stress += 15;
          state.family.value = (state.family.value || 0) + 15;
          
          return (
            <>
              Congratulations! You've purchased the luxury home for ${eventData.luxuryPrice.toLocaleString()}! 
              With a down payment of ${eventData.luxuryPayment.toLocaleString()} and monthly payments of ${eventData.luxuryMonthly.toLocaleString()}, 
              you're now a homeowner! Your family is thrilled with the luxury amenities!
            </>
          );
        },
      },
      {
        label: "Keep renting",
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) - 15;
          return (
            <>
              You decide that homeownership isn't for you right now. 
              Renting gives you more flexibility, and you're not ready for the financial commitment of a mortgage.
            </>
          );
        },
      },
    ],
    () => {
      const cheapPrice = randomInterval(250, 400) * 1000;
      const regularPrice = randomInterval(400, 650) * 1000;
      const luxuryPrice = randomInterval(1000, 1500) * 1000;

      // Calculate 20% down payments
      const cheapPayment = Math.floor(cheapPrice * 0.2);
      const regularPayment = Math.floor(regularPrice * 0.2);
      const luxuryPayment = Math.floor(luxuryPrice * 0.2);

      // 20 year mortgage
      const cheapMonthly = Math.floor((cheapPrice - cheapPayment) * 0.0075);
      const regularMonthly = Math.floor((regularPrice - regularPayment) * 0.0075);
      const luxuryMonthly = Math.floor((luxuryPrice - luxuryPayment) * 0.0075);

      return {
        cheapPrice,
        regularPrice,
        luxuryPrice,
        cheapPayment,
        regularPayment,
        luxuryPayment,
        cheapMonthly,
        regularMonthly,
        luxuryMonthly
      };
    }
  ),

  // All the random, lifestyle events
  // Product event
  new RandomEvent(
    "Good deal or not?",
    0.05,
    null,
    (eventData) => (
      <>
        Your friends have been telling you about the latest model of {eventData.product},
        a product which is all the rage. It's starting to get to you too, but you know it's too
        expensive for you. However, you just saw an advert online for a limited deal for 50% off
        for <Color>${eventData.price}</Color>. This might be your only chance. Do you buy it?
      </>
    ),
    () => true, //always
    [
      {
        label: "Purchase",
        condition: (eventData) => canPurchase(eventData.price),
        execute: (eventData) => {
          state.stress -= 20;
          state.money -= eventData.price;
          return (
            <>
              You buy it, feeling a flood of satisfaction fill your brain. Surely,
              this won't affect your budgeting in the long run, will it?
            </>
          );
        },
      },
      {
        label: "Decline",
        execute: (eventData) => {
          return (
            <>
              Maybe sometime later, but you know that buying this product will
              throw the rest of your budget off of balance.
            </>
          );
        },
      },
    ],
    () => ({
      product: chooseRandom(["iPhone X", "Samsung TV", "Louis Vutton"]),
      price: randomInterval(3, 5) * 1000,
    }),
    true //repeats
  ),

  // Product broken event
  new RandomEvent(
    "Unexpected breakdown",
    0.075,
    null,
    (eventData) => (
      <>
        Uh oh! Your {eventData.product} just broke down, and it'll cost <Color>${eventData.price}</Color> to repair it.
        Not paying for repairs now may have consequences for your quality of life. What do you do?
      </>
    ),
    () => true, //always
    [
      {
        label: "Repair",
        condition: (eventData) => canPurchase(eventData.price),
        execute: (eventData) => {
          state.money -= eventData.price;
          return (
            <>
              You pay for the repairs at the nearest shop, knowing that you need your {eventData.product} to live.
            </>
          );
        },
      },
      {
        label: "Don't repair",
        execute: (eventData) => {
          state.stress += 10;
          return (
            <>
              Well- it isn't a choice you can afford right now. Better to tough it out,
              even if it makes life a bit more difficult without it.
            </>
          );
        },
      },
    ],
    () => ({
      product: chooseRandom(["cellphone", "fridge"]),
      price: randomInterval(20, 80) * 100,
    }),
    true //repeats
  ),

  // Flu event
  new RandomEvent(
    "Flu season!",
    0.1,
    null,
    (eventData) => (
      <>
        Uh oh! Looks like it's that time of the year again, and you caught an unfortunate case
        of the flu. It looks pretty serious, maybe it's time to get it checked out just to make sure it's okay.
        Do you pay a visit to the doctor?
      </>
    ),
    () => true, //always
    [
      {
        label: "Go ($100)",
        condition: (eventData) => canPurchase(100),
        execute: (eventData) => {
          state.stress -= 10;
          state.money -= 100;
          return (
            <>
              You get checked out by the doctor, he prescribes some medicine, and your flu appears cured.
            </>
          );
        },
      },
      {
        label: "Don't go",
        execute: (eventData) => {
          state.stress += 15;
          return (
            <>
              Unluckily, the flu didn't get any better by itself, and your health
              got a bit worse.
            </>
          );
        },
      },
    ],
    () => { },
    true //repeats
  ),

  // Dating
  new RandomEvent(
    "Dating",
    () => (state.family.spouse ? 0 : 0.4),
    null,
    (eventData) => (
      <>
        Feeling sick of your singleness, you decide that it might be time to enter the dating
        market. Although there may be added responsibility and stress, this may be a good opportunity
        to find new human connection. What do you do?
      </>
    ),
    () => !state.family.spouse && state.age > 23, // if single and age > 23
    [
      {
        label: "Look for a date",
        execute: (eventData) => {
          // 50% chance of finding someone
          const successful = Math.random() < 0.5;
          
          if (successful) {
            state.family.spouse = {
              age: state.age + randomInterval(-3, 3),
              relationship: "Partner",
              health: "Healthy",
              spouseStatus: "Relationship",
              yearsWithPartner: 0 // Initialize years together
            };
            state.family.value = 10; // Initial relationship value
            
            return (
              <>
                Great news! You met somebody and you've started dating! 
              </>
            );
          } else {
            state.stress += 5;
            return (
              <>
                Unfortunately, despite your best efforts, you didn't find anyone compatible. 
                Dating can be tough, but don't give up! There are plenty of fish in the sea.
              </>
            );
          }
        },
      },
      {
        label: "No",
        execute: (eventData) => {
          return (
            <>
              You value being a bachelor. After all, you get more time for yourself, and
              for your hobbies.
            </>
          );
        },
      },
    ],
    () => ({}),
    true // Not repeatable - once you have a partner, this event won't occur again
  ),

  // Proposal
  new RandomEvent(
    "Proposal",
    () => {
      // Increased to 60% chance if dating for 5+ years and not married
      if (state.family.spouse?.spouseStatus === "Relationship" && 
          (state.family.spouse.yearsWithPartner ?? 0) >= 5) {
        return 0.6; // Increased from 0.2 to 0.6
      }
      return 0;
    },
    null,
    (eventData) => (
      <>
        Having sufficient time to get to know you, your partner asks you if you would like to get engaged.
        What do you do?
      </>
    ),
    () => state.family.spouse?.spouseStatus === "Relationship" && 
         (state.family.spouse.yearsWithPartner ?? 0) >= 5, // Dating for 5+ years
    [
      {
        label: "Yes",
        execute: (eventData) => {
          if (state.family.spouse) {
            state.family.spouse.spouseStatus = "Married";
          }
          state.family.value = (state.family.value || 0) + 20;
          state.stress += 5;
          return (
            <>
              You get happily married!
            </>
          );
        },
      },
      {
        label: "No",
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) - 20;
          return (
            <>
              You decide it isn't time for marriage yet.
            </>
          )
        }
      },
    ],
    () => ({}),
    false // Not repeatable - once married or declined, this event won't occur again
  ),

  // Kids
  new RandomEvent(
    "Starting a Family",
    () => {
      // 80% chance if married and less than maxChildren
      if (
        state.family.spouse?.spouseStatus === "Married" &&
        (state.family.children?.length ?? 0) < state.maxChildren
      ) {
        return 0.5;
      }
      return 0;
    },
    null,
    (eventData) => (
      <>
        Your partner asks if you if you would like to have kids. What do you say?
      </>
    ),
    () =>
      state.family.spouse?.spouseStatus === "Married" &&
      (state.family.children?.length ?? 0) < (state.maxChildren ?? 4), // Use maxChildren if set, default to 4
    [
      {
        label: "Yes",
        execute: (eventData) => {
          // Add child to family
          if (!state.family.children) {
            state.family.children = [];
          }

          state.family.children.push({
            age: 0,
            relationship: "Child",
            health: "Healthy"
          });

          // Immediate costs
          const birthCosts = randomInterval(3, 8) * 1000;
          state.money -= birthCosts;
          state.stress += 10;
          state.family.value = (state.family.value || 0) + 25;

          return (
            <>
              Congratulations! You and your partner welcomed a beautiful baby! 
              The birth costs were ${birthCosts.toLocaleString()}. 
            </>
          );
        },
      },
      {
        label: "Not yet, maybe later",
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) - 10;
          return (
            <>
              You and your partner decide to wait a bit longer before having children. 
              There's no rush - you want to make sure you're financially and emotionally ready for such a big step.
            </>
          );
        },
      },
    ],
    () => ({}),
    true // Repeats
  ),
  // Child flu event
  new RandomEvent(
    "Child Emergency",
    () => {
      // 5% per child per year
      const numChildren = state.family.children?.length ?? 0;
      return numChildren * 0.05;
    },
    null,
    (eventData) => (
      <>
        Uh oh! Looks like it's that time of the year again, and your child caught an unfortunate case
        of the flu. It looks pretty serious, maybe it's time to get it checked out just to make sure it's okay.
        Do you pay a visit to the doctor?
      </>
    ),
    () => (state.family.children?.length ?? 0) > 0, 
    [
      {
        label: "Go",
        condition: (eventData) => canPurchase(200),
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) + 5;
          state.money -= 200;
          state.stress -= 5;
          return (
            <>
              Your child gets checked out by the doctor, he prescribes some medicine, and their flu appears cured.
            </>
          );
        },
      },
      {
        label: "Don't go",
        execute: (eventData) => {
          const getsWorse = Math.random() < 0.3;
          
          if (getsWorse) {
            state.family.value = (state.family.value || 0) - 10;
            state.stress += 20;
            const emergencyCost = randomInterval(8, 15) * 100;
            state.money -= emergencyCost;
            
            return (
              <>
                Unfortunately, your child's condition worsened, and you had to rush them to the emergency room.
                The medical expenses added a strain to your finances, and it's going to be a tough recovery.
              </>
            );
          } else {
            state.stress -= 10;
            return (
              <>
                You decide to wait and see if your child's condition improves. 
                Thankfully, after a few days of rest and home care, they start to feel better.
              </>
            );
          }
        },
      },
    ],
    () => ({}),
    true // Repeatable
  ),

  // Child product event
  new RandomEvent(
    "To buy or not?",
    0.05,
    null,
    (eventData) => (
      <>
        While on a walk, your child has been eyeing the {eventData.product} behind the shop window for a while now,
        but it looks pretty expensive. They ask you if you could purchase for them.
        Do you buy it for them?
      </>
    ),
    () => state.hasChildren, //if has kids
    [
      {
        label: "Yes",
        condition: (eventData) => canPurchase(150),
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) + 5;
          state.money -= 150;
          return (
            <>
              Your child loves the {eventData.product} which you bought, and they come home with a bright
              gleaming smile on their face.
            </>
          );
        },
      },
      {
        label: "No",
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) - 5;
          return (
            <>
              You don't want to spoil your child. Sometimes, they have to learn that not everything
              in life is guaranteed.
            </>
          );
        },
      },
    ],
    () => ({
      product: chooseRandom(["Nutcracker", "Hot Wheels", "Lego"]),
    }),
    true //repeats
  ),


  new RandomEvent(
    "Surprise vacation",
    0.05,
    null,
    (eventData) => (
      <>
        At your workplace, you won the raffle for a trip to the Bahamas! It covers the airplane flight fees for
        all of your family, and your boss has agreed to give you leave for those days. However, going might mean missing out
        on some work days, and you would still have to pay for the other expenses. Do you go?
      </>
    ),
    () => state.hasChildren, //if has kids
    [
      {
        label: "Go",
        condition: (eventData) => canPurchase(5000),
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) + 15;
          state.stress -= 30;
          state.money -= 5000;
          return (
            <>
              You seize the opportunity and make the most of it. The trip is a blast
              and you come back feeling refreshed, and ready to slough through anything life
              puts in your way.
            </>
          );
        },
      },
      {
        label: "Don't",
        execute: (eventData) => {
          state.family.value = (state.family.value || 0) - 5;
        },
      },
    ],
    () => { },
    false //repeats
  ),
  
  /*
  new RandomEvent(
    "Raise",
    () => 0.05 * (state.job ? Math.max(state.job?.yearsEmployed, 4) : 1),
    (eventData) => {
      if (state.job) state.job.salary += eventData.raise;
    },
    (eventData) => (
      <>
        Seeing the good work you've done for the company, your boss rewards you with a raise of
        <Color>${eventData.raise}</Color>. He then pats you on the back and tells you to keep up your efforts.
      </>
    ),
    () => state.job != null, //has a job
    [
      {
        label: "Continue",
      },
    ],
    () => ({
      raise: randomInterval(2, 3) * 1000,
    }),
    true //repeats
  ),
  */

  // Illnesses and Stuff
  new RandomEvent(
    "Major Illness",
    state.stress >= 50 ? 0.1 : 0.01,
    null,
    (eventData) => (
      <>
        Oh no! You've developed a serious case of {eventData.illness}, and needed to be hospitalized for the
        next few weeks. Your doctor says that the symptoms are not persistent, but you may require
        to undergo special treatment in order to fully cure of it. However, it will cost you <Color>${eventData.cost}</Color>.
        Do you take it?
      </>
    ),
    () => state.age > 30, //always can happen
    [
      {
        label: "Yes",
        condition: (eventData) => canPurchase(eventData.cost),
        execute: (eventData) => {
          state.stress -= 45;
          state.money -= eventData.cost;
        },
      },
      {
        label: "No",
        execute: (eventData) => {
          state.stress += 40;
        },
      },
    ],
    () => ({
      illness: chooseRandom(["lymphoma", "kidney disease", "type 1 diabetes"]),
      cost: randomInterval(10, 20) * 1000,
    }),
    true //repeats
  ),

  // Punishments
  new RandomEvent(
    "Health Scare",
    state.stress >= 70 ? 0.8 : 0, //and also make sure not ill currently
    null,
    (eventData) => (
      <>
        Your poor health has temporarily put you in the hospital!
        You pay <Color>${eventData.cost}</Color> for your stay.
      </>
    ),
    () => true, //always
    [
      {
        label: "Continue",
        execute: (eventData) => {
          state.money -= eventData.cost;
          state.stress += 10;
        },
      },
    ],
    () => ({
      cost: randomInterval(30, 50) * 100,
    }),
    true //repeats
  ),
  new RandomEvent(
    "Hospitalized",
    state.stress >= 80 ? 0.9 : 0, //and also make sure not ill currently
    null,
    (eventData) => (
      <>
        Your extremely poor health has caused you to be hospitalized with {eventData.disease}. You remained under critical condition 
        until your health finally recovered. Because of this episode, you have lost your job, and are forced to pay hospital bills.
      </>
    ),
    () => true, //always
    [
      {
        label: "Continue",
        execute: (eventData) => {
          state.money -= eventData.cost;
          state.job = null;
        },
      },
    ],
    () => ({
      disease: chooseRandom(["pneumonia", "meningitis", "pancreatitis"]),
      cost: randomInterval(50, 80) * 100,
    }),
    true //repeats
  ),
  new RandomEvent(
    "Mental Breakdown",
    state.stress > 70 ? 0.8 : 0, //and also make sure not ill currently
    null,
    (eventData) => (
      <>
        Your sustained high-stress lifestyle caused a {eventData.disease} last night.
        You were hospitalized for a week until you could recover.
        Make sure to take care of your mental health.
      </>
    ),
    () => true, //always  
    [
      {
        label: "Continue",
        execute: (eventData) => {
          state.stress -= 30;
          state.money -= eventData.cost;
        }
      },
    ],
    () => ({
      disease: chooseRandom(["nervous breakdown", "psychotic episode", "panic attack"]),
      cost: randomInterval(30, 50) * 100,
    }),
    true //repeats
  ),
];


// Removed events:

/* Job event, obsolete due to job dialog system
  /
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
          return `Congrats! You are now employed as a <b>${eventData.role}.</b>`;
        },
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
      };
    },
    true // repeatable
  ),
  */