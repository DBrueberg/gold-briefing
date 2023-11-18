// Initially Created by: Devin Brueberg
// 2022 Side Project
// Gold-Briefing - reducers/index.js
// December 24, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 11/18/2023, Added in all reducers)

// Using React library in order to build components
// for the app and importing needed components
import { combineReducers } from "redux";
import { briefingList } from "./briefingList.reducer";
import { emergencyPlan } from "./emergencyPlan.reducer";
import { general } from "./general.reducer";
import { jobBriefing } from "./jobBriefing.reducer";
import { user } from "./user.reducer";
import { weather } from "./weather.reducer";

// Combining all reducers
const reducers = combineReducers({
    briefingList,
    emergencyPlan,
    general,
    jobBriefing,
    user,
    weather,
});

// Exporting combined reducers
export default reducers;
