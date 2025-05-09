// app/sections/ContinueLearningSection.jsx
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import { recentActivityData } from "../lib/data";

const ContinueLearningSection = async () => {
  // If later fetching from DB/API, use `await fetch(...)` here
  const data = recentActivityData;

  return <ContinueLearning data={data} />;
};

export default ContinueLearningSection;
