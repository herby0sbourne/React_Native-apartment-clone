import { usStatesMap } from "@/constants/usaStates";

export const abvState = (stateName: string) => {
  const state = usStatesMap[stateName as keyof typeof usStatesMap];

  if (!state) return stateName;

  return state;
};
// can be used to get the list of state
// (stateName: keyof typeof usStatesMap)
