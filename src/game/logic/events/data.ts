import { state } from "@/game/state";
import { GameChoice, GameEvent, ScheduledEvent, RandomEvent } from "./eventsClasses";
import { chooseRandom, randomInterval } from "@/utils";

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
          state.job = {role : eventData.role, salary: eventData.salary, yearsEmployed : 0};
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
    }
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
          state.education = {inSchooling : true, tuition: eventData.uniTuition, level : "Undergrad", yearsUntilGrad : 4};
          return `Congratulations! You are now an undergraduate studying at ${eventData.university}`
        }
      },
      {
        label: "Trade School",
        execute: (eventData) => {
          state.education = {inSchooling : true, tuition: eventData.uniTuition, level : "Vocational", yearsUntilGrad : 2};
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
        tradeSchool : chooseRandom(tradeSchools),
        university : chooseRandom(universities),
        uniTuition : randomInterval(4,6)*1000,
        tradeTuition : randomInterval(2,4)*1000,
      }
    }
  ),

  
];
